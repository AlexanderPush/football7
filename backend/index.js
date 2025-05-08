const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 10000;

const API_KEY = '4a0bce32b9584e8992e7a5c82548389d'; // Замените на ваш ключ API

// Настройка Express для обслуживания статических файлов из папки 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint для получения матчей по лигам
app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/matches?status=SCHEDULED', {
      headers: {
        'X-Auth-Token': API_KEY
      }
    });

    // Группируем данные по лигам
    const groupedMatches = {};
    response.data.matches.forEach(match => {
      const competition = match.competition.name;
      if (!groupedMatches[competition]) {
        groupedMatches[competition] = [];
      }
      groupedMatches[competition].push({
        homeTeam: {
          name: match.homeTeam.name,
          crest: match.homeTeam.crest
        },
        awayTeam: {
          name: match.awayTeam.name,
          crest: match.awayTeam.crest
        },
        utcDate: match.utcDate,
      });
    });

    res.json(groupedMatches); // Отправляем данные на фронтенд
  } catch (error) {
    console.error('Ошибка при получении матчей:', error);
    res.status(500).send('Ошибка при загрузке данных');
  }
});

// Обработчик для корневого маршрута
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
