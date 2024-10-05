/*// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el formulario, la lista de tareas y el campo de entrada
    const form = document.getElementById('task-form');  // El formulario donde se ingresa la tarea
    const taskList = document.getElementById('task-list');  // El campo de entrada de texto
    const taskInput = document.getElementById('task-input');  // La lista donde se mostrarán las tareas

    // Carga tareas del localStorage al iniciar la aplicación
    loadTasks();

    // Escucha el evento de envío del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        addTask(); // Llama a la función para agregar una tarea
    });

    // Función para agregar una tarea
    function addTask() {
        const taskText = taskInput.value.trim(); // Obtiene el texto de la tarea

        // Verifica que el campo de entrada no esté vacío
        if (taskText === '') {
            alert('Por favor, escribe una tarea.'); // Muestra un mensaje si está vacío
            return; // Sale de la función
        }

        // Crea un nuevo elemento <li> para la tarea
        const li = document.createElement('li');
        li.textContent = taskText; // Establece el texto de la tarea

        // Crea un botón de "Eliminar"
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar'; // Establece el texto del botón
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li); // Elimina la tarea de la lista
            saveTasks(); // Guarda la lista actualizada
        });

        // Añade un evento de clic para marcar la tarea como completada
        li.addEventListener('click', () => {
            li.classList.toggle('completed'); // Alterna la clase 'completed'
            saveTasks(); // Guarda la lista actualizada
        });

        li.appendChild(deleteButton); // Agrega el botón a la tarea
        taskList.appendChild(li); // Añade la tarea a la lista

        taskInput.value = ''; // Limpia el campo de entrada
        saveTasks(); // Guarda la lista actualizada
    }

    // Función para guardar tareas en localStorage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => {
            return {
                text: li.firstChild.textContent,
                completed: li.classList.contains('completed') // Verifica si está completada
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Guarda las tareas en localStorage
    }

    // Función para cargar tareas desde localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Obtiene las tareas
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text; // Establece el texto de la tarea
            if (task.completed) {
                li.classList.add('completed'); // Marca como completada si corresponde
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(li); // Elimina la tarea de la lista
                saveTasks(); // Guarda la lista actualizada
            });

            li.addEventListener('click', () => {
                li.classList.toggle('completed'); // Alterna la clase 'completed'
                saveTasks(); // Guarda la lista actualizada
            });

            li.appendChild(deleteButton); // Agrega el botón a la tarea
            taskList.appendChild(li); // Añade la tarea a la lista
        });
    }
});*/
// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const taskInput = document.getElementById('task-input');

    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask();
    });

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Por favor, escribe una tarea.');
            return;
        }

        // Crea un nuevo elemento <li> para la tarea
        const li = document.createElement('li');

        // Crea un checkbox para marcar la tarea
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox'; // Establece el tipo como checkbox
        checkbox.addEventListener('change', () => {
            li.classList.toggle('completed'); // Alterna la clase 'completed' al marcar/desmarcar
            saveTasks(); // Guarda la lista actualizada
        });

        li.appendChild(checkbox); // Añade el checkbox a la tarea
        li.appendChild(document.createTextNode(taskText)); // Añade el texto de la tarea

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(deleteButton); // Agrega el botón a la tarea
        taskList.appendChild(li); // Añade la tarea a la lista

        taskInput.value = '';
        saveTasks();
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => {
            return {
                text: li.childNodes[1].textContent, // Obtiene el texto de la tarea
                completed: li.classList.contains('completed') // Verifica si está completada
            };
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');

            // Crea un checkbox para la tarea
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox'; // Establece el tipo como checkbox
            checkbox.checked = task.completed; // Marca como completada si corresponde
            checkbox.addEventListener('change', () => {
                li.classList.toggle('completed'); // Alterna la clase 'completed' al marcar/desmarcar
                saveTasks(); // Guarda la lista actualizada
            });

            li.appendChild(checkbox); // Añade el checkbox a la tarea
            li.appendChild(document.createTextNode(task.text)); // Añade el texto de la tarea
            if (task.completed) {
                li.classList.add('completed'); // Marca como completada si corresponde
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(li);
                saveTasks();
            });

            li.appendChild(deleteButton); // Agrega el botón a la tarea
            taskList.appendChild(li); // Añade la tarea a la lista
        });
    }
});
