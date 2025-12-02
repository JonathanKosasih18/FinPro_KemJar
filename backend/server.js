require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS access_logs (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_agent TEXT
      )
    `);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
  }
}

function vulnerableFibonacci(n) {
  if (n <= 1) return n;
  return vulnerableFibonacci(n - 1) + vulnerableFibonacci(n - 2);
}

app.get('/track-and-go', async (req, res) => {
  const { target_url } = req.query;
  const userAgent = req.get('user-agent');

  try {
    await pool.query(
      'INSERT INTO access_logs (user_agent) VALUES ($1)',
      [userAgent]
    );
  } catch (error) {
    console.error('Logging error:', error);
  }

  if (target_url) {
    res.redirect(target_url);
  } else {
    res.status(400).send('Missing target_url parameter');
  }
});

app.get('/status-check', (req, res) => {
  const { difficulty } = req.query;
  const n = parseInt(difficulty) || 10;

  console.log(`Processing status check with difficulty: ${n}`);

  const startTime = Date.now();
  const result = vulnerableFibonacci(n);
  const endTime = Date.now();

  res.json({
    status: 'online',
    difficulty: n,
    result: result,
    processingTime: `${endTime - startTime}ms`
  });
});

app.get('/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM access_logs ORDER BY timestamp DESC LIMIT 10');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('⚠️  WARNING: This server contains intentional vulnerabilities for demo purposes!');
  });
});
