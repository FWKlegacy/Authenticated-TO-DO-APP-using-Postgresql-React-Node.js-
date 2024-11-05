CREATE DATABASE todoapp;

CREATE TABLE todos( 
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    TITLE VARCHAR(30),
    progress INT,
    date VARCHAR(300)
);
   

CREATE TABLE users(
    email VARCHAR(255) PRIMARY KEY,
    Hashed_password VARCHAR(255)
);