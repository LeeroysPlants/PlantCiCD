
const piController = {

    receiveData: (req, res) => {
        const currentTime = req.body.time
        const waterLevel = req.body.waterLevel; 
        const soilMoisture = req.body.soilMoisture; 
        const temperature = req.body.temperature; 
        const humidity = req.body.humidity;
        console.log("Sensor Data: \n" +"Current Time: " + currentTime + "\n Water Level: " + waterLevel + "\n Soil Moisture: " + soilMoisture + "\n Temperature: " + temperature + "\n Humidity: " + humidity); 
        res.send("data read!");

    }

}; 
module.exports = piController; 