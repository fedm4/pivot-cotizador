import React, {useContext} from 'react';
import MainContext from '../../context/MainContext';

const Test = () => {
  const {gapi} = useContext(MainContext);
  const PrintData = async () => {
    try {
      const data = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E',
      });
      console.log(data);
    } catch (err) {
      throw err;
    }
  };
  return (
    <div>
      <button onClick={PrintData}>Print Data</button>
    </div>
  );
};

export default Test;