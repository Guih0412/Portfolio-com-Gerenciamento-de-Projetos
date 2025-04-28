const express = require('express');
const path = require('path');
const browserSync = require('browser-sync');

// Iniciando o express e passando para a variável app
const app = express();

// Diretório dos arquivos estáticos
app.use(express.static('public'));

// Configuração do motor de visualização EJS
app.set('views', path.join(__dirname, 'views')); // Definindo a pasta onde ficam os arquivos EJS
app.set('view engine', 'ejs'); // Usando EJS como motor de visualização

// Rota para a página inicial
app.get('/', function (req, res) {
  const home= "Sejam bem vindos ao meu portifólio"
  res.render("index", {home:home}); // Renderiza o arquivo index.ejs
});

// Rota para a página de projetos
app.get('/projetos', (req, res) => {
  const projeto= "Acesse os meus portifólios"
  res.render('projetos', {projeto: projeto}); // Renderiza o arquivo projetos.ejs
});

// Iniciando o servidor na porta 3000
const server = app.listen(3000, function () {
  console.log('Servidor Express rodando na porta 3000');

  // Iniciando o BrowserSync
  browserSync.init({
    proxy: 'http://localhost:3000', // Aponta para o servidor Express que está na porta 3000
    files: ['views/**/*.ejs', 'public/**/*.*'], // Observa alterações nos arquivos
    port: 3001, // BrowserSync vai rodar na porta 3001, mas o servidor Express fica na porta 3000
    open: true, // Não abre automaticamente o navegador
    notify: false // Não exibe notificações no navegador
  });
});
