import express from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import log from 'morgan';
import cors from 'cors';
import {logger} from './utils';
import conn from '../server/database/index.js';
import Routes from './routes/index';

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(log('dev'));
app.use(cors())

app.use('/api/v1', Routes);
const port = process.env.PORT || 5000;
const server = `http://localhost:${port}`;



app.get('/', (req, res) => {
	res.status(200).json({status:200, message:'Welcome to our trafficAnalyzer'})
});
	
app.all('*', (req, res) => {
	res.status(404).json({status:404, message: 'This endpoint does not exist'})
})
app.set('PORT', port);

app.listen(port, () => logger(`server running on ${server}`));

  