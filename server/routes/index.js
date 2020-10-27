import express from 'express';
import {authRoute} from '../routes/auth.route'
import { adminRoute } from '../routes/admin.route';
import { wardenRoute } from '../routes/warden.route';
import {userRoute } from '../routes/user.route';
 const Routes = express.Router();

Routes.use(authRoute);
Routes.use(adminRoute);
Routes.use(wardenRoute);
Routes.use(userRoute);

export default Routes