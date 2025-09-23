const taskInput = document.getElementById("taskInput"); 
const taskSchedule = document.getElementById("taskSchedule");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// ===== Modal Creation =====
const modal = document.createElement("div");
modal.id = "deleteModal";
modal.innerHTML = `
  <div class="modal-content">
    <p>Are you sure you want to delete this task?</p>
    <div class="modal-buttons">
      <button id="confirmDelete">Yes</button>
      <button id="cancelDelete">No</button>
    </div>
  </div>
`;
document.body.appendChild(modal);
let taskToDelete = null;

// ===== Add Task Function =====
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
    modal.style.display = "flex";
  };

  buttonsDiv.appendChild(completeBtn);
  buttonsDiv.appendChild(deleteBtn);
  header.appendChild(span);
  header.appendChild(buttonsDiv);

  const schedule = document.createElement("div");
  schedule.className = "task-schedule";
  const date = new Date(scheduleValue);
  schedule.textContent = date.toLocaleString();

  li.appendChild(header);
  li.appendChild(schedule);
  taskList.appendChild(li);

  taskInput.value = "";
  taskSchedule.value = "";
  taskInput.focus();
}

// ===== Modal Buttons =====
document.getElementById("confirmDelete").onclick = () => {
  if (taskToDelete) taskToDelete.remove();
  modal.style.display = "none";
  taskToDelete = null;
};

document.getElementById("cancelDelete").onclick = () => {
  modal.style.display = "none";
  taskToDelete = null;
};

// ===== Event Listeners =====
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
taskSchedule.addEventListener("keypress", (e) => { if (e.key === "Enter") addTask(); });
