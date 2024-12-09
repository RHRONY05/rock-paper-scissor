let button = document.querySelectorAll("button");
for (let btn of button) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
    });
}

let boxes = document.querySelectorAll(".box");

let rock = document.querySelector(".rock");
let paper = document.querySelector(".paper");
let scissor = document.querySelector(".scissor");

let msgContainer = document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");

let setScore = document.querySelector(".set-score");
let game = document.querySelector(".game-part");
let scoreCard = document.querySelector(".score-card");
let newBtn = document.querySelector(".new");
let resetBtn = document.querySelector(".reset-game");

let input = document.querySelector("#input");
let totalPoint = document.querySelector("#t-point");

let start = document.querySelector(".start-game");

let comPoint = document.querySelector("#computer");
let playerPoint = document.querySelector("#you");
let drawPoint = document.querySelector("#draw");
let message = document.querySelector("#message");

// Game variables
let compTurn;
let playerTurn;
let randomNum;
let totalTurn;
let play;
let draw = 0;
let player = 0;
let computer = 0;

// Generate random number between min and max
let randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

// Set computer's turn based on random number
function setComTurn() {
    randomNum = randomNumber(1, 4); // Random number 1, 2, or 3
    switch (randomNum) {
        case 1:
            compTurn = "rock";
            break;
        case 2:
            compTurn = "paper";
            break;
        case 3:
            compTurn = "scissor";
            break;
        default:
            break;
    }
    return compTurn;
}

// Display win message
let winMessage = () => {
    msgContainer.classList.remove("hide");
};

// Enable boxes for interaction
let enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
    msgContainer.classList.add("hide");
    message.innerHTML = "Your Turn: "
    // Reset game variables
    player = 0;
    computer = 0;
    draw = 0;
    totalTurn = 0;
    play = false;

    // Reset displayed scores
    totalPoint.innerText = 0;
    playerPoint.innerText = 0;
    comPoint.innerText = 0;
    drawPoint.innerText = 0;
    input.value = 0;

    // Reinitialize computer turn
    compTurn = setComTurn();
};

// Disable boxes after player's turn
let disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Handle player turn logic
function handlePlayerTurn(playerTurn) {
    compTurn = setComTurn();
    if (compTurn === playerTurn) {
        message.innerHTML = `${playerTurn.charAt(0).toUpperCase() + playerTurn.slice(1)} meets ${compTurn}, it's a draw`;
        draw++;
    } else if (
        (playerTurn === "rock" && compTurn === "scissor") ||
        (playerTurn === "paper" && compTurn === "rock") ||
        (playerTurn === "scissor" && compTurn === "paper")
    ) {
        message.innerHTML = `You Won! ${playerTurn.charAt(0).toUpperCase() + playerTurn.slice(1)} beats ${compTurn}`;
        player++;
    } else {
        message.innerHTML = `You lose! ${compTurn} beats your ${playerTurn}`;
        computer++;
    }

    // Update scores
    playerPoint.innerText = player;
    comPoint.innerText = computer;
    drawPoint.innerText = draw;
    totalTurn--;

    // Check for end of game
    if (totalTurn === 0) {
        if (player > computer) {
            msg.innerHTML = "You Won!";
        } else if (player === computer) {
            msg.innerHTML = "It's a Tie!";
        } else {
            msg.innerHTML = "You Lose!";
        }
        play = false;
        winMessage();
        disableBoxes();
    }
}

// Play game logic
function playGame() {
    // Remove existing event listeners
    rock.replaceWith(rock.cloneNode(true));
    paper.replaceWith(paper.cloneNode(true));
    scissor.replaceWith(scissor.cloneNode(true));

    // Re-fetch elements
    rock = document.querySelector(".rock");
    paper = document.querySelector(".paper");
    scissor = document.querySelector(".scissor");

    // Add event listeners for player's choice
    rock.addEventListener("click", () => {
        if (play) handlePlayerTurn("rock");
    });
    paper.addEventListener("click", () => {
        if (play) handlePlayerTurn("paper");
    });
    scissor.addEventListener("click", () => {
        if (play) handlePlayerTurn("scissor");
    });
}

// Start game
start.addEventListener("click", () => {
    compTurn = setComTurn();

    totalTurn = parseInt(input.value, 10);
    if (totalTurn > 0 && totalTurn <= 30) {
        totalPoint.innerText = totalTurn;
        play = true;

        // Reset scores and UI
        player = 0;
        computer = 0;
        draw = 0;
        playerPoint.innerText = player;
        comPoint.innerText = computer;
        drawPoint.innerText = draw;

        // Start the game logic
        playGame();
    } else {
        console.log("Invalid number of turns. Cannot start.");
    }
});

// Add listeners for reset and new game buttons
newBtn.addEventListener("click", enableBoxes);
resetBtn.addEventListener("click", enableBoxes);
