import React from 'react';
import {useParams} from 'react-router-dom';
import useIngreso from '../../hooks/useIngreso/useIngreso';
import useAuthBlock from '../../hooks/useAuthBlocker/useAuthBlocker';
import Panel from '../../components/Panel/Panel';
import Input from '../../components/Input/Input';
import Select from '../../components/Select/Select';
import Button from '../../components/Button/Button';
import Textarea from '../../components/Textarea/Textarea';
import AttachmentSection from '../../components/AttachmentSection/AttachmentSection';
import BackButton from '../../components/BackButton/BackButton';

const Ingreso = () => {
    const {iid} = useParams();
    const {
        id,
        state,
        create,
        update,
        display,
        saving,
        uploading,
        handleInputChange,
        handleSelectChange,
        uploadFile,
        deleteFile,
        estados,
        changesSaved
    } = useIngreso(iid);
    const {isAuthorized, NotAuthorized} = useAuthBlock('ingresos');

    if(!isAuthorized) return (<NotAuthorized />);
    return (
        <Panel title={`Ingreso ${id ? `- ${id}` : ''}`} className="flex justify-space-between flex-wrap">
            <Input
                name="nombre" 
                type="text"
                className="grid-item hwidth-item"
                placeholder="Nombre"
                label="Nombre"
                value={state.nombre}
                handleChange={handleInputChange}
                skeleton={!display}
            />
            <Input
                name="monto" 
                type="number"
                className="grid-item hwidth-item"
                placeholder="monto"
                label="Monto"
                value={state.monto}
                handleChange={handleInputChange}
                skeleton={!display}
            />
            <Select
                className="hwidth-item"
                label="Obra"
                seleccionar={false}
                onChange={e => handleSelectChange(e, 'obra')}
                options={[]}
                _value={state.obra}
                allowCreate={true}
                skeleton={!display}
            />
            <Select
                className="hwidth-item"
                label="Estado"
                seleccionar={false}
                onChange={e => handleSelectChange(e, 'estado')}
                options={estados}
                _value={state.estado}
                skeleton={!display}
            />
            <Input
                name="referencia" 
                type="text"
                className="grid-item hwidth-item"
                placeholder="referencia"
                label="Referencia"
                value={state.referencia}
                handleChange={handleInputChange}
                skeleton={!display}
            />
            <Input
                name="fechaPago" 
                type="date"
                className="grid-item hwidth-item"
                placeholder="fecha de pago"
                label="Fecha de Pago"
                value={state.fechaPago}
                handleChange={handleInputChange}
                skeleton={!display}
            />
            <Textarea
                label="Anotaciones"
                name="anotaciones"
                handleChange={handleInputChange}
                value={state.anotaciones}
                skeleton={!display}
            />
            <AttachmentSection
                name="adjuntos"
                onUpload={uploadFile}
                uploading={uploading}
                attachedFiles={state.adjuntos || []}
                onDelete={deleteFile}
                folder="ingresos"
            />
            <footer className="panel-footer">
                <Button
                    color="green"
                    className="ml-15"
                    disabled={saving ? 'disabled' : ''}
                    saving={saving}
                    handleOnClick={id ? update : create}
                >
                    {id? 'Modificar': 'Crear'}
                </Button>
                <BackButton link="/tesoreria/ingresos" enabled={!changesSaved} />
            </footer>
        </Panel>
    );
    
};

export default Ingreso;