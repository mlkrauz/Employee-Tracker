//Imports
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

//Launch express & middleware
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

