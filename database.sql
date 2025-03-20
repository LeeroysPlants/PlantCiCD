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

INSERT INTO device (type_, name_) VALUES ("devPi", "Pi");
