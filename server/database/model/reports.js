const { string } = require('@hapi/joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema
const dataType = Schema.Types;
const ReportSchema = new mongoose.Schema({
		userId: {
			type: dataType.ObjectId,
			required: true
		},
		origin: {
			type: String,
			required: true,
		},
		destination: {
			type: String,
			required:true
		},
	trafficType: {
		type: String,
		enum: ['Weather','Road block', 'Road Accident', 'Road Maintenance', 'Vip Movement','Traffic Congestion'],
		required: true
		},
	congestionDetails:{
		type: String,
		required: true,
	},
	reportedBy:{
		type: String,
		required: true,
	},
	congestionTime: {
		type: String,
		required: true,
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

const Reports = mongoose.model('reports', ReportSchema)

module.exports = Reports
