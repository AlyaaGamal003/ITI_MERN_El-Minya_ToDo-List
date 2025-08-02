function addTask() {
  const input = document.getElementById("new-task");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const taskItem = createTaskItem(taskText);
  document.getElementById("todo-list").appendChild(taskItem);
  input.value = "";
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
      span.textContent = newText.trim();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => li.remove();

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "toggle finish";
  toggleBtn.textContent = "Finish";

  toggleBtn.onclick = () => {
    li.classList.toggle("finished");

    if (li.classList.contains("finished")) {
      document.getElementById("finished-list").appendChild(li);
      toggleBtn.textContent = "Undo";
      toggleBtn.className = "toggle undo";
    } else {
      document.getElementById("todo-list").appendChild(li);
      toggleBtn.textContent = "Finish";
      toggleBtn.className = "toggle finish";
    }
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  actions.appendChild(toggleBtn);

  li.appendChild(span);
  li.appendChild(actions);

  return li;
}
