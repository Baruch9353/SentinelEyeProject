import express from 'express'
import {
    getOrganizationByIdHandler,
    addOrganizationHandler,
    updateOrganizationHandler,
    deleteOrganizationHandler,
    getOrganizationsHandler
} from '../controllers/organizationsController.js'

const router = express.Router()

router.get('/', getOrganizationsHandler);
router.get('/getOrganizationById', getOrganizationByIdHandler);
router.post('/addOrganization', addOrganizationHandler);
router.put('/updateOrganization', updateOrganizationHandler);
router.delete('/deleteOrganization', deleteOrganizationHandler);


export default router;
