const pool = require('../db');

// Login Page Functions

// Function to get all users in the database
async function getUsers() {
  const client = await pool.db_connection;
  try {
    const [results, fields] = await client.execute('SELECT * FROM users');
    console.log(`Here are the users: ${results}`);
    return results;
  } catch (e){
    console.log(e);
    throw e;
  }
}

// Function to return all the measurement data from the pi
async function getData() {
  const client = await pool.db_connection;
  try {
    const [results, fields] = await client.execute('Select * from measurement;');
    return results;
  } catch (e){
    console.log(e);
    throw e;
  }
}

// Function to verify a user before loggin them in, checks if a user/password combination exists in the database for logging in
async function verifyUser(username, password) {
  const client = await pool.db_connection;
  try {
      const query = {
        text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
        values: [username, password],
      }
      const [result, fields] = await client.execute(query);
      var acctype = 'failed';
      var id = -1;
      if (result.rows.length == 1){
        acctype = result[0].account_type;
        id = result[0].user_id;
      }
      return {acctype, id};
  } catch (e){
    console.log(e);
    throw e;
  }
}

async function addUser(username, password) {
  const client = await pool.db_connection;
  try {
      const query = {
        text: "INSERT INTO users (username, password, account_type) VALUES ($1, $2, $3)",
        values: [username, password, 'registered'],
      };

      const [results, fields] = await client.execute(query);
      return results;
  } catch (e){
    console.log(e);
    throw e;
  }
}

// Function for admins to show a product that is currently not listed

module.exports =
{
  getData,
  getUsers,
  verifyUser,
  addUser,
};