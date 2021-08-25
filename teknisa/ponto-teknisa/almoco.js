const events = require('./events');

// events.teste();

events.sairAlmoco();

setTimeout(() => {
  events.entrar();
}, 1000 * 60 * 60); // 1 hour

console.log('Acabou execução do script, verificar se deu tudo certo.');
