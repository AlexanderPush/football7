const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 10000;

// Укажите свой API-ключ, если он нужен (или уберите, если не требуется)
const API_KEY = 'elumrolgdt9hfc3b';

app.use(express.static(path.join(__dirname, '../frontend')));

// Получение матчей
app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://sstats.net/api/matches', {
      headers: {
        // Уберите Authorization, если не нужен
        'Authorization': `Bearer ${API_KEY}`,
        'Accept': 'application/json'
      }
    });

    console.log('Ответ от API:', response.data); // Посмотрите структуру данных

    const matches = response.data.matches || response.data.data || response.data;

    if (!Array.isArray(matches)) {
      return res.status(500).send('Структура данных не соответствует ожиданиям');
    }

    const groupedMatches = {};
    matches.forEach(match => {
      const league = match.league || match.competition || 'Неизвестная лига';

      if (!groupedMatches[league]) {
        groupedMatches[league] = [];
      }

      groupedMatches[league].push({
        homeTeam: {
          name: match.home_team || match.homeTeam?.name || 'N/A',
          crest: match.home_team_crest || match.homeTeam?.crest || ''
        },
        awayTeam: {
          name: match.away_team || match.awayTeam?.name || 'N/A',
          crest: match.away_team_crest || match.awayTeam?.crest || ''
        },
        utcDate: match.utc_date || match.date || match.utcDate || 'N/A',
      });
    });

    res.json(groupedMatches);
  } catch (error) {
    console.error('Ошибка при получении матчей:', error.message);
    res.status(500).send('Ошибка при загрузке данных');
  }
});

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
