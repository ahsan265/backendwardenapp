import express from 'express';
import { fetchAllReportsFromWarden, fetchOneReports,fetchReportsByLocation,fetchReportsByWarden,fetchReportsBytimeDuration,fetchReportsByRoadBlock,fetchReportsByTrafficincident } from '../controller/admin';

export const userRoute = express.Router()

const BASE_URL = '/user';

userRoute.get(`${BASE_URL}/:id/fetch-report`,  fetchOneReports);


userRoute.get(`${BASE_URL}/fetch-allReports`, fetchAllReportsFromWarden);

userRoute.get(`${BASE_URL}/:loc/fetch-allReportsByLocation`, fetchReportsByLocation);
userRoute.get(`${BASE_URL}/:ward/fetch-allReportsByWarden`, fetchReportsByWarden);
userRoute.get(`${BASE_URL}/:time/fetch-allReportsBytimeDuration`, fetchReportsBytimeDuration);
userRoute.get(`${BASE_URL}/:Rb/fetch-allReportsByRoadBlock`, fetchReportsByRoadBlock);
userRoute.get(`${BASE_URL}/:incident/fetch-allReportsByTrafficincident`, fetchReportsByTrafficincident );


