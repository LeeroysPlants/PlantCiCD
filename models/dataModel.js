
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

const dataModel = {
  // Function to return all the measurement data from the pi
  getData: () => {
    // TODO Logic to fetch data from a source
    return 'Hello, LeeRoy!';
  },
};

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

async function waterPlantButtonPressed(plantId) {
  const client = await pool.db_connection;
  console.log("plant id in model is: " + plantId);
try{
const query = `UPDATE PlantWatering SET needs_watering = TRUE WHERE plant_id = ?`

client.execute(query, [plantId]);

} catch(err){
  console.error(err);
  throw err;
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
      const data = {
        waterLevelData: (await client.query(waterLevelQuery))[0], 
        soilMoistureData: (await client.query(soilMoistureQuery))[0], 
        tempData: (await client.query(tempQuery))[0],
        humidityData: (await client.query(humidityQuery))[0]
      };  
      return data; 
    }catch(err){
      console.errror(err); 
      throw err; 
    }
  }





} catch(err){
  console.error(err);
  throw err;
}
}

async function doesPiNeedToWaterPlant(plantId){
  const client = await pool.db_connection;
  try{
    const query = `SELECT needs_watering FROM PlantWatering WHERE plant_id = ?`;
    const response = await client.execute(query, [plantId]);
    const data = response[0][0].needs_watering;
    if(data == 1){ //resets water plant to false so Pi doesn't water it again next check
      const resetWaterQuery = 'UPDATE PlantWatering SET needs_watering = FALSE WHERE plant_id = ?';
      await client.execute(resetWaterQuery, [plantId]);
      console.log("water plant was true, resetting to false");
    }
    return(data);
     } catch(err){
      console.error(err);
      throw err;
     }
}

module.exports =
{
  dataModel,
  getUsers,
  verifyUser,
  addUser,
  waterPlantButtonPressed,
  doesPiNeedToWaterPlant,
  getSensorData
};