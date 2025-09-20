document.addEventListener('DOMContentLoaded', () => {
    const hey = document.getElementById('hey');
    const time = document.getElementById('time');
    const search = document.getElementById('search');
    const serc = document.getElementById('serc');
    const progres = document.getElementById('progres');
    const pshow = document.getElementById('pshow');
    const circular_progress = document.getElementById('circular-progress');
    const percentage = document.getElementById('percentage');
    const newTaskInput = document.getElementById('newTaskInput');
    const main = document.getElementById('main');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const usericon = document.getElementById('userIcon');
    const namePopover = document.getElementById('namePopover');
    const nameInput = document.getElementById('nameInput');
    const saveBtn = document.getElementById('saveNameBtn');

    percentage.textContent = '0%';
    hey.textContent = 'hey there!';
    newTaskInput.value = '';

    // Function to load the user's name from local storage
    function loadUsername() {
        const savedName = localStorage.getItem('username');
        if (savedName) {
            hey.textContent = `hey, ${savedName}`;
            nameInput.value = savedName;
        } else {
            hey.textContent = 'hey there!';
        }
    }
    loadUsername();

    // Function to update the progress
    function updateProgress() {
        const allTasks = main.querySelectorAll('.new-task');
        const completedTasks = main.querySelectorAll('.new-task .completed');

        const totalTasks = allTasks.length;
        const tasksDone = completedTasks.length;

        let currentPercentage = 0;
        if (totalTasks > 0) {
            currentPercentage = Math.round((tasksDone / totalTasks) * 100);
        }
        percentage.textContent = `${currentPercentage}%`;

        const progressAngle = currentPercentage * 3.6;
        circular_progress.style.background = `conic-gradient(rgb(94, 43, 94) ${progressAngle}deg, #502959 ${progressAngle}deg)`;
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        main.querySelectorAll('.new-task').forEach(task => {
            const taskText = task.querySelector('span').textContent;
            const isCompleted = task.querySelector('span').classList.contains('completed');
            tasks.push({ text: taskText, completed: isCompleted });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const newTaskDiv = document.createElement('div');
            newTaskDiv.classList.add('new-task');

            const taskTextSpan = document.createElement('span');
            taskTextSpan.textContent = task.text;
            if (task.completed) {
                taskTextSpan.classList.add('completed');
            }

            const checkIcon = document.createElement('i');
            checkIcon.classList.add('fa-solid', 'fa-circle-check');
            checkIcon.setAttribute('aria-hidden', 'true');
            checkIcon.style.color = 'lime';

            checkIcon.addEventListener('click', () => {
                taskTextSpan.classList.toggle('completed');
                updateProgress();
                saveTasks(); // Save tasks after toggling completion
            });

            const removeButton = document.createElement('i');
            removeButton.classList.add('fa-solid', 'fa-trash-can');
            removeButton.setAttribute('aria-hidden', 'true');

            removeButton.addEventListener('click', () => {
                if (confirm('Do you want to delete this task?')) { // Improved delete confirmation
                    newTaskDiv.remove();
                    updateProgress();
                    saveTasks(); // Save tasks after deletion
                }
            });

            newTaskDiv.appendChild(taskTextSpan);
            newTaskDiv.appendChild(checkIcon);
            newTaskDiv.appendChild(removeButton);
            main.appendChild(newTaskDiv);
        });
        updateProgress(); // Update progress after loading tasks
    }

    // Load tasks when the page loads
    loadTasks();

    // Event listener for the save button in the popover
    saveBtn.addEventListener('click', () => {
        const enteredName = nameInput.value.trim();
        if (enteredName) {
            localStorage.setItem('username', enteredName);
            hey.textContent = `hey, ${enteredName}`;
            namePopover.style.display = 'none';
        }
    });

    // Toggle popover visibility when the icon is clicked
    usericon.addEventListener('click', (event) => {
        namePopover.style.display = namePopover.style.display === 'flex' ? 'none' : 'flex';
        event.stopPropagation();
    });

    // Hide popover if clicked outside
    document.addEventListener('click', (event) => {
        if (!namePopover.contains(event.target) && event.target !== usericon) {
            namePopover.style.display = 'none';
        }
    });

    // Add task event listener
    addTaskBtn.addEventListener('click', () => {
        const newTaskValue = newTaskInput.value.trim();

        if (newTaskValue === '') {
            alert('Please enter a task!');
            return;
        }

        const newTaskDiv = document.createElement('div');
        newTaskDiv.classList.add('new-task');

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = newTaskValue;

        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-solid', 'fa-circle-check');
        checkIcon.setAttribute('aria-hidden', 'true');
        checkIcon.style.color = 'lime';

        checkIcon.addEventListener('click', () => {
            taskTextSpan.classList.toggle('completed');
            updateProgress();
            saveTasks(); // Save tasks after toggling completion
        });

        const removeButton = document.createElement('i');
        removeButton.classList.add('fa-solid', 'fa-trash-can');
        removeButton.setAttribute('aria-hidden', 'true');

        removeButton.addEventListener('click', () => {
            if (confirm('Do you want to delete this task?')) { // Improved delete confirmation
                newTaskDiv.remove();
                updateProgress();
                saveTasks(); // Save tasks after deletion
            }
        });

        newTaskDiv.appendChild(taskTextSpan);
        newTaskDiv.appendChild(checkIcon);
        newTaskDiv.appendChild(removeButton);
        main.appendChild(newTaskDiv);

        newTaskInput.value = '';
        updateProgress();
        saveTasks(); // Save tasks after adding a new task
    });

    // Search option
    serc.addEventListener('input', () => {
        const searchTerm = serc.value.toLowerCase();
        const tasks = main.querySelectorAll('.new-task');

        tasks.forEach(task => {
            const taskText = task.querySelector('span').textContent.toLowerCase();
            task.style.display = taskText.includes(searchTerm) ? 'flex' : 'none';
        });
    });
});
