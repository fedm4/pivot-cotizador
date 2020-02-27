export const getAnchos = async (gapi, setAnchos, planilla) => {
  try {
    if(!planilla) return;
    const results = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: planilla,
      range: 'DIVISORIOS 1,50!C23:C108',
    });
    const anchos = results.result.values.filter(item => item != "" && item != null);
    console.log(anchos);
    const anchosList = anchos.map(ancho => {return {label:ancho[0], value:ancho[0]}});
    setAnchos(anchosList);
  } catch (err) {
    throw err;
  }
};

export const getPrecio = async (gapi, ancho, planilla, setPrecio) => {
  const PRICE_INDEX = 28;
  try {
    if(!planilla) return;
    const results = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: planilla,
      range: 'DIVISORIOS 1,50!C23:AE108',
    });
    const fila = results.result.values.filter(fila=> fila[0] == ancho)[0];
    setPrecio(fila[PRICE_INDEX]);
  } catch (err) {
    throw err;
  }
} 