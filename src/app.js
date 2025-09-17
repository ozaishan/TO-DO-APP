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