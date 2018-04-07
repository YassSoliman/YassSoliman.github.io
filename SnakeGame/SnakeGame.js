const FRAMERATE = 14;
const CELL = 20;
const ROWS = 35;
const COLS = 32;

var cvs;
var ctx;

var d; // direction the snake is going
var snake = [];
snake[0] ={
	x : 2*CELL,
	y : 6*CELL
};
var food = {
	x : calculateRandomX(), 
	y : calculateRandomY() 
};
var score = 0;
var playing = true;

window.onload = function(){
	// initialize the canvas and the context
	cvs = document.getElementById('gameCanvas'); // Selects the canvas from the html file using it's id
	ctx = cvs.getContext('2d'); // Defines the drawing context to 2d
	window.addEventListener('mousedown', mouseControl);
	window.addEventListener('keydown', directionControl); // assign a keydown action to the function characterMovement
	
	update(); // update the game every FRAMERATE
}

function update(){
	setInterval(game, 1000/FRAMERATE);
}

function game(){
	// Draw the background/UI
	drawBackground();
	// Move the snake
	characterMovement();
	
	// Draw the snake
	drawSnake();	
	
	// Draw food
	drawFood();
	
	// Draw score
	drawScore();
	
	if(!playing){
		gameOverScreen();
	}
}

function calculateRandomX(){
	return (Math.floor(Math.random() * (COLS - 3) + 1)*CELL); // between CellX #1 and CellX #30
}

function calculateRandomY(){
	return (Math.floor(Math.random() * (ROWS - 7) + 5)*CELL); // between CellY #5 and CellY #33
}

// checks if the character hits himself or the walls
function checkBoundaries(head, array) {	
	// Check if the head touches any other part of the body
	for(var i=0; i<array.length; i++){
		if(head.x == array[i].x && head.y == array[i].y && array.length != 1){
			playing = false;
		}
	}
	
	// Check if the head touches the border walls
	if(head.x < CELL || head.x > 30*CELL || head.y < 5*CELL || head.y > 33*CELL){
		playing = false;
	}
}

// reset the food position
function resetFood() {
	food = {
		x : calculateRandomX(), 
		y : calculateRandomY() 
	};
}

function resetGame() {
	playing = true;
	snake = []
	snake[0] ={
		x : 2*CELL,
		y : 6*CELL
	};
	resetFood();
	score = 0;
}

// Function that controls the character movement
function characterMovement(){
	
	var Head = {
		x: snake[0].x,
		y: snake[0].y
	}
	
	if (d == 'up') Head.y -= CELL;
	if (d == 'down') Head.y += CELL;
	if (d == 'left') Head.x -= CELL;
	if (d == 'right') Head.x += CELL;	
	
	// gameOver rules
	checkBoundaries(Head, snake);
	// Snake eats the food
	if(playing == true){
		if (Head.x == food.x && Head.y == food.y){
			score++;
			resetFood();
		} else {
			snake.pop(); // removes the last block of the snake
		}		
		
		snake.unshift(Head); // add the new head positions	
	}
	
}

// mouse event controller
function mouseControl(evt) {
	if(!playing){
		resetGame(); // restart the game
	}	
}

// Function that controls the character direction
function directionControl(evt){
	//console.log(evt.keyCode);
	if((evt.key == 'ArrowUp' || evt.key == 'w') && (d != 'down')){
		//console.log('Up');
		d = 'up';
	} else if((evt.key == 'ArrowDown' || evt.key == 's') && (d != 'up')){
		//console.log('Down');
		d = 'down';
	} else if((evt.key == 'ArrowLeft' || evt.key == 'a') && (d != 'right')){
		//console.log('Left');
		d = 'left';
	} else if((evt.key == 'ArrowRight' || evt.key == 'd') && (d != 'left')){
		//console.log('Right');
		d = 'right';
	}
}

function drawBackground(){
	drawGrid();
	//drawRect(0, 0, cvs.width, cvs.height, '#d6d6d6');
	drawRect(0, 0, COLS*CELL, 5*CELL, 'black');
	drawRect(0, 0, CELL, cvs.height, 'black');
	drawRect((COLS-1)*CELL, 0, CELL, cvs.height, 'black');
	drawRect(0, (ROWS-1)*CELL, cvs.width, CELL, 'black');
	
}

function drawGrid() {
	for(var i=0; i<COLS; i++){
		for(var j=0; j<ROWS; j++){
			drawRect(i*CELL, j*CELL, CELL, CELL, '#d6d6d6', true, '#a0a0a0');
		}
	}
}

function drawSnake(){
	for(var i=0; i<snake.length; i++){
		drawRect(snake[i].x, snake[i].y, CELL, CELL, ((i==0) ? '#ff5656' : '#ff8989'), true, '#4f1313');
	}
}

function drawScore(){
	ctx.fillStyle = 'white';
	ctx.font = "30px Verdana";
	ctx.fillText("Score: " + score, CELL, 3*CELL);
}

function drawFood(){
	drawRect(food.x + CELL/4, food.y + CELL/4, CELL/2, CELL/2, '#31b234', true, '#2bdb2f');
}

function drawRect(posX, posY, width, height, color, stroke, strokeColor){
	ctx.fillStyle = color;
	ctx.fillRect(posX, posY, width, height);
	
	if(stroke == true){
		ctx.strokeStyle = strokeColor;
		ctx.strokeRect(posX, posY, width, height);
	}
}

function gameOverScreen() {
	d = null;
	ctx.fillStyle = '#8c3333';
	ctx.font = "30px Verdana";
	ctx.fillText("Game Over!", 12*CELL, 19*CELL);
	ctx.fillStyle = '#ea4444';
	ctx.font = "18px Verdana";
	ctx.fillText("Click to continue", 12.8*CELL,21*CELL);
}

