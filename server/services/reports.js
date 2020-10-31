import axios from 'axios';
import Reports from '../database/model/reports';
import 'dotenv/config';


export const geLatLong = async (city) => {
	try {
		const apiKey = process.env.MAPBOX_API_KEY;
		const userAddress = city.split(' ').join('+')
		const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${userAddress}.json?access_token=${apiKey}`;
		const { data } = await axios({ method: 'GET', url });

		const { features } = data;
		// console.log('euserr>>>>', features[0].geometry.coordinates);

		return {
			longitude: features[0].geometry.coordinates[0],
			latitude: features[0].geometry.coordinates[1]
	 }
	} catch (err) {
		return err
	}
}

export const reportTraffic = async (item) => {
	try {
		const report = new Reports({...item})
		return await report.save(report)
	} catch (err) {
		return err
	}
}

export const findReport = async (reportId) => {
	try {
		return await Reports.findOne({_id: reportId})
	} catch (err) {
		return err
	}

}
export const findReportByLocation = async (loc) => {
	try {
		return await Reports.find({location: loc})
	} catch (err) {
		return err
	}

}
export const findReportByWarden= async (warden) => {
	try {
		return await Reports.find({reportedBy: warden})
	} catch (err) {
		return err
	}

}
export const findReportByTimeDuration= async (TimeDuration) => {
	try {
		return await Reports.find({congestionTime: TimeDuration})
	} catch (err) {
		return err
	}

}
export const findReportByRoadBlock = async (RoadBlock) => {
	try {
		return await Reports.find({trafficType: RoadBlock})
	} catch (err) {
		return err
	}

}
export const findReportByTrafficincident = async (TrafficIncident) => {
	try {
		return await Reports.find({congestionDetails: TrafficIncident})
	} catch (err) {
		return err
	}

}

export const findReportByUserId = async (userId, reportId) => {
	try {
		return await Reports.findOne({_id:reportId, userId: userId})
	} catch (err) {
		return err
	}
}

export const allReportByUserId = async (userId) => {
	try {
		return await Reports.find({ userId: userId }).sort({ createdAt: -1 })
	} catch (err) {
		return err
	}
}


export const updateReportsByWardenId = async (reportId, items) => {

	try {
		return await Reports.findOneAndUpdate({ _id: reportId }, items, {
			new: true, upsert: true
		});
	}catch(err){
		return err
}
}
