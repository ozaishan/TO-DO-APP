const taskList = [];

// Add a new task
function addTask(task) {
    const trimmed = task.trim();
    if (trimmed) {
        taskList.push(trimmed);
        updateTaskDisplay();
    }
}

// Delete a task by index
function deleteTask(index) {
    if (index > -1 && index < taskList.length) {
        taskList.splice(index, 1);
        updateTaskDisplay();
    }
}

// Render the task list
function updateTaskDisplay() {
    const ul = document.getElementById('taskList');
    ul.innerHTML = '';
    taskList.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;
        ul.appendChild(li);
    });

    // Attach delete event listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-index'));
            deleteTask(idx);
        });
    });
}

// Add task on button click
document.getElementById('addTaskButton').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    addTask(taskInput.value);
    taskInput.value = '';
    taskInput.focus();
});

// Add task on Enter key
document.getElementById('taskInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const taskInput = document.getElementById('taskInput');
        addTask(taskInput.value);
        taskInput.value = '';
        taskInput.focus();
    }
});


// --- Tic Tac Toe Logic with Emojis ---
const boardElem = document.getElementById('ticTacToeBoard');
const statusElem = document.getElementById('ticTacToeStatus');
const resetBtn = document.getElementById('ticTacToeReset');
const PLAYER_X = '❌';
const PLAYER_O = '⭕';
let board, currentPlayer, gameActive;

function initTicTacToe() {
    board = Array(9).fill('');
    currentPlayer = PLAYER_X;
    gameActive = true;
    renderBoard();
    setStatus(`Player ${currentPlayer}'s turn`);
}

function renderBoard() {
    boardElem.innerHTML = '';
    board.forEach((cell, idx) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        cellDiv.textContent = cell;
        cellDiv.addEventListener('click', () => handleCellClick(idx));
        boardElem.appendChild(cellDiv);
    });
}

function handleCellClick(idx) {
    if (!gameActive || board[idx]) return;
    board[idx] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        setStatus(`🎉 Player ${currentPlayer} wins!`);
        gameActive = false;
    } else if (board.every(cell => cell)) {
        setStatus("It's a draw!");
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        setStatus(`Player ${currentPlayer}'s turn`);
    }
}

function setStatus(msg) {
    statusElem.textContent = msg;
}

function checkWinner() {
    const wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return wins.some(line =>
        board[line[0]] &&
        board[line[0]] === board[line[1]] &&
        board[line[1]] === board[line[2]]
    );
}

resetBtn.addEventListener('click', initTicTacToe);

initTicTacToe();