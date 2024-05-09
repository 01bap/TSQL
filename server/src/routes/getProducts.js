import { Router } from 'express';
import { connect, query, close } from 'mssql';
import cors from 'cors';
import { getAllItems } from '../modules/queries.js';

const router = Router();

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
      await connect(config);
      
      const result = await query(getAllItems);
      console.log("Update:",result)
  
      res.json(result.recordset);
    } catch (error) {
      console.error('SQL error:', error);
      res.status(500).send('Internal server error');
    } finally {
      await close();
    }
});

// export default router;
export default router;
