// ECMASCRIPT2020 - IMPORT e EXPORT
import {
  excluirLivro,
  handleCarregarLivros,
  handleCadastrarLivro,
  handleEditarLivro,
} from "./script.js";

export function LinhaLivro(livro) {
  // Criando Linha da Tabela
  const tr = document.createElement("tr");

  // Criando celula do titulo
  const tdTitulo = document.createElement("td");
  tdTitulo.textContent = livro.titulo;

  // Criando celula do autor
  const tdAutor = document.createElement("td");
  tdAutor.textContent = livro.autor;

  // Criando celula do ano
  const tdAno = document.createElement("td");
  tdAno.textContent = livro.ano;

  // Criando celula da editora
  const tdEditora = document.createElement("td");
  tdEditora.textContent = livro.editora;

  // Criando celula de ações
  const tdAcoes = document.createElement("td");

  const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.className = "btn-excluir";

  botaoExcluir.addEventListener("click", async () => {
    const confirm = window.confirm(`Deseja excluir o livro ${livro.titulo}?`);
    if (confirm) {
      let message = await excluirLivro(livro.id);
      alert(message);
      handleCarregarLivros();
    }
  });

  const botaoEditar = document.createElement("button");
  botaoEditar.textContent = "Editar";
  botaoEditar.className = "btn-editar";

  botaoEditar.addEventListener("click", () => {
    const buttonsContainer = document.getElementById("buttons-container");
    buttonsContainer.innerHTML = EditButtons();

    const formEditarLivro = document.getElementById("form-livro");

    const cancelButton = document.getElementById("cancel-button");
    cancelButton.addEventListener("click", () => {
      buttonsContainer.innerHTML = CreateButton();

      formEditarLivro.reset();
      formEditarLivro.removeEventListener("submit", handleEditarLivro);
      formEditarLivro.addEventListener("submit", handleCadastrarLivro);
    });

    formEditarLivro.livroId.value = livro.id;
    formEditarLivro.titulo.value = livro.titulo;
    formEditarLivro.autor.value = livro.autor;
    formEditarLivro.ano.value = livro.ano;
    formEditarLivro.editora.value = livro.editora;

    formEditarLivro.removeEventListener("submit", handleCadastrarLivro);
    formEditarLivro.addEventListener("submit", handleEditarLivro);
  });

  tdAcoes.appendChild(botaoEditar);
  tdAcoes.appendChild(botaoExcluir);

  // Adicionando celulas na linha
  tr.appendChild(tdTitulo);
  tr.appendChild(tdAutor);
  tr.appendChild(tdAno);
  tr.appendChild(tdEditora);
  tr.appendChild(tdAcoes);

  return tr;
}

export function EditButtons() {
  return `
    <button type="button" id="cancel-button">Cancelar</button>
    <button type="submit">Salvar</button>
    `;
}

export function CreateButton() {
  return `
    <button type="submit">Cadastrar</button>
    `;
}
