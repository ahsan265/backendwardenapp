import Joi from '@hapi/joi';
import {  list } from '../middleware/index';
                                                                                                    

export const reportSchema = Joi.object({
	origin: Joi.string(),
	destination: Joi.string(),
	trafficType: list(['road block', 'road accident', 'road maintenance', 'vip movement']),
	congestionDetails: Joi.string(),
	congestionTime: Joi.string(),
})


export const updateReportSchema = Joi.object({
	origin: Joi.string(),
	destination: Joi.string(),
	trafficType: list(['road block', 'road accident', 'road maintenance', 'vip movement']),
	congestionDetails: Joi.string(),
	congestionTime: Joi.string(),

})
