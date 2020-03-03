
import {round} from '../helpers/math';
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
    setPrecio(round(fila[PRICE_INDEX]));
  } catch (err) {
    throw err;
  }
};

const getFormattedDate = () => {
  const date = new Date();
  const str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "T" +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return str;
}

const getPresupuestoDate = () => {
  const date = new Date();
  let day = date.getDate();
  day = day > 9 ? day : `0${day}`;
  let month = date.getMonth() + 1;
  month = month > 9 ? month : `0${month}`;
  const str = `${day}-${month}-${date.getFullYear()}`;
  return str;
}

const moveFile = async(gapi, spreadsheetId) => {
  await gapi.client.load('drive', 'v2', async ()=>{
    const folderId = "1jGXdMGlHqCh4Zbewz9J-i1xOnTOLx4re";
    const file = await gapi.client.drive.files.get({
      fileId: spreadsheetId,
      fields: 'id, parents'
    });
    console.log(file);
    const movedFile = await gapi.client.drive.files.update({
      fileId: spreadsheetId,
      addParents: folderId,
      removeParents: file.result.parents.reduce((acc, cur) => `${acc},${cur.id}`, ""),
      fields: 'id, parents'
    });
  });
}
const createFile = async (gapi, nroPresupuesto, cliente) => {
  const newFile = await gapi.client.sheets.spreadsheets.create({
    properties: {
      title: `${nroPresupuesto} - ${cliente} - ${getFormattedDate()}`
    }
  });
  return newFile;
};
const copyPresupuestoBase = async (gapi, spreadsheetId) => {
  const params = {
    spreadsheetId: '1sc2ZpbLLLovtesd6FIEbvRMfO2Z1smYVubvmKkkA3w4',
    sheetId: 1036060973
  };
  const values = {destinationSpreadsheetId: spreadsheetId};
  const copy = await gapi.client.sheets.spreadsheets.sheets.copyTo(params, values);
  return copy.sheetId;
};
const writeToPresupuesto = async (gapi, spreadsheetId, presupuesto) => {
  let data;
  const headerValues = {
    values: [
        [presupuesto.datos.cliente],
        [presupuesto.datos.domicilio],
        [presupuesto.datos.destinatario],
        [presupuesto.datos.obra],
        [presupuesto.datos.referencia],
        [presupuesto.datos.email]
      ]
  };
  data = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Copy of BASE!D4:D9',
    valueInputOption:'RAW',
    resource: headerValues
  });
  data = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Copy of BASE!J5',
    valueInputOption:'RAW',
    resource: {values: [[presupuesto.datos.nroPresupuesto]]}
  });
  data = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Copy of BASE!J8',
    valueInputOption:'RAW',
    resource: {values:[[getPresupuestoDate()]]}
  });

  data = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Copy of BASE!K19',
    valueInputOption:'RAW',
    resource: {values:[[presupuesto.precioTotal]]}
  });

  let footerRowCount = 22;
  for(let line of presupuesto.datos.pie.split("\n")) {
    data = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `Copy of BASE!B${footerRowCount}`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS'
    }, {
      values: [
        [line]
      ]
    });
    footerRowCount++;
  }


  let itemCount = 0;
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let rowCount = 16;
  for (let sistema of  presupuesto.sistemas) {

    data = await gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `Copy of BASE!A${rowCount}:D${rowCount}`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS'
    }, {
      values: [
        [letters[itemCount], null, null, `${sistema.sistema} - ${sistema.referencia}`]
      ]
    });
    rowCount++;
    for(let modulo of sistema.modulos) {
      data = await gapi.client.sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `Copy of BASE!B${rowCount}:${rowCount}`,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS'
      }, {
        values: [
          [modulo.cantidad, 'un', modulo.modulo, modulo.ancho, modulo.alto, '$', modulo.precioFinal]
        ]
      });
      rowCount++;
    }

    itemCount++;
  };

}
export const createPresupuestoFile = async (gapi, presupuesto, setWriting) =>{
  try {
    const newFile = await createFile(gapi, presupuesto.datos.nroPresupuesto, presupuesto.datos.cliente); 
    await moveFile(gapi, newFile.result.spreadsheetId);
    const sheetId = await copyPresupuestoBase(gapi, newFile.result.spreadsheetId);
    await writeToPresupuesto(gapi, newFile.result.spreadsheetId, presupuesto);
    alert("Presupuesto creado");
  } catch (err) {
    alert("Error creando presupuesto");
    throw err;
  }
  setWriting(false);
}