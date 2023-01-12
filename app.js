const { ask, generateImg } = require("./ai.js");
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.initialize();

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on('authenticated', () => {
  console.log('TERHUBUNG');
});

client.on('ready', () => {
  console.log('Ready de!');
});

// let chat = await message.getChat();

client.on('message', async (message) => {
  
  if (message.body.substring(0, 5) == "!chat") {
    const prompt = message.body.substring(6); 
    setTimeout(async () => {
      message.reply(await ask(prompt));
    }, 10000);
    
  }else if (message.body.substring(0, 6) == "!image") {
    const prompt = message.body.substring(7); 
    setTimeout(async() => {
    const answer = await generateImg(prompt);
    //get media from url
    const media = await MessageMedia.fromUrl(
      answer
      );

    //replying with media
    
    client.sendMessage(message.from, media, {
      caption: prompt,
    });
  }, 10000);
  }
});
