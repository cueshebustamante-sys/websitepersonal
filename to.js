const taskInput = document.getElementById("taskInput"); 
const taskSchedule = document.getElementById("taskSchedule");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// ===== Delete Modal =====
const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");
let taskToDelete = null;

// ===== Edit Modal =====
const editModal = document.getElementById("editModal");
const editTaskInput = document.getElementById("editTaskInput");
const editTaskSchedule = document.getElementById("editTaskSchedule");
const saveEdit = document.getElementById("saveEdit");
const cancelEdit = document.getElementById("cancelEdit");
let taskToEdit = null;

// ===== Add Task =====
function addTask() {
  const taskText = taskInput.value.trim();
  const scheduleValue = taskSchedule.value;
  if (!taskText || !scheduleValue) return;

  const li = document.createElement("li");

  const header = document.createElement("div");
  header.className = "task-header";

  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "task-text";

  // ===== Double click to edit =====
  span.ondblclick = () => {
    taskToEdit = li;
    editTaskInput.value = span.textContent;
    editTaskSchedule.value = scheduleValue;
    editModal.style.display = "flex";
  };

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "task-buttons";

  const completeBtn = document.createElement("button");
  completeBtn.textContent = "✓";
  completeBtn.className = "complete-btn";
  completeBtn.onclick = () => li.classList.toggle("completed");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✗";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    taskToDelete = li;
    deleteModal.style.display = "flex";
  };

  buttonsDiv.appendChild(completeBtn);
  buttonsDiv.appendChild(deleteBtn);
  header.appendChild(span);
  header.appendChild(buttonsDiv);

  const schedule = document.createElement("div");
  schedule.className = "task-schedule";
  const date = new Date(scheduleValue);
  schedule.textContent = date.toLocaleString();

  li.dataset.schedule = scheduleValue;
  li.appendChild(header);
  li.appendChild(schedule);
  taskList.appendChild(li);

  taskInput.value = "";
  taskSchedule.value = "";
  taskInput.focus();
}

// ===== Delete Modal Actions =====
confirmDelete.onclick = () => {
  if (taskToDelete) taskToDelete.remove();
  deleteModal.style.display = "none";
  taskToDelete = null;
};
cancelDelete.onclick = () => {
  deleteModal.style.display = "none";
  taskToDelete = null;
};

// ===== Edit Modal Actions =====
saveEdit.onclick = () => {
  if (taskToEdit) {
    const newText = editTaskInput.value.trim();
    const newSchedule = editTaskSchedule.value;
    if (newText && newSchedule) {
      taskToEdit.querySelector(".task-text").textContent = newText;
      const date = new Date(newSchedule);
      taskToEdit.querySelector(".task-schedule").textContent = date.toLocaleString();
      taskToEdit.dataset.schedule = newSchedule;
    }
  }
  editModal.style.display = "none";
  taskToEdit = null;
};
cancelEdit.onclick = () => {
  editModal.style.display = "none";
  taskToEdit = null;
};

// ===== Event Listeners =====
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
taskSchedule.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
