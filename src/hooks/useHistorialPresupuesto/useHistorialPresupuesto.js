import {useContext, useState} from 'react';
import MainContext from '../../context/MainContext';

const usePresupuesto = () => {
    const collection = 'historialPresupuesto';
    const {firebase, setLoading} = useContext(MainContext);
    const [presupuesto, setPresupuesto] = useState({});

    /**
     * 
     */
    const create = async (id, url, presupuesto) => {
        try {
            const all = await getAllByPresupuestoId(id);
            await firebase.database.collection(collection)
                .add({id, presupuesto, url, fecha: Date.now(), version: all.length + 1});
        } catch(err) {
            throw new Error(`Error creando historial presupuesto - ${err}`);
        }
    }

    /**
     * 
     */
    const getById = async(id) => {
        try{
            const ret = await firebase.collection(collection).doc(id).get();
            const data = ret.data();
            setPresupuesto(data);
        }catch(err){
            throw new Error(`Error obteniendo presupuesto generado por id ${id} - ${err}`);
        }
    };

    const getAllByPresupuestoId = async (id) => {
      try{
          setLoading(true);
          const snapshot = await firebase.database
            .collection(collection)
            .where('id', '==', id)
            .orderBy('version', 'desc').get();
          const ret = snapshot.docs.map(doc => {
              const data = doc.data();
              return data;
          });
          setLoading(false);
          return ret;
      } catch(err) {
          throw new Error(`Error obteniendo historial de presupuestos por id ${id} - ${err}`);
      }
    }
    
    return {
        create,
        getAllByPresupuestoId,
        getById,
        presupuesto,
        setPresupuesto
    };

};

export default usePresupuesto;