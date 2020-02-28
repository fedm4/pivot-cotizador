const removeDuplicatesAndOrder = arr => {
  return arr.reduce((acc, current) => {
    const x = acc.find(item => item.label === current.label);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    } 
  }, []).sort((a, b) => a.label-b.label);
};


export const getAltos = async (gapi, setAltos, planilla, hoja) => {
  try {
    if(!planilla) return;
    const results = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: planilla,
      range: `${hoja}!B23:B138`,
    });
    const altos = results.result.values.filter(item => item != "" && item != null);
    const altosList = altos.map(alto => {return {label:alto[0], value:alto[0]}});
    //const altosFiltered = altosList.filter(alto => altosList.find(item=>item.label === alto.label))

    const altosFiltered = removeDuplicatesAndOrder(altosList);
    setAltos(altosFiltered);
  } catch (err) {
    throw err;
  }
};

export const getAnchos = async (gapi, alto, setAnchos, planilla, hoja) => {
  try {
    if(!planilla) return;
    const results = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: planilla,
      range: `${hoja}!B23:C108`,
    });
    const anchos = results.result.values.filter(item => item != "" && item != null);
    const anchosList = anchos.filter(item => item[0] === alto)
      .map(ancho => {return {label:ancho[1], value:ancho[1]}});
    const anchosFiltered = removeDuplicatesAndOrder(anchosList);
    setAnchos(anchosFiltered);
  } catch (err) {
    throw err;
  }
};

export const getPrecio = async (gapi, ancho, planilla, hoja, setPrecio, alto) => {
  const PRICE_INDEX = 29;
  try {
    if(!planilla) return;
    const results = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: planilla,
      range: `${hoja}!B23:AE108`,
    });
    const fila = results.result.values.filter(fila=> fila[1] == ancho && fila[0]==alto)[0];
    setPrecio(fila[PRICE_INDEX]);
  } catch (err) {
    throw err;
  }
} 