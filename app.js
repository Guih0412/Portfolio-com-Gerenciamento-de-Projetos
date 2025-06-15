// =================== IMPORTAÇÕES ===================
const express = require('express');
const path = require('path');
const browserSync = require('browser-sync');
const methodOverride = require('method-override');
const db = require('./db');

const app = express();

// =================== CONFIGURAÇÕES ===================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// =================== ROTAS FRONTEND ===================

// Página inicial
app.get('/', (req, res) => {
  res.render('index');
});

// Página de gerenciamento (listar projetos)
app.get('/gerenciamentoProjetos', (req, res) => {
  const sql = 'SELECT * FROM projetos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('gerenciamentoProjetos', { projetos: results || [] });
  });
});

// Página pública de projetos
app.get('/projetos', (req, res) => {
  const sql = 'SELECT * FROM projetos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('projetos', { projetos: results || [] });
  });
});

// Criar projeto (formulário)
app.post('/gerenciamentoProjetos', (req, res) => {
  const { nome, descricao, tecnologias, link, imagem } = req.body;
  if (!nome || !descricao || !tecnologias || !link ||!imagem) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }
  const sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link, imagem) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [nome, descricao, tecnologias, link, imagem], (err) => {
    if (err) return res.status(500).send('Erro ao inserir projeto');
    res.redirect('/gerenciamentoProjetos');
  });
});

// Editar projeto (formulário)
app.post('/gerenciamentoProjetos/:id/update', (req, res) => {
  const { nome, descricao, tecnologias, link, imagem } = req.body;
  const { id } = req.params;
  if (!nome || !descricao || !tecnologias || !link|| !imagem) {
    return res.status(400).send('Todos os campos são obrigatórios');
  }
  const sql = 'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link = ?, imagem = ? WHERE id = ?';
  db.query(sql, [nome, descricao, tecnologias, link, imagem, id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Projeto não encontrado');
    res.redirect('/gerenciamentoProjetos');
  });
});

// Excluir projeto (formulário)
app.post('/gerenciamentoProjetos/:id/delete', (req, res) => {
  db.query('DELETE FROM projetos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.redirect('/gerenciamentoProjetos');
  });
});

// Obter projeto específico (para modal ou edição)
app.get('/gerenciamentoProjetos/:id', (req, res) => {
  db.query('SELECT * FROM projetos WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send('Projeto não encontrado');
    res.send(result[0]);
  });
});

// =================== ROTAS API ===================

// Criar projeto (API)
app.post('/api/gerenciamentoProjetos', (req, res) => {
  const { nome, descricao, tecnologias, link, imagem } = req.body;
  if (!nome || !descricao || !tecnologias || !link|| !imagem) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }
  const sql = 'INSERT INTO projetos (nome, descricao, tecnologias, link) VALUES (?, ?, ?, ?)';
  db.query(sql, [nome, descricao, tecnologias, link, imagem], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao inserir projeto' });
    res.status(201).json({ mensagem: 'Projeto criado com sucesso', id: result.insertId });
  });
});

// Listar projetos (API)
app.get('/api/gerenciamentoProjetos', (req, res) => {
  db.query('SELECT * FROM projetos', (err, results) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar projetos' });
    res.json(results || []);
  });
});

// Obter projeto por ID (API)
app.get('/api/gerenciamentoProjetos/:id', (req, res) => {
  db.query('SELECT * FROM projetos WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao buscar projeto' });
    if (result.length === 0) return res.status(404).json({ mensagem: 'Projeto não encontrado' });
    res.json(result[0]);
  });
});

// Atualizar projeto (API)
app.put('/api/gerenciamentoProjetos/:id/update', (req, res) => {
  const { nome, descricao, tecnologias, link, imagem } = req.body;
  const { id } = req.params;
  if (!nome || !descricao || !tecnologias || !link || !imagem) {
    return res.status(400).json({ erro: 'Todos os campos são obrigatórios' });
  }
  const sql = 'UPDATE projetos SET nome = ?, descricao = ?, tecnologias = ?, link = ? WHERE id = ?';
  db.query(sql, [nome, descricao, tecnologias, link, imagem, id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao atualizar projeto' });
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Projeto não encontrado' });
    res.json({ mensagem: 'Projeto atualizado com sucesso' });
  });
});

// Deletar projeto (API)
app.delete('/api/gerenciamentoProjetos/:id/delete', (req, res) => {
  db.query('DELETE FROM projetos WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao excluir projeto' });
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Projeto não encontrado' });
    res.json({ mensagem: 'Projeto excluído com sucesso' });
  });
});

// =================== INICIAR SERVIDOR ===================
const server = app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');

  browserSync.init({
    proxy: 'http://localhost:3000',
    files: ['views/**/*.ejs', 'public/**/*.*'],
    port: 3001,
    open: false,
    notify: false
  });
});
