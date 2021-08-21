const todos = JSON.parse(localStorage.getItem("todos")) || [];
const todosElement = document.querySelector("ul");
const input = document.querySelector("input");
const form = document.querySelector("form");
const searchInput = document.querySelector("#searchInput");
 
function removeTodos(index) {
  todos.splice(index, 1);
  render();
  localStorage.setItem("todos", JSON.stringify(todos));
}

function completedTodos(index) {
  const prevState = todos[index].completed;
  todos[index].completed = !prevState;
  localStorage.setItem("todos", JSON.stringify(todos));
  render();
}

function render(_todos = todos) {
  let todosList = ""; 
  _todos.forEach((todo, i) => {
    todosList =
      todosList +
      `<li>
        ${todo.completed
        ? `<input type='checkbox' checked onclick='completedTodos(${i})' />`
        : `<input type='checkbox' onclick='completedTodos(${i})' />`
      }
        <span class=${todo.completed ? "line-strike" : ""}>${todo.title}</span>
        <button id ="remove" onclick="removeTodos(${i})"><i class="fas fa-trash"></i></button>
      </li>`;
  });

  todosElement.innerHTML = todosList;
}

render();

//add new todos
function addTodos(event) {
  event.preventDefault();

  const newTodos = input.value;
  if (newTodos != "") {
    todos.push({ title: newTodos, completed: false });
    render();
    input.value = "";

    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
form.addEventListener("submit", addTodos);
//search todos
const searchTodo = () => {
  const filtered = todos.filter( todo => {
      return todo.title.toLowerCase().includes(searchInput.value.toLowerCase());
  });
  render(filtered);
};
searchInput.addEventListener("keyup", searchTodo);
searchInput.addEventListener("keydown", searchTodo);
