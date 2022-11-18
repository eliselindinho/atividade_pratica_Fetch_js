/*
A Mach1 está desenvolvendo o seu sistema de cadastro de alunos. Essa API já foi desenvolvido e está funcionando, porém é necessário fazer a parte do front deste sistema. Siga os passos para execução da tarefa.

OBS: Existem duas telas nesse exercício - Cadastro e Index(Consulta) ambos estão no repositório abaixo.

Repositório: https://github.com/bemach1/js-avancado/tree/main/Aulas/10%20-%20fetch/exercicio

Regras
a. Ao preencher os dados do Aluno envie os dados via POST para a rota “/aluno”.
    i. Caso o retorno seja sucesso exibir a mensagem “Aluno cadastrado com sucesso”
    ii. Caso o retorno seja erro exibir a mensagem “Matrícula já cadastrada.”.
b. Na tela de Busca possuirá dois tipos de busca, o primeiro é a busca por matrícula, que usará a matrícula preenchida e ao clicar no botão “buscar por matricula”, o sistema deve executar a busca via GET, para a rota “/aluno/${matricula-digitada}".
    i. Caso a API retorne Erro exibir mensagem “Matrícula não encontrada”.
    ii. Caso retorne sucesso exibir os dados de retorno nos LABEL de id= “matricula-aluno e nome-aluno”.
  c. Na segunda buscar, possui duas formas de buscar diferentes, em ambas as regras no comportamento no retorno são iguais;
    i. Caso retorno 1 ou mais alunos exibir “matricula + nome” de cada no DIV de id=“dados”.
    ii. Caso não retorne nenhum dado exibir a mensagem “Nenhuma informação encontrada.” no DIV de id=“dados”
    iii. Caso a opção “Todos” esteja marcada, execute a busca via GET, para a rota “aluno/todos”.
    iv. Caso a opção “Por Nome” esteja marcada, preencha o nome ou parte do mesmo e ao clicar em buscar execute a busca via GET, para a rota “/aluno/search?nome=${nome-busca-aqui}"

BONUS (Opcional):
● Adicione Loading em todas as operações que se comunica com a API.
● Quando executar qualquer busca por nome ou todos, adicionar um botão para cada aluno com o texto “Excluir aluno”.
● Ao clicar no botão “Excluir aluno”, deve ser chamado o back via POST para a rota “/aluno/deletar?matricula={matricula_aqui}”.
● Caso a matrícula não seja encontrada o back retornará um erro e deve ser exibido a seguinte mensagem no front “Matricula não encontrada”.
● Caso o sistema tenha sucesso na exclusão será deve ser feito uma nova busca para trazer os dados sem o recém excluído.

Regras de uso da API
● Url usada para acessar API: http://locahost:3000/{rota-do-exercicio}
● No cadastro de aluno, caso seja enviado uma matrícula já existente, o back retornará erro
● Caso receba erro o Json usado no retorno será o abaixo
  o Json retorno
      {
            "message": "Mensage de erro"
      }
● Para cadastro de aluno Json usado deve ser:
      {
            "nome": "Teste",
            “matricula”: “11111”
      }

Instruções de uso da API:
● Baixe o código do repositório
● Instale o programa node.js
● Execute o programa que está no repositório na pasta server/exercício-10.exe.
● O servidor subirá na porta 3000
*/

const btnCadastrar = document.querySelector("#cadastrar");
const inputNome = document.querySelector("#nome");
const inputMatricula = document.querySelector("#matricula");
const divLoadingCadastro = document.querySelector("#loading-cadastro");

btnCadastrar.addEventListener("click", cadastrarAluno);

function cadastrarAluno() {
  const nomeAluno = inputNome.value;
  const numeroMatricula = inputMatricula.value;

  if (!nomeAluno || !numeroMatricula) {
    alert("Preencha corretamente os campos");
    return;
  }

  divLoadingCadastro.innerHTML += "Carregando...";

  const aluno = {
    nome: nomeAluno,
    matricula: numeroMatricula,
  };

  const initRequest = {
    method: "POST",
    body: JSON.stringify(aluno),
  };

  const url = "http://localhost:3000";

  fetch(`${url}/aluno`, initRequest)
    .then((response) => {
      if (response.ok) {
        alert("Aluno cadastrado com sucesso");
        inputNome.value = "";
        inputMatricula.value = "";
        divLoadingCadastro.innerHTML += "";
        return;
      }
      throw new Error("Matricula ja cadastrada");
    })
    .catch((erro) => {
      alert(erro.message);
    });
}
