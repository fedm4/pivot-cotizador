import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileUpload} from '@fortawesome/free-solid-svg-icons';
import './FileUpload.scss';
import Button from '../Button/Button';

const FileUpload = ({name, onUpload, uploading}) => {
    const [file, setFile] = useState(null);
    const onChange = e => {
        setFile(e.target.files[0]);
    };
    const handleUpload = () => {
        onUpload(file, name);
        setFile(null)
    }
    return (
        <div className="file-upload">
            <label className="file-upload-label">
                <input
                    type="file"
                    onChange={onChange}
                />
                <FontAwesomeIcon icon={faFileUpload} />
            </label>
            <span className="file-name">{file?.name || null }</span>
            <Button
                className="mt-15"
                color="blue"
                handleOnClick={handleUpload}
                saving={uploading}
            >
                Upload
            </Button>
        </div>
    )
}

export default FileUpload;
