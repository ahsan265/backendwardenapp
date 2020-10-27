import Token from '../database/model/token';

export const findToken = async (item) => {
	try {
			return await Token.findOne({token: item})		  
	} catch (err) {
		return err;
}
}


export const generateToken = async (item) => {
	try {
		const token = new Token(item);
		return await token.save(token);
	} catch(err) {
		return err
	}
}

export const destroyToken = async (userId, token) => {
	try {
		 return await Token.findOneAndDelete({userId, token})
	} catch (err) {
		return err
	 }
}