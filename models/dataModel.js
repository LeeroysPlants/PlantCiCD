
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

// Function for admins to show a product that is currently not listed

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

  async function waterPlantButtonPressed(plantId) {
    const client = await pool.db_connection; 
    console.log("plant id in model is: " + plantId); 
try{
  const query = `UPDATE PlantWatering SET needs_watering = TRUE WHERE plant_id = ?`

  client.query(query, [plantId]); 

  } catch(err){
    console.error(err); 
    throw err; 
  }
}

  async function doesPiNeedToWaterPlant(plantId){
    const client = await pool.db_connection; 
    try{
      const query = `SELECT needs_watering FROM PlantWatering WHERE plant_id = ?`; 
      const response = await client.query(query, [plantId]); 
      const data = response[0][0].needs_watering; 
      if(data == 1){ //resets water plant to false so Pi doesn't water it again next check
        const resetWaterQuery = 'UPDATE PlantWatering SET needs_watering = FALSE WHERE plant_id = ?'; 
        await client.query(resetWaterQuery, [plantId]); 
        console.log("water plant was true, resetting to false"); 
      }
      return(data); 
       } catch(err){
        console.error(err); 
        throw err; 
       }
  }
  async function getSensorData(){
    const client = await pool.db_connection; 
    try{
      const waterLevelQuery = 'SELECT reading, time_ FROM measurement WHERE sensor_id =  1 ORDER BY time_'; 
      const soilMoistureQuery = 'SELECT reading, time_ FROM measurement WHERE sensor_id = 2 ORDER BY time_'; 
      const tempQuery = 'SELECT reading, time_ FROM measurement WHERE sensor_id = 3 ORDER BY time_'; 
      const humidityQuery = 'SELECT reading, time_ FROM measurement WHERE sensor_id = 4 ORDER BY time_'; 
      //def need to break down mysql response more
    
      const data = {
        waterLevel: await client.query(waterLevelQuery), 
        soilMoistureData: await client.query(soilMoistureQuery), 
        tempData: await client.query(tempQuery),
        humidityData: await client.query(humidityQuery) 
      }; 
      return data; 
    }catch(err){
      console.errror(err); 
      throw err; 
    }
  }


// Old in memory model, deprecated and scheduled for removal in a minor version change
let users = [
  {userid: 1, username: 'pharris', password: 'password', account_type: 'registered'},
  {userid: 2, username: 'chouston', password: "drowssap", account_type: 'admin'},
];

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
  waterPlantButtonPressed,
  doesPiNeedToWaterPlant,
  getSensorData
};