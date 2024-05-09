import express from 'express';

const router = express.Router();

router.get('/routeA', (req, res) => {
    res.send('This is route A');
});

export default router;
