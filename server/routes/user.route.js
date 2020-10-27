import express from 'express';
import { fetchAllReportsFromWarden, fetchOneReports } from '../controller/admin';

export const userRoute = express.Router()

const BASE_URL = '/user';

userRoute.get(`${BASE_URL}/:id/fetch-report`,  fetchOneReports);


userRoute.get(`${BASE_URL}/fetch-allReports`, fetchAllReportsFromWarden);
