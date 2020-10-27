import express from 'express';
import { sendReport, fetchAllReportByWardenId, fetchOneReportWardenId, editReportsByWardenId } from '../controller/warden.controller.';
import { validateInput } from '../middleware/validation';
import { reportSchema} from '../middleware/report';
import {WardenVerifyTokenMiddleware} from '../utils/security'


export const wardenRoute = express.Router();
const BASE_URL = '/report'

wardenRoute.post(`${BASE_URL}/report-traffic`, WardenVerifyTokenMiddleware, sendReport)


wardenRoute.get(`${BASE_URL}/:reportId/warden-report`, WardenVerifyTokenMiddleware, fetchOneReportWardenId)
            

wardenRoute.get(`${BASE_URL}/all-wardenReports`, WardenVerifyTokenMiddleware, fetchAllReportByWardenId);


wardenRoute.patch(`${BASE_URL}/:reportId/edit-report`, WardenVerifyTokenMiddleware, editReportsByWardenId);