const grid = document.querySelector('.grid')
const startButton = document.getElementById('start')
const scoreDisplay = document.getElementById('score')
let squares = []
let currentSnake = [2,1,0]
let direction = 1
const width = 10
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId

function createGrid() {
    // create 100 of these elements with a for loop
    // create element
    // add styling to the element
    // put the element into our grid
    // push it into a new squares array
    for (let i = 0; i < width*width; i++) {
        let square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }

} createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    scoreDisplay.textContent = score
    direction = 1
    intervalTime = 1000
    generateApples()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move() {
    if (
        (currentSnake[0] + width >= width*width && direction === width) ||
        (currentSnake[0] % width === width-1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === - 1) ||
        (currentSnake[0] - width < 0 && direction === - width) ||
        (squares[currentSnake[0] + direction].classList.contains('snake'))
    ) {
        console.log(currentSnake[0])
        return clearInterval(timerId)
    }

    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    currentSnake.unshift(currentSnake[0] + direction)
    
    // Apples
    // deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        // remove the class of apple
        squares[currentSnake[0]].classList.remove('apple')
        // grow our snake by adding class of snake to it
        squares[tail].classList.add('snake')
        // grow our snake array
        currentSnake.push(tail)
        console.log(currentSnake)
        // generate a new apple
        generateApples()
        // add one to the score
        score += 1
        scoreDisplay.textContent = score
        // speed up our snake
        clearInterval(timerId)
        // intervalTime = intervalTime - 250
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime);
        console.log(intervalTime)

        // console.log('Mmmm! 🍎')
        // currentSnake.unshift(currentSnake[0] + direction)
        // squares[currentSnake[0]].classList.add('snake')
    }
    
    squares[currentSnake[0]].classList.add('snake')
}

function generateApples() {
    console.log(squares[appleIndex])
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
    console.log(appleIndex)
    // let randomNumber = Math.floor( Math.random() * width*width )
    // squares[randomNumber].classList.add('apple')
} generateApples()



function controls(e) {
    if (e.keyCode === 39) {
        console.log('Right')
        direction = 1
    } else if (e.keyCode === 38) {
        console.log('Up')
        direction = - width
    } else if (e.keyCode === 37) {
        console.log('Left')
        direction = - 1
    } else if (e.keyCode === 40) {
        console.log('Down')
        direction = width
    }
}

document.addEventListener('keyup', controls)

startButton.addEventListener('click', function() {
    // move()
    // clearInterval(timerId)
    startGame()
})

// if snake has hit bottom
// if snake has hit right wall
// if snake has hit left wall
// if snake has hit top
// if snake has into it self

// 39 is right arrow
// 38 is for the up arrow
// 37 is for the left arrow
// 40 is for the down arrow

// deal with snake head getting the apple
// remove the class of apple
// grow our snake by adding class of snake to it
// grow our snake array
// generate a new apple
// add one to the score
// speed up our snake
