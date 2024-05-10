const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
// const getProducts = require('./modules/getProducts.js');
const queries = require("./modules/queries");

const app = express();
const port = 3000;
const config = {
  user: 'swb4',
  password: 'swb4',
  server: 'ITNT0005',
  // database: 'Spieler2_LAB',
  database: 'SWB_DB2_Projekt',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
app.use(cors());

app.get('/api/query', async (req, res) => {
  try {
    await mssql.connect(config);
    const result = await mssql.query('SELECT * FROM dbo.users');
    res.json(result.recordset);
  } catch (error) {
    console.error('SQL error:', error);
    res.status(500).send('Internal server error');
  } finally {
    await mssql.close();
  }
});

app.get('/api/getInventory', async (req, res) => {
  try {
    await mssql.connect(config);
    const result = await mssql.query(queries.getInventory);
    res.json(result.recordset);
  } catch (error) {
    console.error('SQL error:', error);
    //res.json(error);
    res.status(500).send('Internal server error');    // Terminates the server
  } finally {
    await mssql.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
