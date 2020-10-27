import {findUser } from '../services/user';
import {SERVER_ERROR, ALREADY_EXIST} from '../utils/constant'

const formatErrorMessage = (innerError) => innerError.split('"').join('');

export const validateInput = (schema) => async (req, res, next) => {
	try {
		await schema.validateAsync({ ...req.body, ...req.params});
		req.body = { ...req.body, ...req.params };
			return next()

	} catch (error) {
		return res.status(422).json({status: 422, message: formatErrorMessage(error.message) })
	}

}

export const emailPhoneValidator = async (req, res, next) => {
  try {
    const { email, phone } = req.body;
    const checkPhone = await findUser(phone);
    const checkMail = await findUser(email);
    if (
      (checkMail && checkMail !== 0) ||
      (checkPhone && checkPhone !== 0)
    ) {
      return res.status(409).json({status: 409 ,message: ALREADY_EXIST });
    }
    return next();
  } catch (err) {
    return res.status(500).json({status:500, message: err.message});
  }
};