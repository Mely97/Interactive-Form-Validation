const form = document.getElementById("myForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const showPasswordButton = document.querySelector(".show-password");

form.addEventListener("submit", function (event) {
  let hasError = false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Full Name Validation
  if (fullName.value.trim() === "") {
    setErrorFor(fullName, "Full Name cannot be empty");
    hasError = true;
  } else if (!/^[a-zA-Z\s]+$/.test(fullName.value.trim())) {
    setErrorFor(fullName, "Full Name can only contain letters and spaces");
    hasError = true;
  } else {
    setSuccessFor(fullName);
  }

  // Email Validation
  if (email.value.trim() === "") {
    setErrorFor(email, "Email cannot be empty");
    hasError = true;
  } else if (!emailRegex.test(email.value.trim())) {
    setErrorFor(email, "Invalid email format");
    hasError = true;
  } else {
    setSuccessFor(email);
  }

  // Password Validation
  if (password.value.trim() === "") {
    setErrorFor(password, "Password cannot be empty");
    hasError = true;
  } else if (password.value.length < 8) {
    setErrorFor(password, "Password must be at least 8 characters long");
    hasError = true;
  } else {
    setSuccessFor(password);
  }

  // Confirm Password Validation
  if (confirmPassword.value.trim() === "") {
    setErrorFor(confirmPassword, "Confirm Password cannot be empty");
    hasError = true;
  } else if (password.value !== confirmPassword.value) {
    setErrorFor(confirmPassword, "Passwords do not match");
    hasError = true;
  } else {
    setSuccessFor(confirmPassword);
  }

  if (hasError) {
    event.preventDefault();
  }
});

const inputs = document.querySelectorAll("input");

inputs.forEach((input) => {
  input.addEventListener("input", function () {
    const formControl = input.parentElement;
    const errorSpan = formControl.querySelector(".error-message");
    if (input.validity.valid) {
      errorSpan.innerText = "";
      formControl.classList.remove("error");
    } else {
      setErrorFor(input, getValidationMessage(input));
    }
  });
});

showPasswordButton.addEventListener("click", function () {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.textContent = type === "password" ? "Show" : "Hide";
});

function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const errorSpan = formControl.querySelector(".error-message");
  errorSpan.innerText = message;
  formControl.classList.add("error");
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  const errorSpan = formControl.querySelector(".error-message");
  errorSpan.innerText = "";
  formControl.classList.remove("error");
}

function getValidationMessage(input) {
  if (input.validity.valueMissing) {
    return `${input.name} is required`;
  }
  if (input.validity.typeMismatch) {
    return `Invalid ${input.name} format`;
  }
  if (input.validity.tooShort) {
    return `${input.name} must be at least ${input.minLength} characters long`;
  }
  if (input.validity.patternMismatch) {
    return `Invalid ${input.name} format`;
  }
}
