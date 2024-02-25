const date = new Date();
const inputBox = document.getElementById("input-box");
const todosSection = document.getElementById("todos");
let datetime = date.toLocaleDateString() + " @ " + date.toLocaleTimeString();
let todoArr = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [
      {
        title: "todo1",
        edit: false,
        date: datetime,
        completed: false,
      },
    ];

const addList = () => {
  todoArr.push({
    title: `${inputBox.value}`,
    edit: false,
    date: datetime,
    completed: false,
  });

  inputBox.value = "";
  updateTodoHtml("");
};

const updateTodoHtml = () => {
  const todoUl = document.getElementById("todo_container");
  todoUl && todoUl.remove();
  const todoContainer = document.createElement("ul");
  todoContainer.id = "todo_container";
  todoArr.map((item, index) => {
    item.id = index;
    const displayInput = item.edit
      ? `<input id='editing' onkeypress="observeKeys(event)" type="text" />`
      : `<p class="title">${item.title}</p>`;
    const displayChecked = item.completed
      ? `<input id="checkbox" type="checkbox" onclick="markComplete(${item.id})" checked />`
      : ` <input id="checkbox" type="checkbox" onclick="markComplete(${item.id})" />`;
    const displayEditBtn = !item.edit
      ? `<button onclick={editTodo(this.id)} id='${item.id}' ${
          item.completed ? "disabled" : ""
        } class="edit">
    <span class="material-symbols-outlined">edit</span>
    </button>`
      : `<button id="modify" onclick={modifyTodo(this.id)} id='${
          item.id
        }' class="done" ${item.completed ? "disabled" : ""}>
    <span class="material-symbols-outlined">done</span>
    </button>`;

    console.log(displayChecked, item.completed);
    todoContainer.innerHTML += `
    <li class="${item.completed ? "complete" : ""}">
      <div class="item_con"> 
        <div class="todo_content" onclick="markComplete(${item.id})">
          ${displayChecked}
          <div class="todo_texts">
            ${displayInput}
            <p class="date">${item.date}</p>
          </div>
        </div>
        <div class="buttons">
          ${displayEditBtn}
          <button onclick={deleteTodo(${
            item.id
          })} id='close${index}' class="close">
              <span class="material-symbols-outlined"> close </span>
          </button>
        </div>
      </div>
    </li>
    `;
  });
  localStorage.setItem("todos", JSON.stringify(todoArr));
  todosSection.appendChild(todoContainer);
};

const deleteTodo = (id) => {
  const modArr = todoArr.filter((item, index) => index != id);
  console.log(modArr);
  todoArr = modArr;
  updateTodoHtml();
};

const editTodo = (id) => {
  console.log("in here", id);
  todoArr.map((item) => {
    if (item.id == id) item.edit = true;
  });
  console.log("modarr", todoArr);
  updateTodoHtml();
};

const modifyTodo = (id) => {
  console.log("called");
  const text = document.getElementById("editing").value;
  todoArr.map((item) => {
    if (item.id == id) {
      item.title = text;
      item.edit = false;
      item.completed = false;
    }
  });
  updateTodoHtml();
};

const markComplete = (id) => {
  let editing = false;
  todoArr.map((item) => {
    if (item.edit) editing = true;
    if (item.id == id) {
      console.log(item);
      item.completed = !item.completed;
    }
  });
  !editing && updateTodoHtml();
};

// const observeKeys = (event) => {
//   console.log("observing")
//   if (event.key === "Enter") {
//     modifyTodo()
//   }
// }

document.getElementById("add_list").addEventListener("click", () => addList());
updateTodoHtml();
