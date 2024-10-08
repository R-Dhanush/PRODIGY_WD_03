document.addEventListener("DOMContentLoaded", function () {
    const fullscreenIcon = document.getElementById("fullscreen-toggle");
    const cells = document.querySelectorAll(".cell");
    const playHumanBtn = document.getElementById("play-human");
    const playAIBtn = document.getElementById("play-ai");
    const playerInfo = document.getElementById("player-info");
    const setupScreen = document.getElementById("setup");
    const startGameBtn = document.getElementById("start-game");
    const gameInfo = document.getElementById("game-info");
    const gameBoard = document.getElementById("game-board");
    const currentPlayerDisplay = document.getElementById("current-player");
    const resetGameBtn = document.getElementById("reset-game");
    const homeButton = document.getElementById("home-button");
    const winnerMessage = document.getElementById("winner-message");
    const buttonContainer2 = document.getElementById("button-container2");
    const winSound = document.getElementById("win-sound");
    const clickSound = document.getElementById("click-sound");

    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];
    let gameMode = "";
    let isGameActive = true;
    let player1Name = "";
    let player2Name = "";

    fullscreenIcon.addEventListener("click", function () {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fullscreenIcon.classList.remove("fa-expand");
            fullscreenIcon.classList.add("fa-compress");
            fullscreenIcon.title = "Exit Full Screen";
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                fullscreenIcon.classList.remove("fa-compress");
                fullscreenIcon.classList.add("fa-expand");
                fullscreenIcon.title = "Fullscreen";
            }
        }
    });

    document.addEventListener("fullscreenchange", function () {
        if (!document.fullscreenElement) {
            fullscreenIcon.classList.remove("fa-compress");
            fullscreenIcon.classList.add("fa-expand");
            fullscreenIcon.title = "Fullscreen";
        }
    });

    playHumanBtn.addEventListener("click", function () {
        gameMode = "human";
        playerInfo.style.display = "flex";
        setupScreen.style.display = "none";
        document.getElementById("player1").style.display = "flex";
        document.getElementById("player2").style.display = "flex";
        resetNames();
        resetGame();
    });

    playAIBtn.addEventListener("click", function () {
        gameMode = "ai";
        playerInfo.style.display = "flex";
        setupScreen.style.display = "none";
        document.getElementById("player1").style.display = "flex";
        document.getElementById("player2").style.display = "none";
        document.getElementById("player1").placeholder = "Enter Your Name";
        resetNames();
        resetGame();
    });

    startGameBtn.addEventListener("click", function () {
        player1Name = document.getElementById("player1").value || "Player 1";
        if (gameMode === "human") {
            player2Name = document.getElementById("player2").value || "Player 2";
        } else {
            player2Name = "AI";
        }
        playerInfo.style.display = "none";
        gameInfo.style.display = "flex";
        buttonContainer2.style.display = "none"; 
        startGame();
    });

    resetGameBtn.addEventListener("click", resetGame);
    homeButton.addEventListener("click", resetToHome);

    cells.forEach((cell) => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });

    function startGame() {
        currentPlayerDisplay.textContent = `${player1Name} (X)`;
        currentPlayer = "X";
        boardState = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        updateBoard();
    }

    function handleCellClick(cell) {
        const index = cell.getAttribute("data-index");

        if (boardState[index] !== "" || !isGameActive) {
            return;
        }

        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        clickSound.play();

        if (checkWin()) {
            endGame(`${currentPlayer === "X" ? player1Name : player2Name} Wins!`, true);
        } else if (boardState.every((cell) => cell !== "")) {
            endGame("It's a Draw!", false);
        } else {
            switchPlayer();
            if (gameMode === "ai" && currentPlayer === "O") {
                aiMove();
            }
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        const playerName = currentPlayer === "X" ? player1Name : player2Name;
        currentPlayerDisplay.textContent = `${playerName} (${currentPlayer})`;
    }

    function aiMove() {
        if (!isGameActive) return;
    
        const getEmptyCells = () => {
            return boardState
                .map((value, index) => (value === "" ? index : null))
                .filter((val) => val !== null);
        };
    
        const checkWinOrBlock = (player) => {
            const winningCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], 
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]  
            ];
    
            for (let combo of winningCombos) {
                const [a, b, c] = combo;
                if (boardState[a] === player && boardState[b] === player && boardState[c] === "") {
                    return c;
                }
                if (boardState[a] === player && boardState[c] === player && boardState[b] === "") {
                    return b;
                }
                if (boardState[b] === player && boardState[c] === player && boardState[a] === "") {
                    return a;
                }
            }
            return null;
        };
    
        const findBestMove = () => {
            const winningMove = checkWinOrBlock('O');
            if (winningMove !== null) return winningMove;
    
            const blockingMove = checkWinOrBlock('X');
            if (blockingMove !== null) return blockingMove;
    
            const emptyCells = getEmptyCells();
            return emptyCells[Math.floor(Math.random() * emptyCells.length)];
        };
    
        const bestMove = findBestMove();
    
        if (bestMove !== null) {
            setTimeout(() => {
                boardState[bestMove] = 'O';
                document.querySelector(`.cell[data-index='${bestMove}']`).textContent = 'O';
                if (checkWin()) {
                    endGame("AI Wins!", true);
                } else if (boardState.every((cell) => cell !== "")) {
                    endGame("It's a Draw!", false);
                } else {
                    switchPlayer();
                }
            }, 500);
        }
    }    

    function checkWin() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombos.some((combo) => {
            const [a, b, c] = combo;
            return (
                boardState[a] &&
                boardState[a] === boardState[b] &&
                boardState[a] === boardState[c]
            );
        });
    }

    function endGame(message, isWin) {
        isGameActive = false;
        winnerMessage.textContent = message;
        buttonContainer2.style.display = "flex";
        if (isWin) {
            winSound.play();

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }

    function resetGame() {
        boardState = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;
        winnerMessage.textContent = "";
        cells.forEach((cell) => (cell.textContent = ""));
        buttonContainer2.style.display = "none";
        startGame();
    }

    function resetToHome() {
        setupScreen.style.display = "flex";
        gameInfo.style.display = "none";
        playerInfo.style.display = "none";
        resetGame();
    }

    function resetNames() {
        document.getElementById("player1").value = "";
        document.getElementById("player2").value = "";
        player1Name = "Player 1";
        player2Name = gameMode === "human" ? "Player 2" : "AI";
    }

    function updateBoard() {
        cells.forEach((cell, index) => {
            cell.textContent = boardState[index];
        });
    }
});
