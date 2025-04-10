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
INSERT INTO measurement (reading, time_, sensor_id) VALUES
(21, '2025-03-25 14:58:27', 1),
(228, '2025-03-25 14:58:27', 2),
(76.46, '2025-03-25 14:58:27', 3),
(61, '2025-03-25 14:58:27', 4),
(20, '2025-03-25 15:03:25', 1),
(200, '2025-03-25 15:03:25', 2),
(76.82, '2025-03-25 15:03:25', 3),
(61, '2025-03-25 15:03:25', 4),
(18, '2025-03-25 15:14:42', 1),
(190, '2025-03-25 15:14:42', 2),
(75.74, '2025-03-25 15:14:42', 3),
(60, '2025-03-25 15:14:42', 4),
(15, '2025-03-25 15:18:26', 1),
(180, '2025-03-25 15:18:26', 2),
(78, '2025-03-25 15:18:26', 3),
(60, '2025-03-25 15:18:26', 4),
(23, '2025-03-25 15:20:02', 1),
(220, '2025-03-25 15:20:02', 2),
(90, '2025-03-25 15:20:02', 3),
(59, '2025-03-25 15:20:02', 4);
