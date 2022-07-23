const editBtn = document.querySelector(".edit-btn");
const backBtn = document.querySelector(".back");
const changeInfoSection = document.querySelector(".change-info-section");
const personalInfoSection = document.querySelector(".personal-info");
const profilePhoto = document.querySelector(".profile-photo");
const dropDown = document.querySelector(".drop-down");

profilePhoto.addEventListener("click", () => {
  if (dropDown.classList.contains("show-drop-down")) {
    dropDown.classList.remove("show-drop-down");
    dropDown.classList.add("hide-drop-down");
  } else {
    dropDown.classList.remove("hide-drop-down");
    dropDown.classList.add("show-drop-down");
  }
});

editBtn.addEventListener("click", () => {
  personalInfoSection.classList.remove("show-personal-info");
  changeInfoSection.classList.add("show-info-section");
});

backBtn.addEventListener("click", () => {
  changeInfoSection.classList.remove("show-info-section");
  personalInfoSection.classList.add("show-personal-info");
});

const changePasswordField = document.querySelector("fieldset");
changePasswordField.addEventListener("click", (e) => {
  if (e.target.matches(".password-input span")) {
    if (e.target.innerText === "show") {
      e.target.innerText = "hide";
      e.target.previousElementSibling.type = "text";
    } else {
      e.target.innerText = "show";
      e.target.previousElementSibling.type = "password";
    }
  }
});

// const showPassword = document.querySelector(".password-input span");
// const passwordInput = document.querySelector("input[type='password']");

// showPassword.addEventListener("click", () => {
//     if(showPassword.innerText === "show") {
//         showPassword.innerText = "hide";
//         passwordInput.type = "text";
//     } else {
//         showPassword.innerText = "show";
//         passwordInput.type = "password";
//     }
// });
