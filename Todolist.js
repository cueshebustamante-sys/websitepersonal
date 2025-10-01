// Elements
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const taskSchedule = document.getElementById('taskSchedule');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const titleCharCount = document.getElementById('titleCharCount');
const showDoneBtn = document.getElementById('showDoneBtn');
const doneBox = document.getElementById('doneBox');
const doneList = document.getElementById('doneList');

const deleteModal = document.getElementById('deleteModal');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');

const editModal = document.getElementById('editModal');
const editTaskTitle = document.getElementById('editTaskTitle');
const editTaskDescription = document.getElementById('editTaskDescription');
const editTaskSchedule = document.getElementById('editTaskSchedule');
const saveEdit = document.getElementById('saveEdit');
const cancelEdit = document.getElementById('cancelEdit');

let tasks = [];
let doneTasks = [];
let currentEditIndex = null;
let currentDeleteIndex = null;

const MAX_TITLE_LENGTH = 20;
const lettersRegex = /^[A-Za-z\s]+$/;

// Show Done Tasks toggle
showDoneBtn.addEventListener('click', () => {
  if (doneBox.style.display === 'flex') {
    doneBox.style.display = 'none';
    showDoneBtn.textContent = "Show Done Tasks";
  } else {
    doneBox.style.display = 'flex';
    showDoneBtn.textContent = "Hide Done Tasks";
    renderDoneTasks();
  }
});

// Add Task
addTaskBtn.addEventListener('click', () => {
  let title = taskTitle.value.trim();
  let description = taskDescription.value.trim();
  const schedule = taskSchedule.value;

  taskTitle.classList.remove('invalid');
  taskDescription.classList.remove('invalid');

  let valid = true;

  if (!title || !lettersRegex.test(title) || title.length > MAX_TITLE_LENGTH) {
    taskTitle.classList.add('invalid');
    valid = false;
  }

  if (description && !lettersRegex.test(description)) {
    taskDescription.classList.add('invalid');
    valid = false;
  }

  if (!valid) return alert(`Title must be letters only and up to ${MAX_TITLE_LENGTH} characters!`);

  title = title.toUpperCase();
  tasks.push({ title, description, schedule });
  renderTasks();

  taskTitle.value = '';
  taskDescription.value = '';
  taskSchedule.value = '';
  titleCharCount.textContent = `0 / ${MAX_TITLE_LENGTH}`;
});

// Render Tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((t, index) => {
    const li = document.createElement('li');
    li.className = 'task-card';
    li.innerHTML = `
      <div class="task-info">
        <div class="task-title">${t.title}</div>
        ${t.schedule ? `<div class="task-date">${t.schedule}</div>` : ''}
        <div class="task-note">${t.description || 'No description'}</div>
      </div>
      <div class="task-buttons">
        <button onclick="markDone(${index})">Done</button>
        <button onclick="openEditModal(${index})">Edit</button>
        <button onclick="openDeleteModal(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// Mark Task as Done
function markDone(index) {
  const doneTask = tasks.splice(index, 1)[0];
  doneTasks.push(doneTask);
  renderTasks();
  renderDoneTasks();
}

// Render Done Tasks
function renderDoneTasks() {
  doneList.innerHTML = '';
  doneTasks.forEach((t, index) => {
    const li = document.createElement('li');
    li.className = 'done-task-card';
    li.innerHTML = `
      <div class="done-task-info">
        <div class="task-title">${t.title}</div>
        ${t.schedule ? `<div class="task-date">${t.schedule}</div>` : ''}
        <div class="task-note">${t.description || 'No description'}</div>
      </div>
      <div class="done-buttons">
        <button onclick="removeDone(${index})">Remove</button>
      </div>
    `;
    doneList.appendChild(li);
  });
}

// Remove done task
function removeDone(index) {
  doneTasks.splice(index, 1);
  renderDoneTasks();
}

// Delete Modal
function openDeleteModal(index) {
  currentDeleteIndex = index;
  deleteModal.style.display = 'flex';
}

confirmDelete.addEventListener('click', () => {
  tasks.splice(currentDeleteIndex, 1);
  renderTasks();
  deleteModal.style.display = 'none';
});

cancelDelete.addEventListener('click', () => {
  deleteModal.style.display = 'none';
});

// Edit Modal
function openEditModal(index) {
  currentEditIndex = index;
  editTaskTitle.value = tasks[index].title;
  editTaskDescription.value = tasks[index].description;
  editTaskSchedule.value = tasks[index].schedule;
  editModal.style.display = 'flex';
}

saveEdit.addEventListener('click', () => {
  editTaskTitle.classList.remove('invalid');
  editTaskDescription.classList.remove('invalid');

  let valid = true;
  if (!editTaskTitle.value.trim() || !lettersRegex.test(editTaskTitle.value.trim()) || editTaskTitle.value.length > MAX_TITLE_LENGTH) {
    editTaskTitle.classList.add('invalid');
    valid = false;
  }

  if (editTaskDescription.value.trim() && !lettersRegex.test(editTaskDescription.value.trim())) {
    editTaskDescription.classList.add('invalid');
    valid = false;
  }

  if (!valid) return alert(`Title must be letters only and up to ${MAX_TITLE_LENGTH} characters!`);

  tasks[currentEditIndex].title = editTaskTitle.value.trim().toUpperCase();
  tasks[currentEditIndex].description = editTaskDescription.value;
  tasks[currentEditIndex].schedule = editTaskSchedule.value;
  renderTasks();
  editModal.style.display = 'none';
});

cancelEdit.addEventListener('click', () => {
  editModal.style.display = 'none';
});

// Live validation & character count
taskTitle.addEventListener('input', () => {
  if (taskTitle.value.length > MAX_TITLE_LENGTH) taskTitle.value = taskTitle.value.slice(0, MAX_TITLE_LENGTH);
  titleCharCount.textContent = `${taskTitle.value.length} / ${MAX_TITLE_LENGTH}`;
  if (!lettersRegex.test(taskTitle.value.trim())) taskTitle.classList.add('invalid');
  else taskTitle.classList.remove('invalid');
});

taskDescription.addEventListener('input', () => {
  if (taskDescription.value.trim() && !lettersRegex.test(taskDescription.value.trim())) taskDescription.classList.add('invalid');
  else taskDescription.classList.remove('invalid');
});

// Close modals when clicking outside
window.addEventListener('click', e => {
  if (e.target === deleteModal) deleteModal.style.display = 'none';
  if (e.target === editModal) editModal.style.display = 'none';

  // Auto hide Done Tasks panel
  if (doneBox.style.display === 'flex' && !doneBox.contains(e.target) && e.target !== showDoneBtn) {
    doneBox.style.display = 'none';
    showDoneBtn.textContent = "Show Done Tasks";
  }
});
