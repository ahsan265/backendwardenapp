import { geLatLong, findReportByUserId, reportTraffic, allReportByUserId, updateReportsByWardenId } from '../services/reports';
import { NOT_EXIST, SERVER_ERROR, REPORT_SUCCESS, NOT_WARDEN, REPORTS, REPORT_UPDATE, NO_REPORT, NO_UPDATES} from '../utils/constant';
import { findUser} from '../services/user';


export const sendReport = async (req, res) => {
	try {
		//console.log(req.body);

		const {congestionTime,trafficType,origin,destination,congestionDetails} = req.body;
		const {userId} = req.token.payload;
		
		const id = userId;
		const user = await findUser(userId);
		console.log(userId);
		var reportedBy=user.fullName;
		//console.log(congestionDetails);
		//console.log(username,congestionTime,trafficType,origin,destination,congestionDetails);
		if (!user || user == null) {
			return res.status(404).json({status: 404, message: NOT_EXIST})
		};
		if(!user && user.userType !== 'traffic-warden') {
			return res.status(401).json({status: 401, message: NOT_WARDEN})
		}
		const report = await reportTraffic({userId,origin,destination,trafficType,congestionDetails,reportedBy,congestionTime});
		console.log(report);
		return res.status(201).json({status: 201, message: REPORT_SUCCESS, data:report})
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })
	}
}

export const fetchOneReportWardenId = async (req, res) => {
	try {
		const { userId } = req.token.payload;
		console.log(userId)
		const { reportId } = req.params;
		const report = await findReportByUserId(userId, reportId)
		if (!report || report === null) {
			return res.status(404).json({
				status: 404,
				message: NO_UPDATES,
			})
		}
		return res.status(200).json({
			status: 200,
			message: REPORTS,
			data: report
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })
	}
}

export const fetchAllReportByWardenId = async (req, res) => {
	try {
		const {userId} = req.token.payload;
		const report = await allReportByUserId(userId);
		if (report.length === 0) {
			return res.status(404).json({
				status: 404,
				message: NO_UPDATES,
			})
		}
		return res.status(200).json({
			status: 200,
			message: REPORTS,
			data: report
		})
	
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })	}
}


export const editReportsByWardenId = async (req, res) => {
	try {
		const { userId } = req.token.payload;
		const { reportId } = req.params

		const find = await findReportByUserId(userId, reportId);
		if (!find || find === null) {
			return res.status(404).json({
				status: 404,
				message: INVALID_REPORT_OWNER,
			})
		}
		const update = await updateReportsByWardenId(reportId, req.body)
		console.log('>>>.reports', update)

		return res.status(200).json({
			status: 200,
			message: REPORT_UPDATE,
			data: update
		})
	} catch (err) {
		return res.status(500).json({ status: 500, message: SERVER_ERROR })	}
}
