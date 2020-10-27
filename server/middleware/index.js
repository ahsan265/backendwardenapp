import Joi from '@hapi/joi';

export const password = Joi.string()
  .regex(/^[A-Za-z]{6,}/)
  .required()
  .messages({
    'string.pattern.base':
			'Password must be eight character long',
	});
	
  
  
export const updatePassword = Joi.string()
.regex(/^[A-Za-z]{6,}/)
.messages({
  'string.pattern.base':
    'Password must be eight character long',
});

export const phone = Joi.number()
.messages({
	'string.patterns.base': 'Your phone number is incorrect',
	'string.empty': 'Phone is not allowed to be empty'
});

export const email = Joi.string()
	.email().required().messages({
		'string.pattern.base':'email cannot be empty'
	})

  
export const updateEmail = Joi.string()
.email().messages({
  'string.pattern.base':'email cannot be empty'
})

	export const name = (fieldName) =>
  Joi.string()
    .regex(/^[A-Za-z ]+$/)
    .messages({
      'string.pattern.base': `${fieldName} field cannot contain numbers and should not be empty`,
      'string.empty': `${fieldName} cannot be an empty field`,
      'any.required': `${fieldName} cannot be empty`,
		});
		
export const list = (fields, type='type') => 
Joi.string()
    .valid(...fields)
    .error(new Error(`Specify a valid ${type}.`));

    		
export const genderList = (fields, type='Gender') => 
Joi.string()
    .valid(...fields)
    .error(new Error(`Specify a valid ${type}.`));