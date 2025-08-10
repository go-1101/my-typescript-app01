import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;

// MySQL接続設定
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// CORS対策
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ルートエンドポイント
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1 + 1 AS solution');
    res.json({ message: 'Hello from TypeScript App!', dbResult: rows });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send('Database connection failed.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});