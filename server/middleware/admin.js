import Joi from '@hapi/joi';
import { password, phone, email, list, genderList } from '../middleware/index';
                                                                                                               

export const authenticationSchema = Joi.object({
	fullName: Joi.string().required(),
	email: email.required(),
	city: Joi.string().required(),
	country: Joi.string().required(),
	phone: phone.required(),
	password,
	CNIC:Joi.string().required(),
	userType: list(['admin', 'traffic-warden']),
	Gender: genderList(['Male', 'Female'])
	.max(100).required()
})


export const updateUserSchema = Joi.object({
	fullName: Joi.string(),
	email: email,
	city: Joi.string(),
	country: Joi.string(),
	phone: phone,
	password,
	CNIC:Joi.string(),
	userType: list(['admin', 'traffic-warden']),
	Gender: genderList(['Male', 'Female'])
	.max(100),
})


export const loginSchema = Joi.object({
	username: Joi.string()
	.min(3)
	.max(100)
	.required(),
password,
})


export const forgotPasswordSchema = Joi.object({
  username: Joi.string()
    .min(3)
    .max(60)
    .required(),
});


export const userResetPasswordSchema = Joi.object({
	token: Joi.string().required(),
  password: Joi.string()
    .required()
    .messages({
      'string.pattern.base': 'Incorrect password',
      'string.empty': 'Password is not allowed to be empty.',
    }),
});
