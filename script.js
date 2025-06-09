document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    // Carregar tarefas salvas no Local Storage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = ''; // Limpa a lista antes de renderizar
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="actions">
                    <button data-index="${index}">Remover</button>
                </div>
            `;
            if (task.completed) {
                listItem.classList.add('completed');
            }

            // Marcar/Desmarcar tarefa ao clicar no texto
            const taskTextSpan = listItem.querySelector('span');
            taskTextSpan.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            // Remover tarefa
            const removeButton = listItem.querySelector('button');
            removeButton.addEventListener('click', (event) => {
                const taskIndex = event.target.dataset.index;
                tasks.splice(taskIndex, 1); // Remove 1 elemento a partir do índice
                saveTasks();
                renderTasks();
            });

            taskList.appendChild(listItem);
        });
    }

    // Adicionar nova tarefa
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim(); // .trim() remove espaços em branco extras

        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = ''; // Limpa o input
        } else {
            alert('Por favor, digite uma tarefa.');
        }
    });

    // Permitir adicionar tarefa com a tecla Enter
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTaskBtn.click(); // Simula o clique no botão
        }
    });

    // Renderizar as tarefas ao carregar a página
    renderTasks();
});