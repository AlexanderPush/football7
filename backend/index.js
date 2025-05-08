const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('frontend'));

app.get('/api/matches', (req, res) => {
  const matches = [
    { time: '20:00', teams: 'Real Madrid vs Barcelona', link: 'https://stream1.com', odds: '1.9 - 3.2 - 4.1' },
    { time: '22:00', teams: 'Manchester City vs PSG', link: 'https://stream2.com', odds: '2.1 - 3.0 - 3.5' }
  ];
  res.json(matches);
});

app.listen(PORT, () => console.log(`Mini App backend running on http://localhost:${PORT}`));
