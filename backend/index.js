const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 10000;

// Замените на ваш API-ключ от SStats.net
const API_KEY = 'elumrolgdt9hfc3b';

app.use(express.static(path.join(__dirname, '../frontend')));

// Endpoint для получения матчей
app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.sstats.net/games/list', {
      headers: {
        'apikey': API_KEY
      }
    });

    const matches = response.data;

    // Группируем матчи по лигам
    const groupedMatches = {};

    matches.forEach(match => {
      const league = match.league.name;
      if (!groupedMatches[league]) {
        groupedMatches[league] = [];
      }
      groupedMatches[league].push({
        homeTeam: {
          name: match.home_team.name,
          logo: match.home_team.logo
        },
        awayTeam: {
          name: match.away_team.name,
          logo: match.away_team.logo
        },
        date: match.date,
        time: match.time
      });
    });

    res.json(groupedMatches);
  } catch (error) {
    console.error('Ошибка при получении матчей:', error.message);
    res.status(500).send('Ошибка при загрузке данных');
  }
});

// Обработчик главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
