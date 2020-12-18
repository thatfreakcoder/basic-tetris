document.addEventListener('DOMContentLoaded', () => {

// Initialize Constants
const grid = document.querySelector('.grid')
let squares = Array.from(document.querySelectorAll('.grid div'))
const width = 10
const startBtn = document.querySelector('#start-button')
const scoreDisplay = document.querySelector('#score')
let timerId
let nextRandom = 0
let score = 0
// The Tetriminoes

// L - Tetrimino
const lTetrimino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
]

// Z - Tetrimino
const zTetrimino = [
	[width+1, width+2, width*2, width*2+1],
	[0, width, width+1, width*2+1],
	[width+1, width+2, width*2, width*2+1],
	[0, width, width+1, width*2+1]
]

// T - tetrimino
const tTetrimino = [
	[1, width, width+1, width+2],
	[1, width+1, width+2, width*2+1],
	[width, width+1, width+2, width*2+1],
	[1, width, width+1, width*2+1]
]

// O - Tetrimino
const oTetrimino = [
	[0, 1, width, width+1],
	[0, 1, width, width+1],
	[0, 1, width, width+1],
	[0, 1, width, width+1]
]

// I - Tetrimino
const iTetrimino = [
	[1, width+1, width*2+1, width*3+1],
	[width, width+1, width+2, width+3],
	[1, width+1, width*2+1, width*3+1],
	[width, width+1, width+2, width+3]
]

const theTetriminoes = [lTetrimino, zTetrimino, tTetrimino, iTetrimino, oTetrimino]

let currentPosition = 4
let currentRotation = 0
let random = Math.floor(Math.random()*theTetriminoes.length)
let current = theTetriminoes[random][currentRotation]

// Draw the Tetrimino
function draw() {
	current.forEach(index => {
		squares[currentPosition + index].classList.add('tetrimino')
	})
}

// Remove the Tetrimino
function unDraw() {
	current.forEach(index => {
		squares[currentPosition + index].classList.remove('tetrimino')
	})
}


// Control The Tetrimino Movement
function control(ev) {
	if (ev.keyCode === 37){
		moveLeft()
	} else if (ev.keyCode === 32) {
		rotate()
	} else if (ev.keyCode === 39) {
		moveRight()
	} else if (ev.keyCode === 40) {
		moveDown()
	}
}
// listen to the Key Press
document.addEventListener('keydown', control)

// Moving the Tetrimino Down
function moveDown() {
	unDraw()
	currentPosition += width
	draw()
	freeze()
}

// Writing a Freeze Function
function freeze() {
	if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
		// Freeze the currently falling tetrimino and start a new tetrimino
		current.forEach(index => squares[currentPosition + index].classList.add('taken'))
		random = nextRandom
		nextRandom = Math.floor(Math.random() * theTetriminoes.length)
		current = theTetriminoes[random][currentRotation]
		currentPosition = 4
		draw()
		displayNext()
	}
}

// function to rotate the Tetrimino
function rotate() {
	unDraw()
	currentRotation ++ 
	if (currentRotation === current.length) {
		currentRotation = 0
	}
	current = theTetriminoes[random][currentRotation]
	draw
}

// function to move left
function moveLeft() {
	unDraw()
	const isAtLeft = current.some(index => (currentPosition + index) % width === 0)

	if (!isAtLeft) currentPosition -= 1

	if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
		currentPosition += 1
	}
	draw()
}

// function to move tetrimino right
function moveRight() {
	unDraw()
	const isAtLeft = current.some(index => (currentPosition + index + 1) % width === 0)

	if (!isAtLeft) currentPosition += 1

	if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
		currentPosition -= 1
	}
	draw()
}

// Up Next Tetrimino in the Mini Grid
const miniSquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let miniIndex = 0

// showing the tetrimino
const upNextTetrimino = [
	[1, displayWidth+1, displayWidth*2+1, 2], //ltetrimino
    [0, displayWidth, displayWidth+1, displayWidth*2+1], //ztetrimino
    [1, displayWidth, displayWidth+1, displayWidth+2], //ttetrimino
    [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1], //itetrimino
    [0, 1, displayWidth, displayWidth+1] //otetrimino

 //    [1, miniWidth+1, miniWidth*2+1, miniWidth*3+1], //itetrimino
	// [1, miniWidth+1, miniWidth*2+1, 2], //ltetrimino
 //    [0, miniWidth, miniWidth+1, miniWidth*2+1], //ztetrimino
 //    [1, miniWidth, miniWidth+1, miniWidth+2], //ttetrimino
 //    [0, 1, miniWidth, miniWidth+1] //otetrimino
  
]

function displayNext() {
	// remove any pre-existing traces of tetrimino in the mini grid
	miniSquares.forEach(square => {
		square.classList.remove('tetrimino')
	})

	upNextTetrimino[nextRandom].forEach( index => {
		miniSquares[miniIndex + index].classList.add('tetrimino')
	})
}
startBtn.addEventListener('click', () => {
	if (timerId) {
		clearInterval(timerId)
		timerId = null
	} else {
		draw()
		timerId = setInterval(moveDown, 500)
		random = Math.floor(Math.random()*theTetriminoes.length)
		displayNext()
	}
})
})