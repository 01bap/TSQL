const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const queries = require('./queries'); // Importieren Sie das Modul mit den SQL-Abfragen

const router = express.Router();
// Konfiguration für die Verbindung zur SQL Server-Datenbank
const config = {
  user: 'swb4',
  password: 'swb4',
  server: 'ITNT0005',
  database: 'Spieler2_LAB',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

router.use(cors());

router.get('/api/update', async (req, res) => {
    console.log("Update");
    try {
      mssql.connect(config);
      
      const result = await mssql.query(queries.getAllItems);
  
      res.json(result.recordset);
    } catch (error) {
      console.error('SQL error:', error);
      res.status(500).send('Internal server error');
    } finally {
      await mssql.close();
    }
});

module.exports = router;
