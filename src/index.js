import { getMessage } from "./modules/functions.js";

const form = document.querySelector("form");
const dobInputField = document.querySelector("#dob");
const checkBtn = document.querySelector("#check-btn");
const outputContainer = document.querySelector("#output-container");

form.addEventListener("submit", (e) => e.preventDefault());

checkBtn.addEventListener("click", (e) => {
  const dateOfBirth = dobInputField.value;
  if (dateOfBirth !== "") {
    const listOfDateElements = dateOfBirth.split("-");
    const date = {};
    date.day = Number(listOfDateElements[2]);
    date.month = Number(listOfDateElements[1]);
    date.year = Number(listOfDateElements[0]);
    outputContainer.innerText = "Checking...";
    setTimeout(() => {
      const message = getMessage(date);
      outputContainer.innerText = message;
    }, 1500);
  } else {
    outputContainer.innerText = "Please Enter valid date";
  }
});
