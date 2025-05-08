const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Для обработки статических файлов
app.use(express.static(path.join(__dirname, 'frontend')));

// Простой API для получения матчей
app.get('/api/matches', (req, res) => {
  const matches = [
    { time: '20:00', teams: 'Real Madrid vs Barcelona', link: 'https://stream1.com', odds: '1.9 - 3.2 - 4.1' },
    { time: '22:00', teams: 'Manchester City vs PSG', link: 'https://stream2.com', odds: '2.1 - 3.0 - 3.5' }
  ];
  res.json(matches);
});

// По умолчанию отправляем index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
