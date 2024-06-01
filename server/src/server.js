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

app.get('/api/testConnection', async (req, res) => {
  try {
    await mssql.connect(config);
    const result = await mssql.query(queries.testConnection);
    res.json(result.recordset);
  } catch (error) {
    console.error('SQL error:', error);
    res.json(error);
  } finally {
    await mssql.close();
  }
});
app.get('/api/createTables', async (req, res) => {
  try {
    // Verbindung zur Datenbank herstellen
    await mssql.connect(config);
    const request = new mssql.Request();

    // Parameter zur Stored Procedure hinzufügen
    const productTable = queries.productTableName;
    const inventoryTable = queries.inventoryTableName;

    request.input('product', mssql.VarChar, productTable);
    request.input('inventory', mssql.VarChar, inventoryTable);

    // Stored Procedure ausführen
    let result = await request.execute(queries.SPcreateTables);

    res.json(result.recordset);
  } catch (error) {
    console.error('SQL error:', error);
    res.status(500).send('Internal server error');    // Terminates the server
  } finally {
    await mssql.close();
  }
});
app.get('/api/addProduct', async (req, res) => {
  try {
      await mssql.connect(config);
      const request = new mssql.Request();

      const asin = req.query.asin || 'asin';
      let title = req.query.title || 'title';
      title = decodeURIComponent(title);
      let price = req.query.price || 'price';
      price = price.replace(',', '.');
      const currency = req.query.currency || 'currency';
      const country = req.query.country || 'country';
      const previewLn = req.query.previewLn || 'previewLn';

      request.input('asin', mssql.VarChar, asin);
      request.input('title', mssql.Text, title);
      request.input('price', mssql.Money, price);
      request.input('currency', mssql.VarChar, currency);
      request.input('country', mssql.Char, country);
      request.input('previewLn', mssql.Text, previewLn);

      let result = await request.execute(queries.SPaddProduct);
      res.json(result.recordset)
  } catch (err) {
      console.error('SQL error', err);
      res.status(500).send(err.message);
  } finally {
      await mssql.close();
  }
});
app.get('/api/getProducts', async (req, res) => {
  try {
    await mssql.connect(config);
    const result = await mssql.query(queries.getProduct);
    res.json(result.recordset);
  } catch (error) {
    console.error('SQL error:', error);
    res.status(500).send('Internal server error');    // Terminates the server
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

app.get('/api/testSP', async (req, res) => {
  try {
    await mssql.connect(config);
    // const result = await mssql.query("exec dbo.Rodriguez_test;");

    const request = new mssql.Request();
    // Parameter an die Stored Procedure übergeben
    // request.input('parameterName', sql.VarChar, 'parameterValue');
    // Stored Procedure ausführen
    const result = await request.execute('dbo.Rodriguez_test');

    console.log(result)
    res.json(result.recordset);
  } catch (error) {
    console.error('SQL error:', error);
    res.status(500).send('Internal server error');    // Terminates the server
  } finally {
    await mssql.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
