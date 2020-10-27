import express from 'express';
import { creatUser, loginUser, logOut } from '../controller/user.controller';
import { forgotPassword, resetPassword } from '../controller/password';
import { authenticationSchema, loginSchema, forgotPasswordSchema, userResetPasswordSchema } from '../middleware/auth';
import { validateInput, emailPhoneValidator } from '../middleware/validation';


export const authRoute = express.Router()

const BASE_URL = '/auth'

authRoute.post(`${BASE_URL}/signup`, validateInput(authenticationSchema), emailPhoneValidator, creatUser);


authRoute.post(`${BASE_URL}/login`, validateInput(loginSchema), loginUser);


authRoute.post(`${BASE_URL}/forgot-password`, validateInput(forgotPasswordSchema), forgotPassword);

authRoute.get(`${BASE_URL}/reset-password`, validateInput(userResetPasswordSchema), resetPassword);

authRoute.get(`${BASE_URL}/logout`, logOut);
