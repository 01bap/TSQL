const express = require('express');
const mssql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

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

app.use(cors());

// API-Route für SQL-Abfrage
app.get('/api/query', async (req, res) => {
  try {
    // Verbindung zur Datenbank herstellen
    mssql.connect(config);

    // SQL-Abfrage ausführen
    const result = await mssql.query('SELECT * FROM dbo.Rodriguez_grund');
    console.log("Server:", result);

    res.json(result.recordset); // Ergebnisse senden
  } catch (error) {
    console.error('SQL error:', error);
    res.status(500).send('Internal server error');
  } finally {
    // Verbindung schließen
    await mssql.close();
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
