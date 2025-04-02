CREATE TABLE device (
    device_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type_ VARCHAR(32) NOT NULL,
    name_ VARCHAR(32) NOT NULL
);

CREATE TABLE sensor (
    sensor_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(40),
    device_id BIGINT NOT NULL,
    FOREIGN KEY (device_id) REFERENCES device(device_id)
);

CREATE TABLE measurement (
    meas_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    reading FLOAT NOT NULL,
    time_ DATETIME NOT NULL,
    sensor_id BIGINT NOT NULL,
    FOREIGN KEY (sensor_id) REFERENCES sensor(sensor_id)
);

CREATE TABLE PlantWatering(
    plant_id BIGINT Primary key,
    needs_watering BOOLEAN NOT NULL
); 


INSERT INTO device (type_, name_) VALUES ("devPi", "Pi");

INSERT INTO sensor (name, description, device_id) VALUES ("waterLevel", "water level for reserves", 1); 
INSERT INTO sensor (name, description, device_id) VALUES ("soilMoisture", "how wet the soil is", 1); 
INSERT INTO sensor (name, description, device_id) VALUES ("temperature", "temp in F", 1); 
INSERT INTO sensor (name, description, device_id) VALUES ("humidity", "humidity in the room", 1); 
INSERT INTO PlantWatering(plant_id, needs_watering) VALUES (1, false); 

