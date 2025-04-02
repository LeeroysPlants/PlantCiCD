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
    async checkToWater (req, res){
        const waterPlant = await dataModel.doesPiNeedToWaterPlant(1); //hardcoded for now, will need to change if multiple plants pop up 
        console.log("in controller water plant: " + waterPlant); 
        res.send(waterPlant.toString()); 
    }

}; 
module.exports = piController; 