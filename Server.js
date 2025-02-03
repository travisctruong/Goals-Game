const axios = require('axios');
const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
app.use(cors());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'goals_game'
});

app.listen(3000, () => {
  console.log(`Backend server running on http://localhost:3000`);
});

app.get('/api/total', (req, res) => {
  conn.query('SELECT COUNT(*) AS total_rows FROM players', (err, results) => {
    if (err) {
        res.status(500).json({ error: err.message })
      } else {
        res.json({ totalRows: results[0].total_rows });
      }
  });
});

app.get('/api/player', (req, res) => {
  const id = req.query.id;
  conn.query('SELECT name, goals, photo_url FROM players WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error with query:', err.message);
      return;
    } else {
      res.json(results);
    }
  });
});

const API_KEY = '3';
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json';

async function getPlayerData(PLAYER_NAME, PLAYER_GOALS, ID) {
  try {
    const response = await axios.get(`${BASE_URL}/${API_KEY}/searchplayers.php?p=${PLAYER_NAME}`);
    const data = response.data;

    const player = data.player[0];
    const playerName = PLAYER_NAME.replace(/_/g, ' ');
    const playerPhoto = player.strCutout;

    const query = 'INSERT INTO players (name, goals, photo_url, id) VALUES (?, ?, ?, ?)';
    conn.query(query, [playerName, PLAYER_GOALS, playerPhoto, ID], (err, results) => {
      if (err) {
        console.error('Error with query:', err.message);
        return;
      } else {
        console.log('Insert success');
      }
  });

  } catch (error) {
    console.error('Error fetching player data:', error);
  }
}

// getPlayerData('', 0, 110);
