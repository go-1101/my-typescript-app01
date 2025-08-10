import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// 環境変数の存在チェック
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

if (!dbConfig.host || !dbConfig.user || !dbConfig.password || !dbConfig.database) {
  console.error("Missing required environment variables for database connection.");
  process.exit(1);
}

// MySQL接続設定
const pool = mysql.createPool(dbConfig);

// ミドルウェア: JSONリクエストボディのパース
app.use(express.json());

// 静的ファイル（HTML, CSS, JS）を配信する設定
app.use(express.static('public'));

// CORS対策
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ルートエンドポイント (変更なし)
app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT 1 + 1 AS solution');
    res.json({ message: 'Hello from TypeScript App!', dbResult: rows });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).send('Database connection failed.');
  }
});

// 全タスクを取得 (Read)
app.get('/todos', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM todos');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send('Failed to fetch todos.');
  }
});

// 新規タスクを追加 (Create)
app.post('/todos', async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).send('Task is required.');
  }
  try {
    await pool.execute('INSERT INTO todos (task) VALUES (?)', [task]);
    res.status(201).send('Todo created successfully.');
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).send('Failed to create todo.');
  }
});

// タスクを更新 (Update)
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { is_completed } = req.body;
  if (typeof is_completed !== 'boolean') {
    return res.status(400).send('is_completed must be a boolean.');
  }
  try {
    await pool.execute('UPDATE todos SET is_completed = ? WHERE id = ?', [is_completed, id]);
    res.send('Todo updated successfully.');
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send('Failed to update todo.');
  }
});

// タスクを削除 (Delete)
app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM todos WHERE id = ?', [id]);
    res.send('Todo deleted successfully.');
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send('Failed to delete todo.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
