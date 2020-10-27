import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getEnv } from '../utils/index';
import { findUser } from '../services/user';
import { SERVER_ERROR, NO_USER, UNAUTHORIZED, NOT_WARDEN } from '../utils/constant';

const signOption = {
	issuer: 'wwww.trafficanalyzer.com',
	subject: 'Authentication Bearer',
	expiresIn: '30d'
}

export const createPassword = async (password) => {
	try {
		let salt = 10
		const hash = await bcrypt.hash(password, salt);
		return hash;
	} catch (err) {
		return err
	}
}

export const createNewToken = async (payload) => {
	try {
		const token = await jwt.sign({ payload }, getEnv('JWT_SECRET'), signOption,)
		return token
	} catch (err) {
		return err
	}
}

export const comparePassword = async (password, username) => {
	try {
		const find = await findUser(username);
		const compare = await bcrypt.compare(password, find.password);
		return compare	
	} catch (err) {
		return err
}
}

export const verifyToken = async (token) => {
	try {
		const verify = jwt.verify(token, getEnv('JWT_SECRET'), signOption)
	 return verify
	} catch (err) {
		return err;
	}
}

export const verifyTokenMiddleWare = async (req, res, next) => {
	try {
		const data = req.headers.authorization;
		 
		const token = await verifyToken(data);
		if (!token) {
			return res.status(401).json({
				status: 401,
				message: 'Invalid authorization token'
			})
		} else {
			req.token = token;
			next()
		}
	} catch (err) {
		return res.status(500).json({status: SERVER_ERROR})
	}
}

export const verifyAdminToken = async (req, res, next) => {
	try {
		const data = req.headers.authorization;
		const token = await verifyToken(data);

		const userId  = token.payload.userId

		const find = await findUser(userId);

		if (!find || find === null) {
			return res.status(401).json({
				status: 401,
				message: NO_USER
			})
		}

		if (find.userType !== 'admin') {
			return res.status(401).json({
				status: 401,
				message: UNAUTHORIZED
			})
		}
		if (!token) {
			return res.status(401).json({
				status: 401,
				message: 'Invalid authorization token'
			})
		} else {
			req.token = token;
			next()
		}
	} catch (err) {
		return res.status(500).json({ status: 500, message:SERVER_ERROR })
	}
}


export const WardenVerifyTokenMiddleware = async (req, res, next) => {
	try {
		const data = req.headers.authorization;
		//console.log(data);
		const token = await verifyToken(data);
		const {userId} = token.payload
		console.log(userId);
		const find = await findUser(userId);
		if (!find || find === undefined) {
			return res.status(401).json({
				status: 401,
				message: NO_USER
			})
		}

		if (find.userType !== 'traffic-warden') {
			return res.status(401).json({
				status: 401,
				message: NOT_WARDEN
			})
		}
		if (!token) {
			return res.status(401).json({
				status: 401,
				message: 'Invalid authorization token'
			})
		} else {
			req.token = token;
			next()
		}
	} catch (err) {
		return res.status(500).json({ status: 500, message:SERVER_ERROR })
	}
}
