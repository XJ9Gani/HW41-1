const todos = [
  {
    id: 1,
    title: "Buy groceries",
    status: false,
    description: "Milk, bread, cheese",
  },
  {
    id: 2,
    title: "Walk the dog",
    status: true,
    description: "Walk in the park",
  },
  {
    id: 3,
    title: "Do laundry",
    status: false,
    description: "Wash and fold clothes",
  },
  {
    id: 4,
    title: "Clean the house",
    status: true,
    description: "Vacuum and dust",
  },
  {
    id: 5,
    title: "Prepare presentation",
    status: false,
    description: "For next week's meeting",
  },
  {
    id: 6,
    title: "Read a book",
    status: true,
    description: "Finish the current book",
  },
  {
    id: 7,
    title: "Fix the sink",
    status: false,
    description: "Leaking pipe in the kitchen",
  },
  {
    id: 8,
    title: "Buy birthday gift",
    status: true,
    description: "Gift for a friend's birthday",
  },
  {
    id: 9,
    title: "Exercise",
    status: false,
    description: "Go for a run or gym",
  },
  {
    id: 10,
    title: "Call mom",
    status: true,
    description: "Check in and catch up",
  },
  {
    id: 11,
    title: "Finish report",
    status: false,
    description: "Submit by end of the day",
  },
  {
    id: 12,
    title: "Plan vacation",
    status: false,
    description: "Research and book flights",
  },
  {
    id: 13,
    title: "Update resume",
    status: true,
    description: "Add recent work experience",
  },
  {
    id: 14,
    title: "Organize desk",
    status: false,
    description: "Tidy up workspace",
  },
  {
    id: 15,
    title: "Prepare dinner",
    status: true,
    description: "Cook a healthy meal",
  },
  {
    id: 16,
    title: "Schedule dentist appointment",
    status: false,
    description: "Routine check-up",
  },
  {
    id: 17,
    title: "Send emails",
    status: true,
    description: "Respond to work emails",
  },
  {
    id: 18,
    title: "Buy new shoes",
    status: false,
    description: "For running and walking",
  },
  {
    id: 19,
    title: "Plan weekend trip",
    status: true,
    description: "Research destinations",
  },
  {
    id: 20,
    title: "Fix laptop issue",
    status: false,
    description: "Check with tech support",
  },
];

const simulateBackend = (response, delay = 2000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response);
    }, delay);
  });
};

const getAllTodos = () => simulateBackend({ status: 200, data: todos });

const getTodoById = (id) => {
  const todo = todos.find((t) => t.id === id);
  return simulateBackend(
    todo ? { status: 200, data: todo } : { status: 404, data: null }
  );
};

const addTodo = (newTodo) => {
  todos.push(newTodo);
  return simulateBackend({ status: 200, data: newTodo });
};

const updateTodoById = (id, updatedTodo) => {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return simulateBackend({ status: 404, data: null });

  todos[index] = { ...todos[index], ...updatedTodo };
  return simulateBackend({ status: 200, data: todos[index] });
};

const deleteTodoById = (id) => {
  const index = todos.findIndex((t) => t.id === id);
  if (index === -1) return simulateBackend({ status: 404, data: null });

  todos.splice(index, 1);
  return simulateBackend({ status: 200, data: null });
};

const allTodosButton = document.getElementById("showAll");
const getTaskByIdButton = document.getElementById("getTodoById");
const updateTaskByIdButton = document.getElementById("updateTodo");
const addTodoButton = document.getElementById("addTodo");
const deleteTodoButton = document.getElementById("deleteTodo");

const outputResult = document.querySelector(".outputResult");

allTodosButton.addEventListener("click", () => {
  getAllTodos().then((response) => {
    if (response.status === 200) {
      renderElem(response.data);
    }
  });
});

getTaskByIdButton.addEventListener("click", () => {
  const id = parseInt(document.querySelector(".todo-id").value);
  getTodoById(id).then((response) => {
    outputResult.innerHTML = "";
    if (response.status === 200) {
      addStyle(response.data.title, response.data.description);
    } else {
      outputResult.innerText = "Todo not found.";
    }
  });
});

updateTaskByIdButton.addEventListener("click", () => {
  const id = parseInt(document.querySelector(".todo-update-id").value);
  const newTitle = document.querySelector(".todo-new-title").value;
  const newDescription = document.querySelector(".todo-new-description").value;
  updateTodoById(id, { title: newTitle, description: newDescription }).then(
    (response) => {
      if (response.status === 200) {
        outputResult.innerHTML = "";
        addStyle(response.data.title, response.data.description);
      } else {
        outputResult.innerText = "Todo not found.";
      }
    }
  );
});

addTodoButton.addEventListener("click", () => {
  const id = todos.length + 1;
  const title = prompt("Enter todo title:");
  const description = prompt("Enter todo description:");
  const newTodo = { id, title, status: false, description };
  addTodo(newTodo).then((response) => {
    if (response.status === 200) {
      outputResult.innerHTML = "";
      addStyle(response.data.title, response.data.description);
    }
  });
});

deleteTodoButton.addEventListener("click", () => {
  const id = parseInt(document.querySelector(".todo-update-id").value);
  deleteTodoById(id).then((response) => {
    if (response.status === 200) {
      outputResult.innerHTML = "Todo deleted.";
    } else {
      outputResult.innerText = "Todo not found.";
    }
  });
});

function renderElem(tasks) {
  outputResult.innerHTML = "";
  tasks.forEach((element) => {
    addStyle(element.title, element.description);
  });
}

function addStyle(title, description) {
  let block = document.createElement("div");
  let block__title = document.createElement("h3");
  let block__desc = document.createElement("h4");
  block__title.innerText = title;
  block__desc.innerText = description;
  block.classList.add("block");
  block__title.classList.add("block__title");
  block__desc.classList.add("block__desc");
  block.append(block__title, block__desc);
  outputResult.append(block);
}
