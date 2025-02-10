require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;
    
    const options = {
        reply_markup: {
            inline_keyboard: [[{ text: "Sim, quero saber mais!", callback_data: "more_info" }]]
        }
    };
    
    bot.sendMessage(chatId, `Olá ${firstName}! Você está tentando emagrecer, mas nada parece funcionar? \n\nEu posso te mostrar um método simples que já ajudou várias mulheres a perder peso sem precisar de academia ou dietas malucas! Quer saber mais?`, options);
});

bot.on('callback_query', (callbackQuery) => {
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;

    if (callbackQuery.data === 'more_info') {
        bot.sendMessage(chatId, "Ótimo! Você sabia que uma mãe sedentária conseguiu perder 3,4kg em apenas 7 dias usando um método simples? \n\nE ela não precisou fazer academia nem passar fome! Quer ver alguns depoimentos de quem já testou?", {
            reply_markup: {
                inline_keyboard: [[{ text: "Sim, me mostra!", callback_data: "testimonials" }]]
            }
        });
    } else if (callbackQuery.data === 'testimonials') {
        bot.sendMessage(chatId, "Veja o que algumas mulheres que seguiram o método disseram: \n\n📌 *Ana Paula*: \"Sofria bullying, tinha dificuldade em encontrar roupas… Hoje, finalmente, sou livre!\"\n\n📌 *Helena Souza*: \"Depois da gravidez, nada funcionava… até encontrar este programa. Em 2 meses, eliminei 14kg!\"\n\n📌 *Gabriela Oliveira*: \"Em 12 dias, perdi 5,7kg! Passei do manequim 50 para 42 e voltei a me sentir bonita.\"\n\nParece interessante, não é? Quer saber como funciona esse método? 🤩", {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [[{ text: "Sim, quero conhecer!", callback_data: "program_details" }]]
            }
        });
    } else if (callbackQuery.data === 'program_details') {
        bot.sendMessage(chatId, "O método é baseado em alimentos simples que você já tem em casa! 🍏🥦\n\nVocê terá acesso a:\n✅ *Sucos Detox* para eliminar toxinas\n✅ *Receitas Fit* para o dia a dia\n✅ *O Chá Secreto* que seca tudo\n✅ *Shakes Emagrecedores* para substituir refeições\n✅ *Saladas especiais* para cada tipo de necessidade\n\nE o melhor? Você não precisa passar fome nem sofrer! 😍\n\nGostaria de garantir o seu acesso agora mesmo com desconto?", {
            parse_mode: "Markdown",
            reply_markup: {
                inline_keyboard: [[{ text: "Sim, quero aproveitar!", url: "https://pay.kiwify.com.br/GFeetjM?afid=EMQYXWLV" }]]
            }
        });
    }
});

console.log("Bot do Telegram está rodando...");
