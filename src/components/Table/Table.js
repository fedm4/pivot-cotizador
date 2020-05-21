import React from 'react';
import './Table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Table = props =>{
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
                        (<td className="no-data" colspan={props.columns.length}>Sin datos</td>)
                        :
                        null
                }
                {props.data.map((item, index) => {
                    return (
                        <tr key={`table-${index}`}>
                            {Object.keys(item).map(key =>{
                                    return (<td key={`table-${index}-${key}`}>{item[key]}</td>);
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