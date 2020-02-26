import React, {useContext} from 'react';
import MainContext from '../../context/MainContext';

const Test = () => {
  const {gapi} = useContext(MainContext);
  const PrintData = async () => {
    try {
      const put = await gapi.client.sheets.spreadsheets.values.update({
        spreadsheetId: '1DINStaC5-JYQWCur7hzeA1o0C4q_AddTzJtojYU0pJ8',
        range: 'DIVISORIOS 1,50!H23',
        valueInputOption: 'USER_ENTERED'
      }, {values: [[20]]});
      const results = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: '1DINStaC5-JYQWCur7hzeA1o0C4q_AddTzJtojYU0pJ8',
        range: 'DIVISORIOS 1,50!J23',
      });
      console.log(results.result.values);
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