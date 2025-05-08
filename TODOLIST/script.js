let todos = JSON.parse(localStorage.getItem('todos')) || [];

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const addBtn = document.getElementById('add-btn');

function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) span.classList.add('completed');
    span.addEventListener('click', () => toggleComplete(index));

    const btnGroup = document.createElement('div');

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'btn btn-sm btn-warning me-2';
    editBtn.onclick = () => editTodo(index);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'btn btn-sm btn-danger';
    delBtn.onclick = () => deleteTodo(index);

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(btnGroup);
    todoList.appendChild(li);
  });

  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
  const text = todoInput.value.trim();
  if (text === '') return;
  todos.push({ text, completed: false });
  todoInput.value = '';
  renderTodos();
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}

function editTodo(index) {
  const newText = prompt('Edit task:', todos[index].text);
  if (newText !== null && newText.trim() !== '') {
    todos[index].text = newText.trim();
    renderTodos();
  }
}

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});

renderTodos();
