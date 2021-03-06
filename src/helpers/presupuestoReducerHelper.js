import {round} from './math';

export const getPrecioTotal = (clon, marcacion) => {
  const precioTotal = clon.reduce((acc, cur) => {
    const curTotal = cur.modulos.reduce((acc, curMod) =>{
      return acc + curMod.precioFinal;
    }, 0);
    return acc + curTotal;
  }, 0);
  return round(precioTotal * parseFloat(marcacion || 1));
};

export const getPrecioTotalUpdate = (clon) => {
  const sistemas = clon.sistemas;
  return {...clon, precioTotal: getPrecioTotal(sistemas, clon.datos.marcacion)};
};

export const getSistemaIndex = (sistemas, sistema, referencia) => {
  return sistemas.findIndex(item => {
    return item.sistema === sistema &&
      item.referencia === referencia 
  });
}
export const setModulo = (state, action) => {
  const clon = [...state.sistemas];
      const index = getSistemaIndex(clon, action.sistema.sistema, action.sistema.referencia);
      if(index === -1 ) return state;
      clon[index].modulos.push(action.payload);
      const precioTotal = getPrecioTotal(clon, state.datos.marcacion);
      return {...state, sistemas: clon, precioTotal};
};

export const getDeleteModuloData = (state, action) =>{
  const sistemas = [...state.sistemas];
  const index = getSistemaIndex(sistemas, action.payload.sistema, action.payload.referencia);
  if(index === -1 ) return state;
  sistemas[index] = action.payload;
  const precioTotal = getPrecioTotal(sistemas, state.datos.marcacion);
  return {...state, sistemas, precioTotal};
};

export const deleteSistema = (state, sistema, referencia) => {
  const sistemas = [...state.sistemas];
  const index = getSistemaIndex(sistemas, sistema, referencia);
  if(index === -1 ) return state;
  sistemas.splice(index, 1);
  const precioTotal = getPrecioTotal(sistemas, state.datos.marcacion);
  return {...state, sistemas, precioTotal};
};