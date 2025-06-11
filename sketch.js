//google gemini
//uma pessoa que está em um mercado (na cidade) comprando frutas que vieram da zona rural.


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}

// Variáveis para a pessoa
let pessoaX;
let pessoaY;
let pessoaLargura = 40;
let pessoaAltura = 80;
let velocidadePessoa = 5;

// Variáveis para as frutas
let frutas = [];
let tamanhoFruta = 40;

// Tipos de frutas (para facilitar a criação)
const tiposFruta = [
  { nome: "Maçã", cor: [255, 0, 0], preco: 1.50 },
  { nome: "Banana", cor: [255, 255, 0], preco: 0.80 },
  { nome: "Laranja", cor: [255, 165, 0], preco: 1.25 }
];

// Carrinho de compras
let carrinho = [];
let totalCompra = 0;

function setup() {
  createCanvas(800, 600);
  pessoaX = width / 2;
  pessoaY = height - pessoaAltura - 20;

  // Criar as frutas na bancada
  let yFruta = height / 3;
  let xInicialFruta = width / 4;
  let espacamentoFruta = width / 8;

  for (let i = 0; i < tiposFruta.length; i++) {
    frutas.push({
      x: xInicialFruta + i * espacamentoFruta,
      y: yFruta,
      tipo: tiposFruta[i]
    });
  }
}

function draw() {
  background(220); // Cor de fundo do mercado

  // Desenhar o chão do mercado
  fill(150, 100, 50); // Marrom claro
  rect(0, height * 0.7, width, height * 0.3);

  // Desenhar a bancada de frutas
  fill(100, 70, 30); // Marrom escuro
  rect(width / 5, height / 3 + tamanhoFruta / 2, width * 0.6, 20); // Bancada

  // Desenhar e verificar as frutas
  for (let i = 0; i < frutas.length; i++) {
    let fruta = frutas[i];
    fill(fruta.tipo.cor[0], fruta.tipo.cor[1], fruta.tipo.cor[2]);
    noStroke();
    ellipse(fruta.x, fruta.y, tamanhoFruta, tamanhoFruta);
    fill(0); // Cor do texto
    textAlign(CENTER, CENTER);
    textSize(14);
    text(fruta.tipo.nome, fruta.x, fruta.y + tamanhoFruta / 2 + 10);
    text(`R$ ${fruta.tipo.preco.toFixed(2)}`, fruta.x, fruta.y + tamanhoFruta / 2 + 25);
  }

  // Desenhar a pessoa
  fill(0, 0, 255); // Azul para a pessoa
  rect(pessoaX - pessoaLargura / 2, pessoaY, pessoaLargura, pessoaAltura);
  fill(255); // Cor da cabeça
  ellipse(pessoaX, pessoaY, pessoaLargura * 0.8, pessoaLargura * 0.8);

  // Mover a pessoa com o mouse
  pessoaX = lerp(pessoaX, mouseX, 0.1);
  pessoaX = constrain(pessoaX, pessoaLargura / 2, width - pessoaLargura / 2); // Limitar movimento

  // Desenhar o carrinho de compras
  fill(100); // Cinza para o carrinho
  rect(width - 150, height - 100, 130, 80);
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text("Carrinho:", width - 140, height - 90);

  let yItemCarrinho = height - 70;
  for (let i = 0; i < carrinho.length; i++) {
    text(`- ${carrinho[i].nome}`, width - 140, yItemCarrinho + i * 18);
  }

  // Desenhar o total da compra
  fill(0);
  textSize(20);
  textAlign(RIGHT, BOTTOM);
  text(`Total: R$ ${totalCompra.toFixed(2)}`, width - 20, height - 10);
}

// Função para lidar com o clique do mouse
function mousePressed() {
  // Verificar se o clique foi em uma fruta
  for (let i = 0; i < frutas.length; i++) {
    let fruta = frutas[i];
    let d = dist(mouseX, mouseY, fruta.x, fruta.y); // Distância do clique à fruta

    if (d < tamanhoFruta / 2) { // Se o clique foi dentro da fruta
      // Adicionar a fruta ao carrinho
      carrinho.push(fruta.tipo);
      totalCompra += fruta.tipo.preco;
      print(`Adicionado: ${fruta.tipo.nome}. Total: R$ ${totalCompra.toFixed(2)}`);
      break; // Sai do loop após encontrar a fruta clicada
    }
  }
}