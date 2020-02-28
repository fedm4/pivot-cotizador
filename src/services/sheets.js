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

    const altosFiltered = altosList.reduce((acc, current) => {
      const x = acc.find(item => item.label === current.label);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      } 
    }, []).sort((a, b) => a.label-b.label);
    setAltos(altosFiltered);
  } catch (err) {
    throw err;
  }
};

export const getAnchos = async (gapi, setAnchos, planilla, hoja) => {
  try {
    if(!planilla) return;
    const results = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: planilla,
      range: `${hoja}!C23:C108`,
    });
    const anchos = results.result.values.filter(item => item != "" && item != null);
    console.log(anchos);
    const anchosList = anchos.map(ancho => {return {label:ancho[0], value:ancho[0]}});
    setAnchos(anchosList);
  } catch (err) {
    throw err;
  }
};

export const getPrecio = async (gapi, ancho, planilla, hoja, setPrecio) => {
  const PRICE_INDEX = 28;
  try {
    if(!planilla) return;
    const results = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: planilla,
      range: `${hoja}!C23:AE108`,
    });
    const fila = results.result.values.filter(fila=> fila[0] == ancho)[0];
    setPrecio(fila[PRICE_INDEX]);
  } catch (err) {
    throw err;
  }
} 