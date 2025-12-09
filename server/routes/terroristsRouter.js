import express from 'express';
import { 
    getTerroristByIdHandler,
    addTerroristHandler,
    updateTerroristHandler,
    deleteTerroristHandler,
    getTerroristsHandler
} from '../controllers/terroristController.js';

const router = express.Router();

router.get('/', getTerroristsHandler);
router.get('/getTerroristById', getTerroristByIdHandler);
router.post('/addTerrorist', addTerroristHandler);
router.put('/updateTerrorist', updateTerroristHandler);
router.delete('/deleteTerrorist', deleteTerroristHandler);


export default router;
