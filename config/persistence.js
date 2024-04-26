const express = require('express')
const db = require('mysql')


const mysql = require('mysql2');

function connectToDatabase() {
  // create a new MySQL connection
  const connection = mysql.createConnection({
    host: 'mysql-bpe-project-aliimran20004-88bc.d.aivencloud.com',
    port: 20419,
    user: 'avnadmin',
    password: 'AVNS_7dw5-zuiWf5KtkR9U0S',
    database: 'Test_ali'
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });

  return connection;
}
const connection = connectToDatabase();
module.exports = connection;