const optBuscaNome = document.querySelector('#opt-busca-nome');
const optBuscaTodos = document.querySelector('#opt-busca-todos');
const filtersNome = document.querySelector('#pn-filter-nome');

const inputMatricula = document.querySelector('#matricula');
const btnBuscarMatricula = document.querySelector('#btnBuscarMatricula');
const labelMatricula = document.querySelector('#matricula-aluno');
const labelAluno = document.querySelector('#nome-aluno');

const btnBuscarPorNomeOuTodos = document.querySelector('#btnBuscar');
const divDados = document.querySelector('#dados');

optBuscaNome.addEventListener('change', e => {
    if (e.target.checked) {
        filtersNome.style.display = 'block';
    }
});

optBuscaTodos.addEventListener('change', e => {
    if (e.target.checked) {
        filtersNome.style.display = 'none';
    }
});

function buscarMatricula() {
    const matricula = inputMatricula.value;

    const url = 'http://localhost:3000';

    fetch(`${url}/aluno/${matricula}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Matrícula não encontrada');
        })
        .then(jsonData => {
            labelMatricula.innerHTML = jsonData.matricula;
            labelAluno.innerHTML = jsonData.nome;
        })
        .catch(erro => alert(erro.message));
}

function buscarNomeOuTodos() {
    divDados.innerHTML = '';
    let url = 'http://localhost:3000/aluno/todos';

    if (optBuscaNome.checked) {
        let nome = document.querySelector('#nome').value;

        url = `http://localhost:3000/aluno/search?nome=${nome}`;
    }

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(jsonData => {
            if (jsonData.length == 0) {
                divDados.innerHTML = 'Nenhuma informação encontrada.';
                return;
            }
            jsonData.forEach(aluno => {
                divDados.innerHTML += `<p>${aluno.matricula} - ${aluno.nome}</p>`;
            });
        });
}

btnBuscarMatricula.addEventListener('click', buscarMatricula);
btnBuscarPorNomeOuTodos.addEventListener('click', buscarNomeOuTodos);
