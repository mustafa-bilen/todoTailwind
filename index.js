const input = document.querySelector("input");
const buttons = document.querySelector("button");
const delete_button = document.querySelectorAll(".bodyy")[0];
const ul = document.querySelector("ul");
const body = document.querySelector("body");

const addTodo = (e) => {
  const newTodo = input.value.trim();
  if (newTodo === "") {
    console.log("Başarısız");
  } else if (e.key === "Enter" || e.key === undefined) {
    console.log("Başarılı");
    addTodoUI(newTodo);
    setTodoLocalStorage(newTodo);
  }
};

const deleteTodo = (e) => {
  if (e.target.className === "fa-sharp fa-solid fa-trash p-2") {
    e.target.parentElement.parentElement.remove();
    deleteTodoStorage(e.target.parentElement.parentElement.textContent);
  }
};

const addTodoUI = (newTodo) => {
  const listItem = document.createElement("li");
  const pa = document.createElement("p");
  pa.className = "hover:scale-125 cursor-pointer";
  pa.innerHTML = '<i id="a" class="fa-sharp fa-solid fa-trash p-2"></i>';
  listItem.className =
    "border flex justify-between items-center w-full px-[1rem] min-h-[3rem] rounded-lg shadow-lg";
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(pa);

  ul.appendChild(listItem);
  input.focus();
  input.value = "";
};

// localStorage

const getTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
};

const setTodoLocalStorage = (newTodo) => {
  let todo = getTodos();
  todo.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todo));
};

const loadAllTodos = () => {
  let todos = getTodos();

  todos.forEach((todo) => {
    addTodoUI(todo);
  });
};

const deleteTodoStorage = (deleteTodo) => {
  let todos = getTodos();

  todos.forEach((todo, idx) => {
    if (todo === deleteTodo) {
      todos.splice(idx, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
};

document.addEventListener("DOMContentLoaded", loadAllTodos);
input.addEventListener("keyup", addTodo);
buttons.addEventListener("click", addTodo);
delete_button.addEventListener("click", deleteTodo);
