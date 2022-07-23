const showPassword = document.querySelector(".password-input span");
const passwordInput = document.querySelector("input[type='password']");

showPassword.addEventListener("click", () => {
  if (showPassword.innerText === "show") {
    showPassword.innerText = "hide";
    passwordInput.type = "text";
  } else {
    showPassword.innerText = "show";
    passwordInput.type = "password";
  }
});
