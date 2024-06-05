 document.addEventListener("DOMContentLoaded", () => {
     const multiplayerBtn = document.getElementById("multiplayer-btn");
     const singleplayerBtn = document.getElementById("singleplayer-btn");
     const closeBtn = document.getElementById("close-btn");
     const gameBoard = document.getElementById("game-board");
     const message = document.getElementById("message");
     const cells = document.querySelectorAll(".cell");

     let currentPlayer = "X";
     let winner = false;
     let gameMode = "";

     multiplayerBtn.addEventListener("click", () => startGame("multiplayer"));
     singleplayerBtn.addEventListener("click", () => startGame("singleplayer"));
     closeBtn.addEventListener("click", closeGame);
     cells.forEach(cell => cell.addEventListener("click", handleCellClick));

    function startGame(mode) {
        gameMode = mode;
        currentPlayer = "X";
        winner = false;
        message.textContent = `Player ${currentPlayer}'s turn`;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.backgroundColor = "";
        });
        document.querySelector(".frame").classList.add("hidden");
        gameBoard.classList.remove("hidden");
    }

    function closeGame() {
        gameBoard.classList.add("hidden");
        document.querySelector(".frame").classList.remove("hidden");
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (event.target.textContent === "" && !winner) {
            event.target.textContent = currentPlayer;
            checkWinner();
            if (!winner) {
                togglePlayer();
                if (gameMode === "singleplayer" && currentPlayer === "O") {
                    aiMove();
                }
            }
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (cells[a].textContent === cells[b].textContent &&
                cells[b].textContent === cells[c].textContent &&
                cells[a].textContent !== "") {
                cells[a].style.backgroundColor = cells[b].style.backgroundColor = cells[c].style.backgroundColor = "green";
                message.textContent = `Player ${cells[a].textContent} WINS!`;
                winner = true;
                return;
            }
        }

        if ([...cells].every(cell => cell.textContent !== "") && !winner) {
            message.textContent = "It's a DRAW!";
            winner = true;
        }
    }

    function aiMove() {
        const availableMoves = [...cells].filter(cell => cell.textContent === "");
        if (availableMoves.length > 0) {
            const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
            randomMove.textContent = "O";
            checkWinner();
            if (!winner) {
                togglePlayer();
            }
        }
    }
 });




 