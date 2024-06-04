
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `task ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <span>${task.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
            <button class="complete-btn">${task.completed ? 'Uncomplete' : 'Complete'}</button>
        `;
        taskList.appendChild(taskItem);


        taskItem.querySelector('.edit-btn').addEventListener('click', () => {
            const taskText = prompt('Edit task:', task.text);
            if (taskText) {
                tasks[index].text = taskText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
            }
        });

        taskItem.querySelector('.delete-btn').addEventListener('click', () => {
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });

        taskItem.querySelector('.complete-btn').addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        });
    });
}


addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        renderTasks();
    }
});

// Render tasks on page load
renderTasks();
