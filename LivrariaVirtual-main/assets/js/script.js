import { LinhaLivro, CreateButton } from "./component.js";

// API
const API = "https://livrariavirtual.onrender.com";

// Criando o array onde armazenare-mos os livros
let livrosData = [];

// Criando uma função para listar os livros no HTML
function listarLivros(livros) {
  // Buscando tag "tbody" do HTML para colocar os dados
  const tableLivro = document.getElementById("data-livro");

  // Limpando o que já tem para mostrar somente o que foi passado como parametro
  tableLivro.innerText = "";

  // Percorrendo os livros com a função "map"
  // Para cada livro, faça: ...
  livros.map((livro) => {
    // Criando a linha do livro na tabela.
    let tr = LinhaLivro(livro);

    // Adicionando linha na tabela que mostra no HTML
    tableLivro.appendChild(tr);
  });
}

// Função que irá lidar com evento de "submit" do formulário
// para cadastrar o livro
async function cadastrarLivro(livro) {
  try {
    let response = await fetch(`${API}/livros`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    });
    let data = await response.json();
    return data.message;
  } catch (error) {
    return error;
  }
}

async function editarLivro(livro) {
  try {
    let response = await fetch(`${API}/livros`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(livro),
    });
    let data = await response.json();
    return data.message;
  } catch (error) {
    return error;
  }
}

export async function excluirLivro(livroId) {
  try {
    let response = await fetch(`${API}/livros/${livroId}`, {
      method: "DELETE",
    });
    let data = await response.json();
    return data.message;
  } catch (error) {
    return error;
  }
}

// Funções de Handle
// Função que irá lidar com o evento de "load"
// o load é chamado quando o elemento carrega
// Estou exportando para acessar no arquivo component.js
export function handleCarregarLivros() {
  fetch(`${API}/livros`)
    .then((response) => response.json())
    .then((data) => {
      livrosData = data;
      listarLivros(livrosData);
    });
}

export async function handleCadastrarLivro(event) {
  event.preventDefault();

  const form = event.target;

  const novoLivro = {
    titulo: form.titulo.value,
    autor: form.autor.value,
    ano: Number(form.ano.value),
    editora: form.editora.value,
  };

  let message = await cadastrarLivro(novoLivro);
  alert(message);

  handleCarregarLivros();

  form.reset();
}

export async function handleEditarLivro(event) {
  event.preventDefault();

  const form = event.target;

  const livroEditado = {
    id: Number(form.livroId.value),
    titulo: form.titulo.value,
    autor: form.autor.value,
    ano: Number(form.ano.value),
    editora: form.editora.value,
  };

  let message = await editarLivro(livroEditado);
  alert(message);

  handleCarregarLivros();

  // Retornando o Formulário para o Estado Original.
  form.reset();

  const buttonsContainer = document.getElementById("buttons-container");
  buttonsContainer.innerHTML = CreateButton();

  form.removeEventListener("submit", handleEditarLivro);
  form.addEventListener("submit", handleCadastrarLivro);
}

// Vinculando a função ao formulário
// Buscando formulário do HTML
const formCadastroLivro = document.getElementById("form-livro");

// Vinculando a função com o evento de submit do formulário de cadastro de livro
formCadastroLivro.addEventListener("submit", handleCadastrarLivro);

// Vinculando a função com o evento de load da janela
window.addEventListener("load", handleCarregarLivros);
