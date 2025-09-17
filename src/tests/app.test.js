const { JSDOM } = require('jsdom');

// We recommend installing an extension to run jest tests.


// Mock the DOM for updateTaskDisplay
let dom;
let document;
let addTask;
let taskList;

beforeEach(() => {
    // Setup a minimal DOM
    dom = new JSDOM(`
        <body>
            <ul id="taskList"></ul>
        </body>
    `);
    document = dom.window.document;
    global.document = document;

    // Reset taskList and re-import functions
    taskList = [];
    // Mock updateTaskDisplay to avoid DOM errors
    global.updateTaskDisplay = jest.fn();

    // Redefine addTask to use our local taskList and mock updateTaskDisplay
    addTask = function(task) {
        const trimmed = task.trim();
        if (trimmed) {
            taskList.push(trimmed);
            updateTaskDisplay();
        }
    };
});

afterEach(() => {
    jest.clearAllMocks();
    delete global.document;
    delete global.updateTaskDisplay;
});

describe('addTask', () => {
    test('adds a trimmed task to the list', () => {
        addTask('  Buy milk  ');
        expect(taskList).toEqual(['Buy milk']);
        expect(updateTaskDisplay).toHaveBeenCalled();
    });

    test('does not add an empty task', () => {
        addTask('   ');
        expect(taskList).toEqual([]);
        expect(updateTaskDisplay).not.toHaveBeenCalled();
    });

    test('does not add a task that is only whitespace', () => {
        addTask('\n\t  ');
        expect(taskList).toEqual([]);
        expect(updateTaskDisplay).not.toHaveBeenCalled();
    });

    test('adds multiple tasks correctly', () => {
        addTask('Task 1');
        addTask('Task 2');
        expect(taskList).toEqual(['Task 1', 'Task 2']);
        expect(updateTaskDisplay).toHaveBeenCalledTimes(2);
    });

    test('trims and adds a task with leading/trailing whitespace', () => {
        addTask('   Do homework   ');
        expect(taskList).toEqual(['Do homework']);
    });
});
describe('Tic Tac Toe', () => {
    let board, currentPlayer, gameActive;
 beforeEach(() => {
        board = Array(9).fill('');
        currentPlayer = '❌';
        gameActive = true;
    });

    function checkWinner(board) {
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

    test('no winner at start', () => {
        expect(checkWinner(board)).toBe(false);
    });

    test('detects a win', () => {
        board[0] = board[1] = board[2] = '❌';
        expect(checkWinner(board)).toBe(true);
    });

    test('detects a draw', () => {
        board = ['❌','⭕','❌','❌','⭕','❌','⭕','❌','⭕'];
        expect(checkWinner(board)).toBe(false);
        expect(board.every(cell => cell)).toBe(true);
    });
});