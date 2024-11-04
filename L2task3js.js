let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskName = taskInput.value.trim();

    if (taskName === "") return;

    const task = {
        id: Date.now(),
        name: taskName,
        addedTime: new Date().toLocaleString()
    };

    pendingTasks.push(task);
    taskInput.value = "";
    renderTasks();
}

function markComplete(taskId) {
    const taskIndex = pendingTasks.findIndex(task => task.id === taskId);
    const task = pendingTasks.splice(taskIndex, 1)[0];
    task.completedTime = new Date().toLocaleString();
    completedTasks.push(task);
    renderTasks();
}

function deleteTask(taskId, isCompleted) {
    if (isCompleted) {
        completedTasks = completedTasks.filter(task => task.id !== taskId);
    } else {
        pendingTasks = pendingTasks.filter(task => task.id !== taskId);
    }
    renderTasks();
}

function renderTasks() {
    const pendingList = document.getElementById('pending-tasks-list');
    const completedList = document.getElementById('completed-tasks-list');

    pendingList.innerHTML = '';
    completedList.innerHTML = '';

    pendingTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.name} <br><span class="time-stamp">Added: ${task.addedTime}</span></span>
            <button class="complete-btn" onclick="markComplete(${task.id})">Complete</button>
            <button onclick="deleteTask(${task.id}, false)">Delete</button>
        `;
        pendingList.appendChild(taskItem);
    });

    completedTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${task.name} <br><span class="time-stamp">Completed: ${task.completedTime}</span></span>
            <button onclick="deleteTask(${task.id}, true)">Delete</button>
        `;
        completedList.appendChild(taskItem);
    });
}
