import React from 'react';
import Attachment from '../Attachment/Attachment';
import FileUpload from '../FileUpload/FileUpload';
import './AttachmentSection.scss';

const AttachmentSection = ({onUpload, uploading, attachedFiles, name, onDelete, folder}) => {
    return (
        <div className="file-section">
            <label className="section-title">Adjuntos</label>
            <FileUpload
                name={name}
                onUpload={onUpload}
                uploading={uploading}
            />
            {
                attachedFiles.map((item, index)=>(
                    <Attachment
                        key={`at-in-${index}`}
                        url={item.url}
                        name={item.name} 
                        onDelete={e => onDelete(item.name, folder, name)}
                    />
                ))
            }
        </div>
    )
}

export default AttachmentSection;

