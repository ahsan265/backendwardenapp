const mongoose = require('mongoose');
const { schema } = require('./User');
const { object } = require('@hapi/joi');
 
	const Schema = mongoose.Schema
	const dataType = Schema.Types;
	const TokenSchema = new mongoose.Schema({
		userId: {
			type: dataType.ObjectId,
			required: true
		},
		token: {
			type: String,
			required: true
		},
		createdAt: {
			type: Date,
			default: Date.now
		},
		updatedAt: {
			type: Date,
			default: Date.now
	}
	})

const Token = mongoose.model('token', TokenSchema);
module.exports = Token;