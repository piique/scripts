const app = require('./app');

app.sairAlmoco();

// data e hora atual
const date = new Date();

console.log(`Horário de inicio: ${ date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute:'2-digit' }) }`);
console.log('Começou almoço');

// adiciona 1 hora
date.setHours(date.getHours() + 1);

console.log(`Horário de retorno: ${ date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute:'2-digit' }) }`);

// contador de 1 hora para almoço
setTimeout(() => {
  app.entrar();
}, 1000 * 60 * 60); // 1 hora
