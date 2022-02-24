/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var grid = document.querySelector('.grid');
var startButton = document.getElementById('start');
var scoreDisplay = document.getElementById('score');
var squares = [];
var currentSnake = [2, 1, 0];
var direction = 1;
var width = 10;
var appleIndex = 0;
var score = 0;
var intervalTime = 1000;
var speed = 0.9;
var timerId = void 0;

function createGrid() {
    // create 100 of these elements with a for loop
    // create element
    // add styling to the element
    // put the element into our grid
    // push it into a new squares array
    for (var i = 0; i < width * width; i++) {
        var square = document.createElement('div');
        square.classList.add('square');
        grid.appendChild(square);
        squares.push(square);
    }
}createGrid();

currentSnake.forEach(function (index) {
    return squares[index].classList.add('snake');
});

function startGame() {
    currentSnake.forEach(function (index) {
        return squares[index].classList.remove('snake');
    });
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    score = 0;
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApples();
    currentSnake.forEach(function (index) {
        return squares[index].classList.add('snake');
    });
    timerId = setInterval(move, intervalTime);
}

function move() {
    if (currentSnake[0] + width >= width * width && direction === width || currentSnake[0] % width === width - 1 && direction === 1 || currentSnake[0] % width === 0 && direction === -1 || currentSnake[0] - width < 0 && direction === -width || squares[currentSnake[0] + direction].classList.contains('snake')) {
        console.log(currentSnake[0]);
        return clearInterval(timerId);
    }

    var tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    // Apples
    // deal with snake head getting the apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        // remove the class of apple
        squares[currentSnake[0]].classList.remove('apple');
        // grow our snake by adding class of snake to it
        squares[tail].classList.add('snake');
        // grow our snake array
        currentSnake.push(tail);
        console.log(currentSnake);
        // generate a new apple
        generateApples();
        // add one to the score
        score += 1;
        scoreDisplay.textContent = score;
        // speed up our snake
        clearInterval(timerId);
        // intervalTime = intervalTime - 250
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
        console.log(intervalTime);

        // console.log('Mmmm! 🍎')
        // currentSnake.unshift(currentSnake[0] + direction)
        // squares[currentSnake[0]].classList.add('snake')
    }

    squares[currentSnake[0]].classList.add('snake');
}

function generateApples() {
    console.log(squares[appleIndex]);
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains('snake'));
    squares[appleIndex].classList.add('apple');
    console.log(appleIndex);
    // let randomNumber = Math.floor( Math.random() * width*width )
    // squares[randomNumber].classList.add('apple')
}generateApples();

function controls(e) {
    if (e.keyCode === 39) {
        console.log('Right');
        direction = 1;
    } else if (e.keyCode === 38) {
        console.log('Up');
        direction = -width;
    } else if (e.keyCode === 37) {
        console.log('Left');
        direction = -1;
    } else if (e.keyCode === 40) {
        console.log('Down');
        direction = width;
    }
}

document.addEventListener('keyup', controls);

startButton.addEventListener('click', function () {
    // move()
    // clearInterval(timerId)
    startGame();
});

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

/***/ })
/******/ ]);