import { Bot } from 'grammy';
import { TELEGRAM_API_TOKEN } from './config';

const bot = new Bot(TELEGRAM_API_TOKEN);

bot.command('start', async __context__ => {
    __context__.replyWithChatAction('typing');
    __context__.reply('Hello, world!');
});

await bot.start();
