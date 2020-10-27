const mongoose = require('mongoose')
import { logger } from '../utils';

const url = 'mongodb://127.0.0.1:27017/trafficAnalyzer';
	
export const db = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }   )

const conn = mongoose.connection
conn.once('open', () => logger('Connected to database'))
conn.on('err', (err) => logger('connection error', err));
