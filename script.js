const alunos = [ //Cria uma lista de alunos, cada um com nome e matricula
    { matricula: "1025", nome: "João" },
    { matricula: "1234a", nome: "Luan" },
    { matricula: "abcd", nome: "Rafael" },
    { matricula: "4321", nome: "Maria" },
    { matricula: "2048", nome: "Mateus" },
    { matricula: "3090", nome: "Pedro" },
    { matricula: "1a2b", nome: "Leandro" },
    { matricula: "1098", nome: "Rodrigo" }
];

function verificarCadastro() { //Verifica o cadastro
    const nome = document.getElementById("nome").value.trim(); //Pega o nome digitado
    const matricula = document.getElementById("matricula").value; //Pega a matricula digitada
    const resultado = document.getElementById("resultado"); //Pega o resultado da consulta

    if (nome === "" || matricula === "") { //Se o campo estiver vazio retorna "Preencha o campo"
        resultado.textContent = "Preencha todos os campos.";
        resultado.style.color = "#A52A2A";
        resultado.style.fontFamily = "cascadia code";
        return;
    }

    const alunoEncontrado = alunos.find(function(aluno) { //Procura nos alunos um aluno, e retorna o nome e a matricula
        return nome === aluno.nome && matricula === aluno.matricula;
    });

    if (alunoEncontrado) { //Se o aluno existe manda ele para o cardápio

        sessionStorage.setItem("matriculaAluno", alunoEncontrado.matricula); //Pega e armazena a matricula
        sessionStorage.setItem("nomeAluno", alunoEncontrado.nome); //Pega e armazena o nome (aparece na tela do QR Code)
    
        window.location.href = "paginas/cardapioLanches.html";
        resultado.textContent = "Acesso liberado.";
        resultado.style.color = "green";
            
    }
        
    else { //Senão mostre "Cadastro não encontrado"
        resultado.textContent = "Cadastro não encontrado.";
        resultado.style.color = "#A52A2A";
    }
}
