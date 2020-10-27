import express from 'express';
import { addTrafficWarder, fetchAllReportsFromWarden, fetchOneReports, getOneTrafficWarden, getTrafficWardens, editReport, editWardenInfo, deleteWarden, deleteReport} from '../controller/admin';
import { authenticationSchema, updateUserSchema} from '../middleware/auth';
import { validateInput, emailPhoneValidator } from '../middleware/validation';

import { updateReportSchema} from '../middleware/report';import { verifyAdminToken, } from '../utils/security';




export const adminRoute = express.Router()

const BASE_URL = '/admin'

adminRoute.post(`${BASE_URL}/add-TrafficWarden`, verifyAdminToken, validateInput(authenticationSchema), emailPhoneValidator, addTrafficWarder);

adminRoute.get(`${BASE_URL}/:id/find-report`, verifyAdminToken, fetchOneReports);


adminRoute.get(`${BASE_URL}/find-allReports`, verifyAdminToken, fetchAllReportsFromWarden);


adminRoute.get(`${BASE_URL}/find-allWardens`, verifyAdminToken, getTrafficWardens);


adminRoute.get(`${BASE_URL}/:wardenId/find-warden`, verifyAdminToken, getOneTrafficWarden);


adminRoute.patch(`${BASE_URL}/:reportId/update-report`, verifyAdminToken, validateInput(updateReportSchema),editReport);


adminRoute.patch(`${BASE_URL}/:userId/update-warden`, verifyAdminToken, validateInput(updateUserSchema), editWardenInfo);


adminRoute.delete(`${BASE_URL}/:userId/delete-warden`, verifyAdminToken, deleteWarden);


adminRoute.delete(`${BASE_URL}/:reportId/delete-report`, verifyAdminToken, deleteReport);


// adminRoute.post(`${BASE_URL}/create-map`, verifyAdminToken, validateInput(mapSchema), createMap)