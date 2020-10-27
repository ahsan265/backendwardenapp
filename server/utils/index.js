import 'dotenv/config';

export const logger = (message) => {
	const log = console;
	log.table(message)
 }

export const getEnv =  (value, defaultValue) => {
	try {
		const variable = process.env[value] || defaultValue
		return variable;
	} catch (err) {
		return err
	 }
}
