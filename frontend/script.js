window.addEventListener('DOMContentLoaded', async () => {
    const container = document.getElementById('matches');
    const res = await fetch('/api/matches');
    const data = await res.json();
  
    container.innerHTML = '';
    data.forEach(match => {
      const div = document.createElement('div');
      div.className = 'match';
      div.innerHTML = `
        <div class="teams">${match.teams}</div>
        <div>🕒 ${match.time}</div>
        <div>📺 <a href="${match.link}" target="_blank">Watch</a></div>
        <div>📊 Odds: ${match.odds}</div>
      `;
      container.appendChild(div);
    });
  
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();
  });
  