import React from 'react';
import './Table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import moment from 'moment-timezone';

const Table = ({exclude = [], timeFields = [], ...props}) =>{
    const editClick = (event,user) => {
        setClickedAnimation(event);
        props.edit(user);
    };
    const deleteClick = async (event, data) => {
        await setClickedAnimation(event);
        setTimeout(() => props.delete(data), 300);
    }
    const setClickedAnimation = async event =>{
        event.preventDefault();
        const element = event.currentTarget.children[0];
        element.classList.add("clicked");
        await setTimeout(()=>{element.classList.remove("clicked")}, 300);
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    {props.columns.map(title => {
                            return <th key={title}>{title}</th>
                    })}
                    {props.edit || props.editLink?<th>Editar</th>:null}

                    {props.delete?<th>Eliminar</th>:null}
                </tr>
            </thead>
            <tbody>
                {
                    props.data.length === 0 && props.loading ?
                    [0,1,2,3,4].map((item) => {
                        return (
                            <tr key={`skeleton-${item}`}>
                                {props.columns.map((col) => <td key={`skeleton-td-${col}${item}`}><Skeleton /></td>)}
                                {props.edit || props.editLink ? <td><Skeleton /></td> :null}
                                {props.delete? <td><Skeleton /></td> : null}
                            </tr>
                        )
                    })
                    : props.data.length === 0 ?
                        (<tr><td className="no-data" colSpan={props.columns.length}>Sin datos</td></tr>)
                        :
                        null
                }
                {props.data.map((item, index) => {
                    return (
                        <tr key={`table-${index}`}>
                            {(() => props.order? props.order:Object.keys(item))().filter(key => exclude.indexOf(key) === -1).map(key =>{
                                    return (
                                        <td key={`table-${index}-${key}`}>
                                            {
                                                timeFields.indexOf(key) > -1 ?
                                                moment(item[key]).tz('America/Argentina/Buenos_Aires').format('DD-MM-YYYY hh:mm')
                                                :
                                                item[key]
                                            }
                                        </td>
                                    );
                            })}
                            {
                                props.edit?
                                <td>
                                    <button onClick={event => {editClick(event, item)}}>
                                        <FontAwesomeIcon className="edit-icon" icon={faEdit}></FontAwesomeIcon>
                                    </button> 
                                </td>
                                :null
                            }
                            {
                                props.editLink ?
                                <td>
                                    <Link to={`${props.editLink.to}${encodeURIComponent(item[props.editLink.key])}`}>
                                        <FontAwesomeIcon className="edit-icon" icon={faEdit}></FontAwesomeIcon>
                                    </Link>
                                </td>
                                :null
                            }
                            {
                                props.delete?
                                <td>
                                    <button onClick={e=>deleteClick(e, item)}>
                                        <FontAwesomeIcon className="delete-icon" icon={faTimes}></FontAwesomeIcon>
                                    </button>
                                </td>
                                :null
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
};

export default Table;