// Page toggles
function showLogin() {
  document.getElementById("signup").classList.add("hidden");
  document.getElementById("login").classList.remove("hidden");
}

function showSignUp() {
  document.getElementById("login").classList.add("hidden");
  document.getElementById("signup").classList.remove("hidden");
}

// Toggle password visibility
function togglePassword(inputId, icon) {
  const input = document.getElementById(inputId);
  if (input.type === "password") {
    input.type = "text";
    icon.src = "eye-off.png";
  } else {
    input.type = "password";
    icon.src = "eye.png";
  }
}

// Password validation
function isValidPassword(password) {
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
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const remember = document.getElementById("remember-me").checked;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let user = users.find(u => u.username === username && u.password === password);

  if (user) {
    if (remember) {
      localStorage.setItem("rememberedUser", username);
    } else {
      localStorage.removeItem("rememberedUser");
    }
    document.getElementById("login").classList.add("hidden");
    document.getElementById("calculator-page").classList.remove("hidden");
  } else {
    alert("Invalid credentials.");
  }
}

// Auto-fill remembered user
window.onload = function() {
  const rememberedUser = localStorage.getItem("rememberedUser");
  if (rememberedUser) {
    document.getElementById("login-username").value = rememberedUser;
    document.getElementById("remember-me").checked = true;
  }
};

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
