// Page toggles
function showLogin() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function showSignUp() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("signup").classList.remove("hidden");
}

// Password validation function (LUDS-8)
function isValidPassword(password) {
  // At least 8 characters, 1 lowercase, 1 uppercase, 1 digit, 1 special character
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
}

// Sign Up
function signUp() {
  const username = document.getElementById("signup-username").value.trim();
  const passwordInput = document.getElementById("signup-password");
  const password = passwordInput.value;

  if (!username || !password) {
    alert("Fill in all fields");
    return;
  }

  if (!isValidPassword(password)) {
    alert("Password must be at least 8 characters long and include:\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character");
    passwordInput.classList.add("invalid");
    passwordInput.classList.remove("valid");
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
    alert("Invalid credentials. If you recently signed up, ensure your password meets the requirements.");
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

// Real-time password validation styling
const signupPasswordInput = document.getElementById("signup-password");
signupPasswordInput.addEventListener("input", function () {
  if (this.value === "") {
    this.classList.remove("valid", "invalid");
  } else if (isValidPassword(this.value)) {
    this.classList.add("valid");
    this.classList.remove("invalid");
  } else {
    this.classList.add("invalid");
    this.classList.remove("valid");
  }
});
