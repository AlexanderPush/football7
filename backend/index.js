const express = require('express');
const path = require('path');
const axios = require('axios'); // Для работы с API
const app = express();
const PORT = 10000;

// Использование статики для фронтенда
app.use(express.static(path.join(__dirname, '../frontend')));  // Убедитесь, что путь правильный

// Обработчик главной страницы
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));  // Путь до index.html
});

// Простой API для получения матчей с реального API
app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': '4a0bce32b9584e8992e7a5c82548389d', // Ваш ключ API
        'Accept-Language': 'ru'  // Указываем, что хотим получать данные на русском
      }
    });
    
    // Обработка полученных данных
    const matches = response.data.matches.map(match => ({
      utcDate: match.utcDate,
      homeTeam: {
        name: match.homeTeam.name,
        crest: match.homeTeam.crest || ''
      },
      awayTeam: {
        name: match.awayTeam.name,
        crest: match.awayTeam.crest || ''
      },
      competition: match.competition.name
    }));

    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ message: 'Error fetching matches from API' });
  }
});

// По умолчанию отправляем index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
