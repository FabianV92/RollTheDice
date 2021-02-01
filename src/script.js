"use strict";

// Selecting Elements
const payerTotalScoreEl0 = document.querySelector(".playerPointsTotal-0");
const payerTotalScoreEl1 = document.querySelector(".playerPointsTotal-1");
const playerCurrentScoreEl0 = document.querySelector(".playerPointsCurrent-0")
const playerCurrentScoreEl1 = document.querySelector(".playerPointsCurrent-1")
const newGame = document.querySelector(".new-game");
const rollDice = document.querySelector(".roll-dice");
const holdPoints = document.querySelector(".hold");
const diceImg = document.getElementById("diceImg");
const playerWontTxt0 = document.querySelector(".playerWon0");
const playerWontTxt1 = document.querySelector(".playerWon1");
const infoTextBox = document.querySelector(".info-box");
const infoTextBoxBtn = document.querySelector(".info-button");
const background = document.querySelector("body");

// Start conditions
payerTotalScoreEl0.textContent = 0;
payerTotalScoreEl1.textContent = 0;
let currentPlayer = 0;
let playerPointsCurrent0 = 0;
let playerPointsCurrent1 = 0;
let playerPointsTotal0 = 0;
let playerPointsTotal1 = 0;
let playerIsPlaying = true;


// Hiding Elements when website opened
diceImg.classList.add("hidden");
playerWontTxt0.classList.add("hidden");
playerWontTxt1.classList.add("hidden");
infoTextBox.classList.add("hidden");


// Changing player function and background of the current playing player
const changingPlayer = function () {
    currentPlayer === 0 ? currentPlayer = 1 : currentPlayer = 0;
}
const changingColor = function () {
    if (currentPlayer === 0) {
        document.querySelector(".player-box0").style.backgroundColor = "#ff7b5c"
        document.querySelector(".player-box1").style.backgroundColor = "#fab1a0"
    } else {
        document.querySelector(".player-box0").style.backgroundColor = "#fab1a0"
        document.querySelector(".player-box1").style.backgroundColor = "#ff7b5c"
    }
}

// Function for the information how to play this game
infoTextBoxBtn.addEventListener("click", function () {
    // Toggles the info box when button is clicked
    infoTextBox.classList.toggle("hidden");
})
// Function to close the InfoWindow if "ESC" key gets pressed
document.addEventListener("keydown", function () {
    infoTextBox.classList.add("hidden");
})

// Function roll the dice button
rollDice.addEventListener('click', function () {
    if (playerIsPlaying) {
        // Rolls a random number between one and six
        const randomNumber = Math.trunc(Math.random() * 6) + 1;
        // Displays the dice with the equal to the random number
        diceImg.classList.remove("hidden");
        diceImg.src = `../images/dice-${randomNumber}.png`;
        // If number smaller than 1 current score = 0
        if (randomNumber === 1) {
            // Resetting the current points of the player to zero
            currentPlayer === 0 ? playerPointsCurrent0 = 0 : playerPointsCurrent1 = 0;
            // Displaying the current points of zero to the player
            currentPlayer === 0 ? playerCurrentScoreEl0.textContent = 0 : playerCurrentScoreEl1.textContent = 0;
            // Change the player and the background of the of the current playing player
            changingColor();
            // Changing to the next player
            changingPlayer();
        }
        // Else current score = current score
        if (randomNumber > 1) {
            // Evaluating the current points to the current player
            currentPlayer === 0 ? playerPointsCurrent0 += randomNumber : playerPointsCurrent1 += randomNumber;
            // Displaying the correct number to the players interface
            currentPlayer === 0 ? playerCurrentScoreEl0.textContent = playerPointsCurrent0
                : playerCurrentScoreEl1.textContent = playerPointsCurrent1
        }
    }
})

// Function to Hold the current points
holdPoints.addEventListener('click', function () {
    if (playerIsPlaying) {
        // Checking player0 or player1 is playing and adding current points to total points
        currentPlayer === 0 ? playerPointsTotal0 += playerPointsCurrent0 : playerPointsTotal1 += playerPointsCurrent1;
        // Displaying the total score
        currentPlayer === 0 ? payerTotalScoreEl0.textContent = playerPointsTotal0
            : payerTotalScoreEl1.textContent = playerPointsTotal1;
        // Resetting the current points
        playerPointsCurrent0 = 0;
        playerPointsCurrent1 = 0;
        // Displaying the current score
        currentPlayer === 0 ? playerCurrentScoreEl0.textContent = playerPointsCurrent0
            : playerCurrentScoreEl1.textContent = playerPointsCurrent1;
        // If current points more than 100 then the players win
        //need to add after win players cant play anymore
        if (playerPointsTotal0 > 99 || playerPointsTotal1 > 99) {
            playerIsPlaying = false;
            document.querySelector(`.player-box${currentPlayer}`).style.backgroundColor = "#191e1e"
            document.querySelector(`.playerWon${currentPlayer}`).classList.remove("hidden");
        } else {
            // Changing color
            changingColor();
            // Changing player
            changingPlayer();
        }
    }
})

// Function for the button for a now game
newGame.addEventListener("click", function () {

    // Resetting all values
    payerTotalScoreEl0.textContent = 0;
    payerTotalScoreEl1.textContent = 0;
    //Making sure the player which lost can roll now at first
    changingColor();
    changingPlayer();
    playerPointsCurrent0 = 0;
    playerPointsCurrent1 = 0;
    playerPointsTotal0 = 0;
    playerPointsTotal1 = 0;
    diceImg.classList.add("hidden");
    playerWontTxt0.classList.add("hidden");
    playerWontTxt1.classList.add("hidden");
    playerIsPlaying = true;
})