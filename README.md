# Restaurante-ind-strial
Projeto desenvolvido durante o segundo semestre no Senai, no curso de Desenvolvimento de Sistemas.

SA – Restaurante Industrial
Alunos: Luan Bernardo; Rafael dos Santos; Maria Eduarda.
Turma: T DESI 2026 1/M1
SUMÁRIO
Introdução
1.1. Breve descrição
1.2. Como funciona atualmente
Desenvolvimento
2.1. Principais problemas enfrentados
2.2. Estudo de caso
2.3. User Stories
2.4. Possíveis soluções
2.5. Requisitos funcionais (RF)
2.6. Requisitos não funcionais (RNF)
2.7. Regras de negócio (RN)
2.8. Caso de uso
Conclusão
3.1. Como realizaremos

1. INTRODUÇÃO
1.1. Breve descrição:
Atualmente, o restaurante industrial trabalha com o objetivo de preparar e servir uma grande quantidade de refeições todos os dias, atendendo diversos alunos em diferentes turnos. Para organizar a distribuição dos lanches, o restaurante utiliza fichas que são entregues pelos alunos no momento da retirada. Porém, esse método pode gerar alguns problemas, como a perda de fichas, a retirada duplicada de lanches e a dificuldade na identificação dos pedidos. Além disso, o uso das fichas pode provocar filas demoradas e dificultar o atendimento. Por isso, a criação de uma solução digital seria uma alternativa para tornar esse processo mais rápido, prático e organizado, facilitando tanto o trabalho dos funcionários quanto o atendimento aos alunos.

1.2. Como funciona atualmente:
Os alunos entregam suas fichas de solicitação de lanche diretamente à cantineira, que fica responsável por organizar e conferir os pedidos. Depois disso, ela realiza a entrega dos lanches de acordo com as fichas recebidas, garantindo que cada aluno receba o lanche solicitado. Dessa forma, o atendimento acontece de maneira organizada, buscando evitar confusões e facilitar a distribuição dos alimentos.

3. DESENVOLVIMENTO
2.1. Principais problemas enfrentados:
Perda de fichas;
Retirada duplicada de lanches;
Dificuldade na identificação dos alunos;
As fichas podem se quebrar ou danificar facilmente.

2.2. Estudo de caso:
Onde está acontecendo o problema e qual área está envolvida?
R: No restaurante industrial, principalmente durante o processo de retirada dos lanches.
O que está causando impacto negativo?
R: A perda das fichas, a possibilidade de retirada duplicada, a dificuldade na identificação dos alunos e os danos causados às fichas.
Quem participa ou é afetado?
R: Os alunos e os funcionários do restaurante industrial.
O que o problema gera?
R: Os alunos podem perder suas fichas e, consequentemente, enfrentar dificuldades para retirar seus lanches. Além disso, podem ocorrer erros na distribuição e atrasos no atendimento.

2.3. User Stories:
Como cantineira, quero utilizar um meio digital para melhorar e facilitar a entrega dos lanches.
Como supervisão, quero diminuir os problemas relacionados à perda e ao controle das fichas.
Como docente, quero que as fichas sejam substituídas por QR Codes, facilitando a identificação e a retirada dos lanches.

2.4. Possíveis soluções:
Foram consideradas algumas alternativas para substituir o método atual:
Utilização de QR Codes;
Identificação por matrícula;
Utilização de crachás.
Após considerar as possibilidades, a proposta escolhida foi desenvolver um sistema digital que utilize QR Codes vinculados à matrícula dos alunos.

2.5. Requisitos funcionais (RF):
O aluno deverá informar seu nome e sua matrícula para acessar o sistema.
O sistema deverá permitir que o aluno visualize o cardápio do dia.
Caso o aluno deseje sair, deverá retornar à página inicial.
O sistema deverá permitir que o aluno acesse a página de retirada.
O sistema deverá gerar um QR Code vinculado à matrícula do aluno.
A cantineira deverá conseguir realizar a leitura do QR Code por meio de um leitor.
Caso o leitor não esteja funcionando, a cantineira deverá ter a opção de informar a matrícula manualmente.

2.6. Requisitos não funcionais (RNF):
Somente alunos cadastrados poderão acessar o sistema.
A leitura do QR Code deverá ocorrer em, no máximo, 2 segundos.
O site deverá funcionar em diferentes dispositivos, como celulares, tablets e computadores.

2.7. Regras de negócio (RN):
A matrícula informada deverá corresponder a uma matrícula cadastrada no sistema.
O nome informado deverá corresponder ao nome vinculado à matrícula cadastrada.
Cada aluno poderá retirar apenas um lanche por dia.
Os alunos somente poderão retirar lanches durante seu respectivo turno.
As retiradas serão permitidas somente de segunda a sexta-feira.

2.8. Caso de uso:
O aluno deverá informar seu nome e sua matrícula para acessar o sistema.
Após o acesso, o aluno poderá visualizar o cardápio.
O aluno poderá sair do sistema e retornar à página inicial ou acessar a página de retirada.
Ao acessar a página de retirada, o sistema deverá apresentar um QR Code vinculado à sua matrícula.
A cantineira deverá realizar a leitura do QR Code.
Caso o leitor não esteja funcionando, a cantineira poderá utilizar o campo manual para digitar a matrícula.
Caso a matrícula esteja vazia ou seja inválida, a retirada deverá ser negada.
Caso o aluno ainda não tenha realizado a retirada naquele dia e esteja dentro das condições permitidas, a retirada será autorizada.
Caso o aluno tente retirar mais de uma vez no mesmo dia, a retirada deverá ser negada.
Caso o aluno tente retirar em um turno diferente do seu, a retirada deverá ser negada.
Caso o aluno tente retirar durante o final de semana, a retirada deverá ser negada.
Caso o QR Code não contenha uma matrícula válida, a retirada deverá ser negada.

2.9. Prints da tela/código:

3. CONCLUSÃO
3.1. Como realizaremos:
Neste projeto, teremos três páginas principais: a página inicial (login), a página do cardápio e a página de retirada.
A página inicial permitirá que o aluno informe seu nome e sua matrícula para acessar o sistema. Após preencher as informações corretamente, ele será direcionado ao cardápio, onde poderá consultar os lanches disponíveis para aquele dia.
Em seguida, o aluno poderá escolher a opção de retirada e será direcionado à página correspondente, na qual encontrará um QR Code vinculado à sua matrícula.
Por fim, o aluno deverá apresentar o QR Code à cantineira, que realizará a leitura por meio de um dispositivo. O sistema verificará se a retirada está permitida, considerando as regras estabelecidas. Caso todas as condições sejam atendidas, a retirada será autorizada; caso contrário, será negada.
