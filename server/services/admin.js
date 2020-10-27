import Reports from '../database/model/reports';
import Map from '../database/model/map';
import User from '../database/model/User';


export const getAllReport = async () => {
	try {
		return await Reports.find().sort({createdAt:-1});
	} catch (err) {
		return err
}
}

export const saveMap = async (items) => {
	try {
		const map = new Map(items);
		return await map.save(map)
	} catch (err) {
		return err;
	}
}




export const updateReports = async (reportId, items) => {

	try {
		return await Reports.findOneAndUpdate({ _id: reportId }, items, {
			new: true, upsert: true
		});
	}catch(err){
		return err
}
}

export const destroyWarden = async (userId) => {
	try {
		 return await User.findOneAndDelete({_id:userId})
	} catch (err) {
		return err
	 }
}


export const destroyWardenReport = async (reportId) => {
	try {
		 return await Reports.findOneAndDelete({_id:reportId})
	} catch (err) {
		return err
	 }
}


export const updateWardenInfo = async (userId, items) => {

	try {
		return await User.findOneAndUpdate({ _id: userId }, items, {
			new: true, upsert: true
		});
	}catch(err){
		return err
}
}