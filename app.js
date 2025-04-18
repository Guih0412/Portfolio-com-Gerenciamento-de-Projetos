// importando o express
const express = require('express'); 

//iniciando o express e passando para a variável app
const app= express(); 

//Diretório dos arquivos estáticos	
app.use(express.static('public')); 

//definindo o motor de visualização como ejs
app.set('view engine', 'ejs'); 

//criando uma rota para o servidor e renderizando o arquivo index.ejs
app.get('/', function(req, resposta){ 
    resposta.render("index.ejs")
})

//iniciando o servidor na porta 3000
app.listen(3000, function(){ 
    console.log("Servidor rodando na porta 3000") 
})