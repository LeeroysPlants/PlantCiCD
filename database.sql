create table device (
    device_id primary key auto increment,
    type_ varchar(10) not null,
    name_ varchar(10) not null,
    location_ varchar(10)
);


create table Sensor (
    sensor_id primary key auto increment,
    name varchar(10) not null,
    desc_ varchar(40),
    device_id not null,
    foreign key (device_id) references device(device_id)
);

create table Measurement(
    meas_id primary key auto increment,
    measurement float not null,
    time_ time not null,
    sensor_id bigint not null,
    foreign key (sensor_id) references sensor(sensor_id)
);

insert into device(type_, name_) values("Raspberry Pi 5", "Pi");