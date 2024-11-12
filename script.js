let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = false;
let vsComputer = false;

// Select DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const twoPlayerBtn = document.getElementById('twoPlayerBtn');
const computerBtn = document.getElementById('computerBtn');

// Event listeners for game mode selection
twoPlayerBtn.addEventListener('click', () => {
    vsComputer = false;
    startGame();
});
computerBtn.addEventListener('click', () => {
    vsComputer = true;
    startGame();
});

// Event listener for reset button
resetBtn.addEventListener('click', resetGame);

// Add click event for each cell
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = '');
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (board[index] === '' && gameActive) {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkResult();

        if (gameActive) {
            switchPlayer();
            if (vsComputer && currentPlayer === 'O') {
                setTimeout(computerMove, 500); // Delay for better UX
            }
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function computerMove() {
    const emptyCells = board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    checkResult();
    if (gameActive) switchPlayer();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusDisplay.textContent = 'Draw!';
        gameActive = false;
        return;
    }
}

function resetGame() {
    gameActive = false;
    statusDisplay.textContent = 'Choose a mode to start!';
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
}
