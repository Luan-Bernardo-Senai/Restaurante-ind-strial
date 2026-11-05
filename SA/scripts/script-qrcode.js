const matricula = sessionStorage.getItem("matriculaAluno"); //Pega a matricula do aluno
const nomeAluno = sessionStorage.getItem("nomeAluno"); //Pega o nome do aluno (salvo no login)

const areaQR = document.getElementById("qrcode"); //Cria a area do qr code
const mensagem = document.getElementById("mensagem"); //Mostra a mensagem
const dadosAluno = document.getElementById("dadosAluno"); //Mostra nome e matricula embaixo do qr code

if (matricula) { //Se a matricula existe mostra um qr code
    new QRCode(areaQR, {
        text: gerarConteudoQR(matricula), //Guarda "MATRICULA:matricula" dentro do QR Code
        width: 220,
        height: 220,
        correctLevel: QRCode.CorrectLevel.H //Nível alto de correção, o QR continua legível mesmo com a tela suja ou riscada
    });

    //Mostra quem é o dono do QR Code, assim a cantineira pode conferir
    dadosAluno.textContent = (nomeAluno ? nomeAluno + " - " : "") + "Matrícula: " + matricula;
} else { //Se não existe mostra erro matricula não encontrada
    mensagem.textContent = "Matrícula não encontrada. Faça o cadastro novamente.";
}
