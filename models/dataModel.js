const pool = require('../db');

// Login Page Functions

// Function to get all users in the database
async function getUsers() {
  const client = await pool.db_connection;
  try {
    const result = client.query('SELECT * FROM users');
    console.log(`Here are the users: ${result}`);
    return result.rows;
  } finally {
    // client.release();
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
      const result = client.query(query);
      var acctype = 'failed';
      var id = -1;
      if (result.rows.length == 1){
        acctype = result.rows[0].account_type;
        id = result.rows[0].user_id;
      }
      return {acctype, id};
  } finally {
    client.release();
  }
}

async function addUser(username, password) {
  const client = await pool.db_connection;
  try {
      const query = {
        text: "INSERT INTO users (username, password, account_type) VALUES ($1, $2, $3)",
        values: [username, password, 'registered'],
      };

      const result = client.query(query);
      return result.rows;
  } finally {
    client.release();
  }
}


// Product Page Functions

// Checkout Page Functions

// Admin Page Functions

async function logAction(executor, receiver, action) {
  const client = await pool.connect();
  const date = Date();
  console.log(executor, receiver, action, date);

  try {
    const query = {
      text: 'INSERT INTO adminactions (action_executor, action_receiver, action_type, action_time) VALUES ($1, $2, $3, $4)',
      values: [executor, receiver, action, date],
    }
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}

async function getAdminActions() {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM adminactions ORDER BY action_id DESC';
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}


// Old in memory model, deprecated and scheduled for removal in a minor version change
let users = [
  {userid: 1, username: 'pharris', password: 'password', account_type: 'registered'},
  {userid: 2, username: 'chouston', password: "drowssap", account_type: 'admin'},
];
let products = [
  {id: 0, description: 'Cat Food', price: 5.99, image: 'images/cat-food.bmp', display: true},
  {id: 1, description: 'Dog Food', price: 5.99, image: 'images/dog-food.bmp', display: true},
  {id: 2, description: 'Bird Food', price: 5.99, image: 'images/bird-food.bmp', display: false},
  {id: 3, description: 'Lizard Food', price: 5.99, image: 'images/lizard-food.bmp', display: true},
]

let cart = [
  // {id: 1, description: 'Cat Food', price: 5.99},
  // {id: 2, description: 'Pet Stuff', price: 5.99},
  // {id: 3, description: 'Dog Food', price: 5.99},
]

const dataModel = {
    getData: () => {
      // Logic to fetch data from a source
      return 'Hello, LeeRoy!';
    },
  };
module.exports =
{
  dataModel,
  getUsers,
  getAdminActions,
  verifyUser,
  addUser,
};