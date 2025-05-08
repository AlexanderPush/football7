const TelegramBot = require('node-telegram-bot-api');

const token = '7727011178:AAHd5zL3dV3AzFRMZiqphJPbJTKocdrls5k'; // Замени на свой токен
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  bot.sendMessage(chatId, '⚽ Открыть расписание матчей:', {
    reply_markup: {
      keyboard: [[{
        text: 'Открыть матчи',
        web_app: { url: 'https://football7.onrender.com' } // твой URL Render
      }]],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  });
});
