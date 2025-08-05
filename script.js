// Load tasks from localStorage on page load
window.onload = function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const taskItem = createTaskItem(task.text, task.isFinished);
    const targetList = task.isFinished ? "finished-list" : "todo-list";
    document.getElementById(targetList).appendChild(taskItem);
  });
};

function addTask() {
  const input = document.getElementById("new-task");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const taskItem = createTaskItem(taskText);
  document.getElementById("todo-list").appendChild(taskItem);
  input.value = "";
  saveTaskToLocalStorage(taskText, false);
  showNotification("Task added successfully!");
}

function createTaskItem(text, isFinished = false) {
  const li = document.createElement("li");
  li.className = isFinished ? "finished" : "";

  const span = document.createElement("span");
  span.textContent = text;

  const actions = document.createElement("div");
  actions.className = "task-actions";

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
      updateTaskInLocalStorage(span.textContent, newText.trim());
      span.textContent = newText.trim();
      showNotification("Task edited successfully!", "#ffbc4c");
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    deleteTaskFromLocalStorage(span.textContent);
    li.remove();
    showNotification("Task deleted successfully!", "#f44336");
  };

  const toggleBtn = document.createElement("button");
  toggleBtn.className = isFinished ? "toggle undo" : "toggle finish";
  toggleBtn.textContent = isFinished ? "Undo" : "Finish";

  toggleBtn.onclick = () => {
    li.classList.toggle("finished");

    const isNowFinished = li.classList.contains("finished");
    updateTaskStatusInLocalStorage(span.textContent, isNowFinished);

    if (isNowFinished) {
      document.getElementById("finished-list").appendChild(li);
      toggleBtn.textContent = "Undo";
      toggleBtn.className = "toggle undo";
      showNotification("Task finished successfully!", "#4caf50");
    } else {
      document.getElementById("todo-list").appendChild(li);
      toggleBtn.textContent = "Finish";
      toggleBtn.className = "toggle finish";
      showNotification("Task undo successfully!", "#607d8b");
    }
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  actions.appendChild(toggleBtn);

  li.appendChild(span);
  li.appendChild(actions);
  return li;
}
// Save a new task to localStorage
function saveTaskToLocalStorage(text, isFinished) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, isFinished });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Delete task from localStorage
function deleteTaskFromLocalStorage(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Update task text in localStorage
function updateTaskInLocalStorage(oldText, newText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task => {
    if (task.text === oldText) {
      return { ...task, text: newText };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update finished status in localStorage
function updateTaskStatusInLocalStorage(text, isFinished) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.map(task =>
    task.text === text ? { ...task, isFinished } : task
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Show notification
function showNotification(message, bgColor = "#4caf50") {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.style.backgroundColor = bgColor;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}