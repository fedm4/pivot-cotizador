import React from 'react';
import PropTypes from 'prop-types';
import './Table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';

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
                                        <FontAwesomeIcon className="edit-icon" icon={faCopy}></FontAwesomeIcon>
                                    </button> 
                                </td>
                                :null
                            }
                            {
                                props.editLink ?
                                <td>
                                    <Link to={`${props.editLink.to}${encodeURIComponent(item[props.editLink.key])}`}>
                                        <FontAwesomeIcon className="edit-icon" icon={faCopy}></FontAwesomeIcon>
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