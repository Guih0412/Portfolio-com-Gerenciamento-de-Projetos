CREATE DATABASE projetos;

USE projetos;

CREATE TABLE projetos (

id INT AUTO_INCREMENT PRIMARY KEY,

nome VARCHAR(100),

descricao TEXT,

imagem VARCHAR(256),

link VARCHAR(256),

tecnologias TEXT

);

ALTER TABLE projetos
ADD COLUMN link VARCHAR(256);

ALTER TABLE projetos
ADD COLUMN imagem VARCHAR(256);

ALTER TABLE projetos
ADD COLUMN tecnologias TEXT;