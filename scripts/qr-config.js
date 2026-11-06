// Funções compartilhadas entre a tela do aluno (gera o QR Code) e a tela da cantineira (lê o QR Code).
// Assim os dois lados sempre usam o mesmo formato de conteúdo.

const PREFIXO_QR = "MATRICULA"; //Identificador do restaurante industrial. Todo QR Code do sistema começa com ele

function gerarConteudoQR(matricula) { //Monta o texto que vai dentro do QR Code. Exemplo: "MATRICULA:1234a"
    return PREFIXO_QR + ":" + matricula;
}

function lerConteudoQR(texto) { //Pega o texto lido e devolve a matricula. Se o QR não for do sistema devolve null
    const inicio = PREFIXO_QR + ":";
    const lido = String(texto).trim();

    if (!lido.startsWith(inicio)) { //QR de outro lugar (site, wifi, etc.) é rejeitado
        return null;
    }

    const matricula = lido.slice(inicio.length).trim(); //Remove o prefixo e fica só a matricula

    if (matricula === "") { //Prefixo sem matricula também é inválido
        return null;
    }

    return matricula;
}
