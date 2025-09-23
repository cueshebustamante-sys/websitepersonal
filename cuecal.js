// Page toggles
function showLogin() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}
function showSignUp() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("signup").classList.remove("hidden");
}

// Sign Up
function signUp() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;

  if (!username || !password) {
    alert("Fill in all fields");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.find(u => u.username === username)) {
    alert("User already exists");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  alert("Account created! Please log in.");
  showLogin();
}

// Login
function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.username === username && u.password === password);

  if (user) {
    document.getElementById("login").classList.add("hidden");
    document.getElementById("calculator-page").classList.remove("hidden");
  } else {
    alert("Invalid credentials");
  }
}

// Logout
function logout() {
  document.getElementById("calculator-page").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

// Calculator logic
let expression = "";

function press(value) {
  expression += value;
  document.getElementById("display").innerText = expression;
}

function calculate() {
  try {
    let result = eval(expression);
    document.getElementById("display").innerText = result;
    expression = result.toString();
  } catch {
    document.getElementById("display").innerText = "Error";
    expression = "";
  }
}

function clearDisplay() {
  expression = "";
  document.getElementById("display").innerText = "0";
}