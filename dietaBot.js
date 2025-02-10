const TelegramBot = require('node-telegram-bot-api');

// Substitua 'SEU_TOKEN' pelo seu token de bot
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

let userState = {};

bot.onText(/.*/, async (msg) => {
    const chatId = msg.chat.id;
    const userName = msg.text;
        
    // Inicializando o estado para o novo usuário
    if (!userState[chatId]) {
        await bot.sendMessage(chatId, `Olá, tudo bem? Eu me chamo Julia! Fico feliz em ver você aqui. Qual o seu nome?`);
        userState[chatId] = { stage: 1, userName: userName };
        return;
    }

    // Fluxo de mensagens baseado no estágio atual do usuário
    const state = userState[chatId];

    if (state.stage === 1) {
        state.stage = 2;
        await bot.sendMessage(chatId, `Muito prazer, ${userName}! Me diga, hoje você está satisfeita com o seu peso atual na balança? Ou teria algum excesso te incomodando?`);
    } else if (state.stage === 2) {
        state.stage = 3;
        await bot.sendMessage(chatId, `Entendi! E na sua opinião, o que mais te impede de chegar no seu objetivo? Frituras, Doces, Má alimentação, Rotina corrida, Ansiedade, Dieta cara, Dieta restritiva...? Alguma dessas opções se encaixa?`);
    } else if (state.stage === 3) {
        state.stage = 4;
        await bot.sendMessage(chatId, `Nossa, eu super entendo você! Mas não se preocupe, que jajá você se verá livre dessas gordurinhas.`);
        await bot.sendMessage(chatId, `Eu vou te ajudar a eliminar de 5 a 7 quilos em apenas 30 dias, e vamos superar qualquer dificuldade juntas, okay?`);
        await bot.sendMessage(chatId, `Você vai emagrecer sem passar fome, sem gastar rios de dinheiro, sem se matar na academia, e sem abrir mão do que gosta de comer!`);
        await bot.sendMessage(chatId, `Olha alguns dos resultados das meninas que seguiram o mesmo material que vou mandar para você 🥰 👇`);
        await bot.sendMessage(chatId, 'Aqui você pode inserir imagens de resultados');
        await bot.sendMessage(chatId, `O que achou dos resultados delas?`);
    } else if (state.stage === 4) {
        state.stage = 5;
        await bot.sendMessage(chatId, `Se eu te ajudar assim como elas, você vai se comprometer?`);
    } else if (state.stage === 5) {
        state.stage = 6;
        await bot.sendMessage(chatId, `Maravilha! Eu sou especialista em ajudar pessoas a emagrecer! 😍`);
        await bot.sendMessage(chatId, `Criamos um programa chamado Secando em Casa em 30 dias, baseado na dieta flexível para que você consiga eliminar gordura de forma prática e eficiente!`);
        await bot.sendMessage(chatId, `A promoção é única! De R$297,99, está saindo por apenas R$37,99! Como deseja pagar? Cartão, PIX ou Boleto?`);
    } else if (state.stage === 6) {
        // Verifica a forma de pagamento
        if (msg.text.toLowerCase().includes('boleto')) {
            await bot.sendMessage(chatId, `Maravilha! Basta me mandar a foto do comprovante que eu já libero seu material na hora!`);
        } else {
            await bot.sendMessage(chatId, `Prontinho, clique no link abaixo para finalizar sua compra:
            https://pay.kiwify.com.br/GFeetjM?afid=EMQYXWLV`);
        }
        state.stage = 7; // Finaliza o processo ou reinicia o fluxo
    }
});

console.log('Bot iniciado!');
