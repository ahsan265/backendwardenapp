import {db} from '../database/index';
import User from '../database/model/User';
import  mongoose  from 'mongoose';

const isObjectId = mongoose.isValidObjectId


export const saveUser = async (data) => {
	try {
		const user = new User(data);
	 return await user.save(user);
}catch (err) {
	return err
}
}

export const findUser = async (item) => {
	try {
		let where
		where = { $or: [{ email: item }, { phone: item }] }
		if (isObjectId(item)) {
			where = {_id: item}
		}
	
		
	return	await User.findOne(where)

	} catch (err) {
		return err
	}
}

export const updateUser = async (userId, items) => {

		try {
			return await Reports.findOneAndUpdate({ _id: reportId }, items, {
				new: true, upsert: true
			});
		}catch(err){
			return err
	}
	}


export const getAllWarden = async () => {
	try {
		let where 
			where = {userType: 'traffic-warden'}
			return await User.find(where).sort({createdAt:-1});
		} catch (error) {
		return error
	}
}


export const getOneWarden = async (wardenId) => {
	try {
		let where 
			where = {userType: 'traffic-warden', _id: wardenId}
			return await User.findOne(where)
	} catch (err) {
		return err
	}
}
