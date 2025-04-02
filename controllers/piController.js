const  dataModel = require("../models/dataModel");

const piController = {

    receiveData: (req, res) => {
        const currentTime = req.body.time
        const waterLevel = req.body.waterLevel; 
        const soilMoisture = req.body.soilMoisture; 
        const temperature = req.body.temperature; 
        const humidity = req.body.humidity;
        console.log("Sensor Data: \n" +"Current Time: " + currentTime + "\n Water Level: " + waterLevel + "\n Soil Moisture: " + soilMoisture + "\n Temperature: " + temperature + "\n Humidity: " + humidity); 
        res.send("data read!");

    },
    waterPlantButtonPressed: (req, res) => {
        const plantId = req.body.plantId; //include this as part of form submission from button
        dataModel.waterPlantButtonPressed(plantId); 
        res.send("Plant will be watered shortly!"); 

    },
    checkToWater: (req, res) => {
        const waterPlant = dataModel.doesPiNeedToWaterPlant(1); //hardcoded for now, will need to change if multiple plants pop up 
        res.send(waterPlant); 
    }

}; 
module.exports = piController; 