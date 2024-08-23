import express from "express";
import cors from 'cors';

const newId = (db) => {
  let maxId;
  for (let data of db) {
    if (maxId == undefined || data.id > maxId) {
      maxId = data.id
    }
  }

  return maxId + 1
}

let db = [
  {
    id: 1,
    titulo: "Ultra Aprendizado",
    autor: "Scott H. Young",
    ano: 2019,
    editora: "Moderno",
  },
  {
    id: 2,
    titulo: "Harry Potter - A pedra filosofal",
    autor: "J. K. Rowlling",
    ano: 1999,
    editora: "Moderno",
  },
];

const app = express();
app.use(express.json());
app.use(cors());

// Rota para Listar os Livros
app.get("/livros", (req, res) => {
  res.json(db);
});

// Rota para Cadastrar os Livros
app.post("/livros", (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      message: "O body é obrigatório.",
    });
  }

  if (!body.titulo) {
    return res.status(400).json({
      message: "O campo titulo é obrigatório.",
    });
  }

  if (!body.autor) {
    return res.status(400).json({
      message: "O campo autor é obrigatório.",
    });
  }

  if (!body.ano) {
    return res.status(400).json({
      message: "O campo ano é obrigatório.",
    });
  }

  const ano = parseInt(body.ano);

  if (isNaN(ano)) {
    return res.status(400).json({
      message: "O campo ano deve ser um valor inteiro.",
    });
  }

  const novoLivro = {
    id: newId(db),
    titulo: body.titulo,
    autor: body.autor,
    ano: body.ano,
    editora: body.editora,
  };

  db.push(novoLivro);
  res.status(201).json({
    message: "Livro cadastrado com sucesso.",
  });
});

// Rota para editar os livros
app.put("/livros", (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      message: "O body é obrigatório.",
    });
  }

  if (!body.id) {
    return res.status(400).json({
      message: "O campo id é obrigatório.",
    });
  }

  if (!body.titulo) {
    return res.status(400).json({
      message: "O campo titulo é obrigatório.",
    });
  }

  if (!body.autor) {
    return res.status(400).json({
      message: "O campo autor é obrigatório.",
    });
  }

  if (!body.ano) {
    return res.status(400).json({
      message: "O campo ano é obrigatório.",
    });
  }

  const ano = parseInt(body.ano);

  if (isNaN(ano)) {
    return res.status(400).json({
      message: "O campo ano deve ser um valor inteiro.",
    });
  }

  let livroInDb = db.find((livro) => livro.id == body.id);

  if (!livroInDb) {
    return res.status(400).json({
      message: "Livro não encontrado",
    });
  }

  const livroIndex = db.findIndex((livro) => livro.id == body.id) 

  db[livroIndex] = {
    id: body.id,
    titulo: body.titulo,
    autor: body.autor,
    ano: body.ano,
    editora: body.editora
  }

  res.status(201).json({
    message: "Livro editado com sucesso.",
  });
});

// Rota para excluir um livro
app.delete("/livros/:id", (req, res) => {
  const id = parseInt(req.params.id)

  if (!id || isNaN(id)) {
    return res.status(400).json({
      message: "Identificador inválido",
    });
  }

  let livroInDb = db.find((livro) => livro.id == id);

  if (!livroInDb) {
    return res.status(400).json({
      message: "Livro não encontrado",
    });
  }

  db = db.filter((livro) => livro.id != livroInDb.id)
  res.status(202).json({
    message: "Livro excluido com sucesso.",
  });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000."));
