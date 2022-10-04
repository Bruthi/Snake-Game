let canvas = document.getElementById("snake"); // Cria o elemento que vai rodar o jogo 
let context = canvas.getContext("2d"); // Context renderiza o desenho do canvas 
let box = 32;
let snake = []; //criar cobrinha como lista, já que ela vai ser uma série de coordenadas, que quando pintadas, criam os quadradinhos
snake[0] ={ // posição da cabeça cobrinha
    x: 8 * box,
    y: 8 * box
}
let direction = "right"; // Variavel com a direção que queremos que a cobrinha tenha (Tanto faz a direção e so precisamos criar uma e não uma para todas as direções )
let food ={ // posição da comida
    x: Math.floor(Math.random() * 15 + 1) * box, // Math.random retorna um numero aleatorio ate 1
    y: Math.floor(Math.random() * 15 + 1) * box // Math.floor faz com que não apareçam numeros quebrados como 1,34 (retira tudo depois da virgula)
}

function criarBG(){ // Função que começa o canvas, desenha e define a cor
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16*box, 16*box); // Desenha o retangulo onde acontece o jogo usando x e y e a largura e altura setadas
}

function criarCobrinha (){ // A cobra é uma array por isso usar o FOR 
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "green"; // Pinta a cobra de verde
        context.fillRect(snake[i].x, snake[i].y, box, box); // Define o tamanho dela tendo X e Y definidos la em cima para a sua posição 
    }
}

function drawFood (){  //cria a comida da cobrinha
    context.fillStyle = "red"; // da cor pra ela
    context.fillRect(food.x, food.y, box, box); // adciona as posições x e y para a comida aparecer (definidos no let food)
}

//quando um evento acontece, detecta e chama uma função
document.addEventListener('keydown', update); // Esse código faz com que ao apertar uma tecla ele chame o update e passa como argumento o evento de telca adcionados nele

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left'; // Se o botão for 38(É o numero do botão da setinha do teclado) e a direção não for right ela vira left 
    if(event.keyCode == 38 && direction != 'down') direction = 'up'; // isso faz com que a cobrinha não tenha duas cabeças (uma na frente e uma na calda)
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){    

    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0; // Cria um plano carteseano, que quando a cobra passa de 15 que é o maximo da direita ela aparece no 0 que é o começo da esquerda
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;
    
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ //se a posição 0 de snake(cabeça) for igual a pocição i (corpo)
            clearInterval(jogo);
            alert('Game Over :(');
        }
    }

    criarBG(); //Executa o funcion na tela 
    criarCobrinha(); //Executa o funcion na tela 
    drawFood(); //Executa o funcion na tela 

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box; // Aplica o movimento da cobra no jogo 
    if(direction == "left") snakeX -= box; // Para direita adiciona um quadradinho, para esquerda diminui um quadradinho (Igual ao plano cartesiano) 
    if (direction == "up") snakeY -= box; // Para cima adiciona um quadrado e para baixo diminui 
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){ // Faz com que a cobrinha aumente de tamanho sempre que ela come
        snake.pop(); //Retira o ultimo elemento do Array(Cobra), fazendo com que ela sempre fique atualizada e do tamnho certo
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }
    
    let newHead ={ // Cria a cabeça dela 
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead); // Faz com que a cabeça seja acrescenstada no primeiro elemento (sempre ficara na frente) 
}

let jogo = setInterval(iniciarJogo, 100); // Faz com que o jogo se atualize a cada 100milesegundos dando continuidade no jogo(Fazendo que os movimentos aconteçam ou ate o game over) 