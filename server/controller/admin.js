import { saveUser, findUser, getAllWarden, getOneWarden, updateUser } from '../services/user';
import {SERVER_ERROR, TRAFFIC_WARDER_SUCCESS, NOT_REPORT, REPORTS, NO_WARDEN,WARDEN_UPDATE, WARDENS,WARDEN, WARDEN_NOT_EXIST, REPORT_DELETED, NO_WARDEN_REPORT,REPORT_NOT_EXIST, NOT_USER, USER_DELETED  } from '../utils/constant';
import { createPassword, createNewToken } from '../utils/security';
import { getAllReport, updateReports, destroyWarden, destroyWardenReport } from '../services/admin';

import { findReport, findReportByUserId } from '../services/reports';





export const addTrafficWarder = async (req, res) => {
	const {  password, CNIC } = req.body;
	try {
		const hash = await createPassword(password)
		const user = await saveUser({ ...req.body, CNIC_number:CNIC, password: hash });

		const payload = {
			userId: user._id,
			email: user.email,
			userType: user.userType
		}

		const jwtToken = await createNewToken(payload);
		return res.status(201).json({
			status: 201,
			message: TRAFFIC_WARDER_SUCCESS,
			data: {
				id:user._id,
				fullName: user.fullName,
				email: user.email,
				phone: user.phone,
				userType: user.userType,
				city: user.city,
				CNIC:user.CNIC_number,
				country:user.country,
				createdAt: user.createdAT
			}, jwtToken
		})

	} catch (err) {
		return res.status(500).json({
			status: 500,
			message: SERVER_ERROR
		})	}
}

export const fetchAllReportsFromWarden = async (req,res) => {
	try {
		const reports = await getAllReport();
		if (reports.length === 0) {
			return res.status(404).json({
				status: 404,
				message: NO_WARDEN_REPORT
			})
		}

		return res.status(200).json({
			status: 200,
			message: REPORTS,
			data: reports
		})
	
	} catch (err) {
			return res.status
			(500).json({
				status: 500,
				message: SERVER_ERROR
			})	}
}

export const fetchOneReports = async (req, res) => {
	try {
		const id = req.params.id;
		const report = await findReport(id);
		if (!report || report == null) {
			return res.status(404).json({
				status: 404,
				message: NOT_REPORT
			})
		}
		return res.status(200).json({
			status: 200,
			message: REPORTS,
			data: report
		})
	} catch (err) {
			return res.status(500).json({
				status: 500,
				message: SERVER_ERROR
			})	}
}

export const getTrafficWardens = async (req, res) => {
	try {
		const results = await getAllWarden();
		if (results.length === 0) {
			return res.status(404).json({
				status: 404,
				message: NO_WARDEN
			})
		}
		return res.status(200).json({
			status: 200,
			message: WARDENS,
			data: results
		})
	} catch (err) {
		return res.status(500).json({
			status: 500,
			message: SERVER_ERROR
		})	}
}

export const getOneTrafficWarden = async (req, res) => {
	try {
		const { wardenId } = req.params;

		const warden = await getOneWarden(wardenId);
		if (!warden || warden === null) {
			return res.status(404).json({
				status: 404,
				message: WARDEN_NOT_EXIST
			})
		}
		return res.status(200).json({
			status: 200,
			message: WARDEN,
			data: warden
		})
	} catch (err) {
		return res.status(500).json({
			status: 500,
			message: SERVER_ERROR
		})	}
}


export const editReport = async (req, res) => {
	try {
		const { userId } = req.token.payload;
		const { reportId } = req.params

		const find = await findReportByUserId(userId, reportId);
		if (!find || find === null) {
			return res.status(404).json({
				status: 404,
				message: REPORT_NOT_EXIST,
			})
		}
		const update = await updateReports(reportId, req.body)

		return res.status(200).json({
			status: 200,
			message: REPORT_UPDATE,
			data: update
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })	}
}


export const editWardenInfo = async (req, res) => {
	try {
		
		const { userId } = req.params

		const find = await findUser(userId);
		if (!find || find === null) {
			return res.status(404).json({
				status: 404,
				message: NOT_USER,
			})
		}
		const update = await updateUser(userId, req.body)

		return res.status(200).json({
			status: 200,
			message: WARDEN_UPDATE,
			data: update
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })	}
}


export const deleteWarden = async (req, res) => {
	try {
		const { userId } = req.params


		const deleteWarden = await destroyWarden(userId)

		return res.status(200).json({
			status: 200,
			message: USER_DELETED
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })	}
}



export const deleteReport = async (req, res) => {
	try {
		const { reportId } = req.params

		const deleteWarden = await destroyWardenReport(reportId)

		return res.status(200).json({
			status: 200,
			message: REPORT_DELETED,
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })	}
}
