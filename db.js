const mysql = require('mysql2/promise')
require('dotenv').config();
try{
	console.log("host: " + process.env.DATABASE_HOST); 
	console.log("user: " + process.env.DATABASE_USER); 
const connection = mysql.createConnection({
	host : process.env.DATABASE_HOST,
	user : process.env.DATABASE_USER,
	password : process.env.DATABASE_PASSWORD,
	database : process.env.DATABASE_NAME
        });
		exports.db_connection = connection
	}
	catch(error){
		console.error('MySQL Connection Error:', error.message);
	}
