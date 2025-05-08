const express = require('express');
const path = require('path');
const axios = require('axios'); // Для работы с API
const app = express();
const PORT = 10000;

// Использование статики для фронтенда
app.use(express.static(path.join(__dirname, '../frontend')));  // Убедитесь, что путь правильный

app.get('/api/matches', async (req, res) => {
  try {
    const response = await axios.get('https://api.football-data.org/v4/matches', {
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_API_KEY
      }
    });
    
    // Обработка полученных данных
    const matches = response.data.matches.map(match => ({
      time: match.utcDate, // Преобразуем время, если нужно
      teams: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
      link: 'https://example.com', // Ссылка на трансляцию, если есть
      odds: '1.9 - 3.2 - 4.1' // Здесь можно интегрировать коэффициенты, если они доступны
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
