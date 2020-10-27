import { saveUser, findUser } from '../services/user';
import {SIGNUP_SUCCESS, SERVER_ERROR, LOGIN_SUCCESS, INVALID_USER } from '../utils/constant';
import { createPassword, comparePassword, createNewToken } from '../utils/security';
import {db} from '../database/index';
import User from '../database/model/User';

export const creatUser = async (req, res) => {
	const { password, CNIC } = req.body;
	console.log(req.body);
	
	try {
		const hash = await createPassword(password)
		const user = await saveUser({...req.body, CNIC_number:CNIC, password: hash,});

		const payload = {
			userId: user._id,
			email: user.email,
			userType: user.userType
		}

		const jwtToken = await createNewToken(payload);
		return res.status(201).json({
			status: 201,
			message: SIGNUP_SUCCESS,
			data: {
				id:user._id,
				firstName: user.fullName,
				email: user.email,
				phone: user.phone,
				userType: user.userType,
				city: user.city,
				country: user.country,
				CNIC:user.CNIC_number,
				createdAt: user.createdAT,
				createdAt: user.updatedAT

			}, jwtToken
		})

	} catch (err) {
		return res.status(500).json({
			status: 500,
			message: SERVER_ERROR
		})	}
}



export const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body

		const user = await findUser(username);
		if (user) {
			const compare = await comparePassword(password, user.email)
			if (compare) {
				const payload = {
					userId: user._id,
					email: user.email,
					userType: user.userType
				}
				const jwtToken = await createNewToken(payload)

				return res.status(200).json({
					status: 200,
					message: LOGIN_SUCCESS,
					data: {
						id:user._id,
						fullName: user.fullName,
						email: user.email,
						phone: user.phone,
						userType: user.userType,
						city: user.city,
						country:user.country,
						CNIC:user.CNIC_number,
						createdAt: user.createdAT
					}, jwtToken
				})
			}
			return res.status(401).json({
				status: 401,
				message: INVALID_USER
			})
		}
		return res.status(401).json({
			status: 401,
			message: INVALID_USER
		})
	} catch (error) {
		return res.status(500).json({
			status: 500,
			message: SERVER_ERROR
		})
	}
}
export const logOut = (req, res) => {
	try {
	  return res.status(200).json({
		message: 'Logout was successful'
	  });
	} catch (error) {
	  return res.status(500).json({ status: 500, message: SERVER_ERROR_MESSAGE });
	}
};