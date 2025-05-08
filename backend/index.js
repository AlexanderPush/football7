const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 10000;

// Здесь используется API ключ от sstats.net, если он необходим
const API_KEY = 'elumrolgdt9hfc3b';  // Замените на ваш ключ API

app.use(express.static(path.join(__dirname, '../frontend')));  // Убедитесь, что путь правильный

// Endpoint для получения матчей по лигам с sstats.net
app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://sstats.net/api/matches', {
      headers: {
        'Authorization': `Bearer ${API_KEY}`  // Пример для авторизации, если требуется
      }
    });

    // Группируем данные по лигам
    const groupedMatches = {};
    response.data.matches.forEach(match => {
      const competition = match.competition;
      if (!groupedMatches[competition]) {
        groupedMatches[competition] = [];
      }
      groupedMatches[competition].push({
        homeTeam: {
          name: match.home_team,
          crest: match.home_team_crest
        },
        awayTeam: {
          name: match.away_team,
          crest: match.away_team_crest
        },
        utcDate: match.utc_date,
      });
    });

    res.json(groupedMatches); // Отправляем данные на фронтенд
  } catch (error) {
    console.error('Ошибка при получении матчей:', error);
    res.status(500).send('Ошибка при загрузке данных');
  }
});

// Обработчик главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));  // Путь до index.html
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
