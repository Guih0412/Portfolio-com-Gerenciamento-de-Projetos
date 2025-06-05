const express = require('express');
const path = require('path');
const browserSync = require('browser-sync');
const methodOverride = require('method-override');
const db = require('./db');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rota para a página home
app.get('/', (req, res) => {
  res.render('index');
});

// Criar projeto
app.post('/gerenciamentoProjetos', (req, res) => {
  const { nome, descricao, tecnologias, link, imagem } = req.body;

  if (!nome || !descricao || !tecnologias || !link || !imagem) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }

  const sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link, imagem) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nome, descricao, tecnologias, link, imagem], (err) => {
    if (err) {
      console.error('Erro ao inserir projeto:', err);
      return res.status(500).send('Erro ao inserir projeto');
    }
    res.redirect('/gerenciamentoProjetos');
  });
});


// Listar projetos na página de projetos
app.get('/gerenciamentoProjetos', (req, res) => {
  const sql = 'SELECT * FROM projetos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('gerenciamentoProjetos', { projetos: results || [] });
  });
});

// Listar projetos na página de projetos
app.get('/projetos', (req, res) => {
  const sql = 'SELECT * FROM projetos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('projetos', { projetos: results || [] });
  });
});




// Atualizar projetos
app.post('/gerenciamentoProjetos/:id/update', (req, res) => {
  const { nome, descricao, tecnologias, link, imagem } = req.body;
  const { id } = req.params;

  if (!nome || !descricao || !tecnologias || !link || !imagem) {
    return res.status(400).send({ erro: 'Todos os campos são obrigatórios.' });
  }

  const sql = 'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link = ?, imagem = ? WHERE id = ?';
  
  db.query(sql, [nome, descricao, tecnologias, link, imagem, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar projeto:', err);
      return res.status(500).send(err);
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({ erro: 'Projeto não encontrado' });
    }

    res.redirect('/gerenciamentoProjetos');
  });
});

// Excluir Projetos
app.post('/gerenciamentoProjetos/:id/delete', (req, res) => {
  db.query('DELETE FROM projetos WHERE id = ?', [req.params.id], err => {
    if (err) return res.status(500).send(err);
    res.redirect('/gerenciamentoProjetos');
  });
});


// Inicia o servidor
const server = app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');

  // BrowserSync para recarregar a página automaticamente ao salvar
  browserSync.init({
    proxy: 'http://localhost:3000',
    files: ['views/**/*.ejs', 'public/**/*.*'],
    port: 3001,
    open: true,
    notify: false
  });
});
