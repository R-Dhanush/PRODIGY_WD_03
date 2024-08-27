document.addEventListener("DOMContentLoaded", function() {
    const fullscreenIcon = document.getElementById("fullscreen-toggle");
    const cells = document.querySelectorAll(".cell");
    const playHumanBtn = document.getElementById("play-human");
    const playAIBtn = document.getElementById("play-ai");
    const playerInfo = document.getElementById("player-info");
    const setupScreen = document.getElementById("setup");
    const startGameBtn = document.getElementById("start-game");
    const gameBoard = document.getElementById("game-board");
    const currentPlayerDisplay = document.getElementById("current-player");
    const resetGameBtn = document.getElementById("reset-game");
    const homeButton = document.getElementById("home-button");
    const winnerMessage = document.getElementById("winner-message");
  
    let currentPlayer = "X";
    let boardState = ["", "", "", "", "", "", "", "", ""];
    let gameMode = ""; // 'human' or 'ai'
    let isGameActive = true;

    // Function to toggle the fullscreen
    fullscreenIcon.addEventListener("click", function() {
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

    document.addEventListener("fullscreenchange", function() {
        if (!document.fullscreenElement) {
            fullscreenIcon.classList.remove("fa-compress");
            fullscreenIcon.classList.add("fa-expand");
            fullscreenIcon.title = "Fullscreen";
        }
    });

    document.getElementById("play-human").addEventListener("click", function() {
        document.getElementById("player-info").style.display = "flex";
        document.getElementById("setup").style.display = "none";
        document.getElementById("player1").style.display = "flex";
        document.getElementById("player2").style.display = "flex";
    });
    
    document.getElementById("play-ai").addEventListener("click", function() {
        document.getElementById("player-info").style.display = "flex";
        document.getElementById("setup").style.display = "none";
        document.getElementById("player1").style.display = "flex";
        document.getElementById("player2").style.display = "none";
        document.getElementById("player1").placeholder = "Enter Your Name";
    });
    
    document.getElementById("start-game").addEventListener("click", function() {
        document.getElementById("player-info").style.display = "none";
        document.getElementById("game-info").style.display = "flex";
    });

});

