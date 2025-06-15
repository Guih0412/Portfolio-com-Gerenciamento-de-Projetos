# 📁 Portfólio Acadêmico

Este repositório contém meu portfólio acadêmico, com informações sobre minha formação, projetos, habilidades, certificações e contatos. Agora, o sistema conta também com funcionalidades **CRUD** completas tanto via interface gráfica quanto via **API REST**, ideal para testes com ferramentas como o **Postman**.

---

## ☑︎ Estrutura

1. **Introdução** – Apresentação pessoal e objetivos.  
2. **Currículo** – Formação, certificações e competências.  
3. **Projetos** – Descrição e gerenciamento (CRUD) dos principais projetos desenvolvidos.  
4. **Contato** – Links para LinkedIn, GitHub e email.

---

## 🛠️ Funcionalidades CRUD (Interface Gráfica)

O portfólio possui um sistema completo de **CRUD (Create, Read, Update, Delete)** para gerenciar os projetos por meio da interface com EJS:

### ➕ Criar (Create)
- Formulário para adicionar novos projetos com informações como nome, descrição, link, tecnologias utilizadas e imagem.

### 📄 Ler (Read)
- Listagem automática e dinâmica de todos os projetos cadastrados, com exibição completa dos dados, incluindo imagem.

### ✏️ Atualizar (Update)
- Modais com formulários pré-preenchidos para editar informações de cada projeto, incluindo a imagem.
- Atualização feita de forma dinâmica e eficiente usando **EJS** para modularização das views.

### ❌ Deletar (Delete)
- Botão de exclusão com modal de confirmação para evitar remoção acidental.
- Exclusão imediata do projeto com atualização da listagem.

---

## 🔁 API REST (Testes via Postman)

Além da interface gráfica, o sistema disponibiliza rotas de **API** para integração externa e testes via **Postman** ou qualquer cliente HTTP.

### 📌 Rotas disponíveis

| Método   | Rota                                           | Descrição                    |
|----------|------------------------------------------------|------------------------------|
| `GET`    | `/api/gerenciamentoProjetos`                   | Listar todos os projetos     |
| `GET`    | `/api/gerenciamentoProjetos/:id`               | Obter um projeto por ID      |
| `POST`   | `/api/gerenciamentoProjetos`                   | Criar um novo projeto        |
| `PUT`    | `/api/gerenciamentoProjetos/:id/update`        | Atualizar projeto existente  |
| `DELETE` | `/api/gerenciamentoProjetos/:id/delete`        | Remover projeto por ID       |

### 🧪 Estrutura de corpo JSON para POST/PUT

```json
{
  "nome": "Nome do Projeto",
  "descricao": "Descrição breve do projeto",
  "tecnologias": "Tecnologias usadas no projeto",
  "link": "https://github.com/usuario/repositorio",
  "exemplo (url de repositório)": "https://github.com/Titus-System/InsightFlow",
  "imagem": "https://raw.githubusercontent.com/USUARIO/REPOSITORIO/BRANCH/caminho/para/imagem.png", 
  "exemplo (url de imagem)": "https://raw.githubusercontent.com/Titus-System/InsightFlow/main/docs/logo_if_semfundo.png"
}
```

### 🧪 Exemplo de corpo JSON para POST/PUT

```json
{
  "nome": "Insight Flow",
  "descricao": "Desenvolvimento de uma plataforma com dados de comércio exterior no Brasil, com busca avançada, análises interativas e previsões de tendências para apoio logístico e estratégico.",
  "tecnologias": "React, Python, TypeScript, JavaScript, Postgres, HTML",
  "link": "https://github.com/Titus-System/InsightFlow",
  "imagem": "https://raw.githubusercontent.com/Titus-System/InsightFlow/main/docs/logo_if_semfundo.png"
}
