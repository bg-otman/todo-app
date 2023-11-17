// get any data(previous todolist) avalaible on the local-Storage
let todoData = JSON.parse(localStorage.getItem("saveTodo"));

// is there a previous todolist store it. if not, use this array as start
const todoList = todoData || [
  {
    name: "Hello World !",
    dueDate: "16-09-2023",
  },
];

renderTodoList();

function renderTodoList() {
  let todoListHtml = "";

  todoList.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject;
    const isChecked = todoObject.checked ? "checked" : ""; // Add this line to set the "checked" attribute

    const html = `
      <div class="container">
        <input class="js-check-box" type="checkbox" ${isChecked} data-index="${index}"/> <!-- Add data-index attribute -->
        <div>${name}</div>
        <div>${dueDate}</div>
        <button class="js-delete-button">Delete</button>
      </div>
    `;

    todoListHtml += html;
  });

  // dispaly todo on the page
  document.querySelector(".js-list-div").innerHTML = todoListHtml;

  // when click delete button, add click event-lisnter
  // to run deleteTodo function.
  // we used querySelectorAll to select every new delete button
  document
    .querySelectorAll(".js-delete-button")
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener("click", () => {
        deleteTodo(index);
      });
    });

  // Add event listeners to the checkboxes
  document.querySelectorAll(".js-check-box").forEach((checkBox) => {
    checkBox.addEventListener("change", (event) => {
      const index = event.target.getAttribute("data-index");
      toggleCheckBox(index);
    });
  });
}

function toggleCheckBox(index) {
  // Toggle the 'checked' property of the corresponding todo item
  todoList[index].checked = !todoList[index].checked;
  renderTodoList(); // Update the todo list display
  saveToLocalStorage(); // Save the updated todo list to localStorage
}

function addTodo() {
  const inputElement = document.querySelector(".js-input");
  const name = inputElement.value;

  const inputDateElem = document.querySelector(".js-input-date");
  const dueDate = inputDateElem.value;

  // add the todo name & date to todo list array
  todoList.push({ name, dueDate });

  // after add todo to the list, r-empty the input for another todo
  inputElement.value = "";

  renderTodoList();

  saveToLocalStorage();
}

// when click Add btn run addTodo function
document.querySelector(".js-add-todo-button").addEventListener("click", () => {
  addTodo();
});

function deleteTodo(index) {
  //delete current todo
  todoList.splice(index, 1);
  // update result on the page
  renderTodoList();
  // save the updated result to localStorage
  saveToLocalStorage();
}

function saveToLocalStorage() {
  localStorage.setItem("saveTodo", JSON.stringify(todoList));
}

// click enter to add todo to the list
function clickEnter() {
  if (event.key === "Enter") {
    addTodo();
  }
}
