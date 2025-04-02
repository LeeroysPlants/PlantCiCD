const pool = require('../db');

// Login Page Functions

// Function to get all users in the database
async function getUsers() {
  const client = await pool.db_connection;
  try {
    const result = client.execute('SELECT * FROM users');
    console.log(`Here are the users: ${result}`);
    return result.rows;
  } catch (e){
    console.log(e)
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
      const result = client.execute(query);
      var acctype = 'failed';
      var id = -1;
      if (result.rows.length == 1){
        acctype = result.rows[0].account_type;
        id = result.rows[0].user_id;
      }
      return {acctype, id};
  } catch (e){
    console.log(e)
  }
}

async function addUser(username, password) {
  const client = await pool.db_connection;
  try {
      const query = {
        text: "INSERT INTO users (username, password, account_type) VALUES ($1, $2, $3)",
        values: [username, password, 'registered'],
      };

      const result = client.execute(query);
      return result.rows;
  } catch (e){
    console.log()
  }
}

// Function for admins to show a product that is currently not listed

module.exports =
{
  getUsers,
  verifyUser,
  addUser,
};