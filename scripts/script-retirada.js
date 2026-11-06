let alunos = [//Faz uma lista com a matricula, nome e turno dos alunos
    { matricula: "1025", nome: "João", turno: "tarde" },
    { matricula: "1234a", nome: "Luan", turno: "manha" },
    { matricula: "abcd", nome: "Rafael", turno: "noite" },
    { matricula: "4321", nome: "Maria", turno: "manha" },
    { matricula: "2048", nome: "Mateus", turno: "tarde" },
    { matricula: "3090", nome: "Pedro", turno: "manha" },
    { matricula: "1a2b", nome: "Leandro", turno: "tarde" },
    { matricula: "1098", nome: "Rodrigo", turno: "noite" }
];

// ---------- Retiradas (ficam salvas no navegador da cantineira) ----------

const CHAVE_RETIRADAS = "retiradas"; //Nome com que a lista fica guardada no localStorage

const retiradasIniciais = [ //Lista de exemplo, usada só na primeira vez que a página abre
    { matricula: "1a2b", aluno: "Leandro", turno: "tarde", data: "2026-11-01", hora: "15:10" }
];

function carregarRetiradas() { //Lê as retiradas salvas. Se não tiver nada salvo usa a lista de exemplo
    try {
        const salvo = JSON.parse(localStorage.getItem(CHAVE_RETIRADAS));

        if (Array.isArray(salvo)) {
            return salvo;
        }
    }
    catch (erro) {
        //Se o navegador bloquear o localStorage ou o conteúdo estiver quebrado, cai na lista de exemplo
    }

    return retiradasIniciais.slice();
}

function salvarRetiradas() { //Guarda a lista no navegador, assim ela não some quando a página é recarregada
    try {
        localStorage.setItem(CHAVE_RETIRADAS, JSON.stringify(retiradas));
    }
    catch (erro) {
        //Sem localStorage o sistema continua funcionando, só não lembra das retiradas depois de recarregar
    }
}

let retiradas = carregarRetiradas(); //Alunos que ja retiraram

// ---------- Regras de retirada ----------

function horarioTurno() { //Pega a hora, o dia, o mes, e o ano, e transforma numa data
    const agora = new Date();

    const ano = agora.getFullYear(); //Pega o ano atual
    const mes = String(agora.getMonth() + 1).padStart(2, "0"); //Pega o mes atual e adiciona 1, pois os meses começam em 0
    const dia = String(agora.getDate()).padStart(2, "0"); //Pega o dia atual e adiciona 0 na frente se for menor que 10

    const data = `${ano}-${mes}-${dia}`; //Transforma a data em uma string no formato YYYY-MM-DD
    const hora = agora.getHours(); //Pega a hora atual
    const minuto = String(agora.getMinutes()).padStart(2, "0"); //Pega os minutos atuais
    const horaTexto = `${String(hora).padStart(2, "0")}:${minuto}`; //Hora no formato HH:MM, usada no histórico

    let turno;

    if (hora >= 6 && hora < 12) { //Verifica o turno atual
        turno = "manha";
    }
    else if (hora >= 12 && hora < 18) {
        turno = "tarde";
    }
    else {
        turno = "noite";
    }

    return { data, turno, horaTexto }; //Retorna a data, o turno e a hora
}

function buscarAluno(matricula) { //Retorna o aluno se ele existe e undefined se não existe
    let resultado = alunos.find(aluno => aluno.matricula === matricula);

    return resultado;
}

function verificarRetirada(matricula, dataAtual) { //Verifica se a matricula e a data ja foram retirado
    let retiradaEncontrada = retiradas.find(retirada => retirada.matricula === matricula && retirada.data === dataAtual);

    return retiradaEncontrada !== undefined; // Se for !== de undefined da true, caso contrario false
}

function retirarLanche(matricula) { //Faz as verificações e devolve { liberado, mensagem, aluno }
    let horario = horarioTurno(); //Pega o horario
    let turnoAtual = horario.turno; //Pega o turno
    let dataAtual = horario.data; //Pega a data

    let aluno = buscarAluno(matricula); //Procura o aluno

    if (aluno === undefined) { //Se der undefined não é encontrado e finaliza
        return { liberado: false, mensagem: "Aluno não encontrado", aluno: undefined };
    }

    let jaRetirou = verificarRetirada(matricula, dataAtual); //Verifica se ja retirou

    if (jaRetirou) { //Se ja retirou mostra que ja retirou e finaliza
        return { liberado: false, mensagem: "Aluno já retirou", aluno: aluno };
    }

    // Descobre o dia da semana
    const dia = new Date(dataAtual + "T12:00:00").getDay();

    if (dia < 1 || dia > 5) { //Se for 0 domingo ou 6 sábado não retirar lanche
        return { liberado: false, mensagem: "Retirada não permitida nos finais de semana", aluno: aluno };
    }

    if (aluno.turno !== turnoAtual) { //Se tentar retirar em outro turno não deixar
        return { liberado: false, mensagem: "Turno inválido", aluno: aluno };
    }

    //Adicionar aos retirados e mostrar que pode retirar
    retiradas.push({
        matricula: matricula,
        aluno: aluno.nome,
        turno: turnoAtual,
        data: dataAtual,
        hora: horario.horaTexto
    });
    salvarRetiradas(); //Guarda no navegador para não perder

    return { liberado: true, mensagem: "Pode retirar", aluno: aluno };
}

// ---------- Mostrar resultado na tela ----------

const mensagem = document.getElementById("mensagem"); //Mostra na tela a mensagem
const dadosAluno = document.getElementById("dadosAluno"); //Mostra o nome do aluno
const botaoProximo = document.getElementById("btnProximo"); //Botão para ler o próximo aluno
const listaHistorico = document.getElementById("historico"); //Lista das retiradas de hoje

function mostrarResultado(resultado) { //Pinta a mensagem de verde (liberado) ou vermelho (negado)
    mensagem.textContent = resultado.mensagem;
    mensagem.className = resultado.liberado ? "ok" : "erro";

    if (resultado.aluno) {
        dadosAluno.textContent = resultado.aluno.nome + " - Matrícula: " + resultado.aluno.matricula;
    }
    else {
        dadosAluno.textContent = "";
    }
}

function limparResultado() { //Apaga a mensagem para o próximo aluno
    mensagem.textContent = "";
    mensagem.className = "";
    dadosAluno.textContent = "";
}

function processarLeitura(textoLido) { //Recebe o texto do QR Code, confere o formato e chama as regras
    const matricula = lerConteudoQR(textoLido); //Tira o prefixo "MATRICULA:" e devolve a matricula

    if (matricula === null) { //QR que não é do restaurante
        mostrarResultado({ liberado: false, mensagem: "QR Code inválido", aluno: undefined });
        return;
    }

    mostrarResultado(retirarLanche(matricula));
}

// ---------- Leitor de QR Code (câmera) ----------

let leitor = new Html5Qrcode("leitor");

let processando = false;

let configuracoes = {
    fps: 10,
    qrbox: function(largura, altura) { //Quadrado de leitura com 70% da menor lado da câmera, funciona em celular pequeno
        const lado = Math.floor(Math.min(largura, altura) * 0.7);
        return { width: lado, height: lado };
    }
};

async function pararLeitor() { //Desliga a câmera sem dar erro se ela já estiver desligada
    try {
        await leitor.stop();
    }
    catch (erro) {
        //Já estava parada
    }
}

async function quandoEncontrar(textoLido) { //Chamada toda vez que a câmera acha um QR Code
    if (processando === false) {
        try {
            processando = true;
            processarLeitura(textoLido);
        }
        finally {
            await pararLeitor(); //Para a câmera para não ler o mesmo aluno duas vezes
            botaoProximo.hidden = false; //Libera o botão para ler o próximo
        }
    }
}

async function iniciarLeitor() { //Liga a câmera e fica esperando um QR Code
    processando = false;
    botaoProximo.hidden = true;
    limparResultado();

    try {
        await leitor.start(
            { facingMode: "environment" },
            configuracoes,
            quandoEncontrar
        );
    }
    catch (erro) {
        mensagem.textContent = "Não foi possível abrir a câmera. Digite a matrícula abaixo.";
        mensagem.className = "erro";
        botaoProximo.textContent = "Tentar abrir a câmera de novo";
        botaoProximo.hidden = false;
    }
}

botaoProximo.addEventListener("click", iniciarLeitor);

// ---------- Digitar a matrícula (caso a câmera ou o celular do aluno falhe) ----------

function verificarManual() {
    const campo = document.getElementById("matriculaManual");
    const matricula = campo.value.trim();

    if (matricula === "") {
        mostrarResultado({ liberado: false, mensagem: "Digite a matrícula", aluno: undefined });
        return;
    }

    mostrarResultado(retirarLanche(matricula));
    campo.value = "";
}

document.getElementById("btnManual").addEventListener("click", verificarManual);

document.getElementById("matriculaManual").addEventListener("keydown", function(evento) { //Enter também confirma
    if (evento.key === "Enter") {
        evento.preventDefault();
        verificarManual();
    }
});

iniciarLeitor();
