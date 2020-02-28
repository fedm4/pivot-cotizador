import React from 'react';
import PropTypes from 'prop-types';
import './Table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTimes } from '@fortawesome/free-solid-svg-icons';

const Table = props =>{
    const editClick = (event,user) => {
        setClickedAnimation(event);
        props.edit(user);
    };
    const setClickedAnimation = event =>{
        event.preventDefault();
        const element = event.currentTarget.children[0];
        element.classList.add("clicked");
        setTimeout(()=>{element.classList.remove("clicked")}, 300);
    }
    console.log(props.data);
    return (
        <table className="table">
            <thead>
                <tr>
                    {props.columns.map(title => {
                            return <th key={title}>{title}</th>
                    })}
                    {props.edit?<th>Nueva Version</th>:null}
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
                                props.delete?
                                <td>
                                    <button onClick={setClickedAnimation}>
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