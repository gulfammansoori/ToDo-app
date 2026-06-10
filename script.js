// select dom elements
const input = document.getElementById('todo-input');
const addbtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');

// try to load save todos from localStorage ( IF ANY)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    // SAVE current todos array to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// create a dom node for a todo object and append it to the list
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    // checkbox to toggle completed state
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        //  todo: visual feeback : strike -through when completed
        textSpan.style.textDecoration = todo.completed ? 'line-through' : "";
        saveTodos();
    });

    // text fo the todo
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 10px';
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
    // add double-click event lister to edit the todo text
    textSpan.addEventListener("dblclick", () => {
        const newText = prompt("Edit todo:", todo.text);
        if (newText !== null) {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    // delete tdo button
    const delbtn = document.createElement('button');
    delbtn.textContent = 'Delete';
    delbtn.addEventListener("click", () => {
        todos.splice(index, 1);
        render();

        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delbtn);
    return li;
}



//  render the whole todo list form todos array
function render() {
    list.innerHTML = '';

    // recreate each item
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        console.log(node, todo);
        list.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return;
    }

    // Push a new todo object to the todos array
    todos.push({ text, completed: false });
    input.value = '';
    render();
    saveTodos();
}

addbtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
render();