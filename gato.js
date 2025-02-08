var config = 
{
    type: Phaser.AUTO,
    width: window.innerWidth, // Ajusta largura para o tamanho da janela
    height: window.innerHeight, // Ajusta altura para o tamanho da janela
    scene: 
    {
        preload: preload,
        create: create,
        update: update
    },
    scale: 
    {
        mode: Phaser.Scale.RESIZE, // Ajusta o jogo ao tamanho da tela
    }
};

var game = new Phaser.Game(config);
var gatos = []; // Array para armazenar os gatos
var pata; // Objeto da pata
var gatosRestantes = 10; // Definindo numero de gatos

function preload() 
{
    // Carrega as imagens:
    this.load.image('fundo', 'assets/fundo.png'); // Fundo
    this.load.image('logo', 'assets/logo-inteli_azul.png'); // Logo Inteli
    this.load.image('gatoff', 'assets/vagalumes/gatoff.png'); // Gato boca aberta
    this.load.image('gatopen', 'assets/vagalumes/gatopen.png'); //Gato boca fechada
    this.load.image('pata', 'assets/pata.png'); // Pata
}

function create() {
    // Adiciona fundo e ajusta ao tamanho da tela
    this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'fundo')
        .setDisplaySize(window.innerWidth, window.innerHeight);

    // Adiciona logo
    this.add.image(window.innerWidth - 250, window.innerHeight - 75, 'logo').setScale(0.5);
    
    // Adiciona pata
    pata = this.add.image(200, window.innerHeight - 150, 'pata').setScale(0.3); 
    pata.setDepth(1)
    
    // Cria gatos
    for (let i = 0; i < gatosRestantes; i++) {
        let gato = this.add.image
(
            Phaser.Math.Between(50, window.innerWidth - 50), 
            Phaser.Math.Between(50, window.innerHeight - 50), 
            'gatoff'
    ).setScale(0.2);


        gato.setFlip(true, false);
        gato.setInteractive(); // Torna o gato interativo para detectar cliques
        gato.velocidadeX = Phaser.Math.FloatBetween(-1, 1); // Velocidade X aleatoria
        gato.velocidadeY = Phaser.Math.FloatBetween(-1, 1); // Velocidade Y aleatória
        this.input.on('gameobjectdown', capturarGato, this); // Adiciona evento de clique

        gatos.push(gato);
    }

    // Atualiza a posição da pata conforme o movimento do mouse
    this.input.on('pointermove', function (pointer) {
        pata.x = pointer.x;
        pata.y = pointer.y;
    });
}

function update() {
    // Movimenta os gatos levemente pela tela
    gatos.forEach(gato => {
        gato.x += gato.velocidadeX;
        gato.y += gato.velocidadeY;

        // Faz os gatos mudarem de direção se atingirem as bordas da tela
        if (gato.x < 50 || gato.x > window.innerWidth - 50) {
            gato.velocidadeX *= -1;
        }
        if (gato.y < 50 || gato.y > window.innerHeight - 50) {
            gato.velocidadeY *= -1;
        }
    });
}


function capturarGato(pointer, gato) {
    // Altera a imagem do gato depois que ele é atingido"
    gato.setTexture('gatopen');
    
    // Aguarda um curto período antes de remover o gato
    setTimeout(() => {
        gato.destroy(); // Remove o gato da tela
    }, 500);

}