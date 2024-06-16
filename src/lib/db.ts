// lib/db.js
import mysql from 'mysql2/promise';

const connectDB = async () => {
  try {
    const connection = await mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '$UM!T376mysql',
      database: 'nextuser',
      port:3306
    });
    console.log('Successfully connected to MySQL 🥂');
    return connection.getConnection();
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error: ${err.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;
