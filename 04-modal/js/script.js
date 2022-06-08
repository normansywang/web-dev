const confirmMsg = document.querySelector("#confirmMsg");
const overlay = document.querySelector("#overlay");
const codeInputs = document.querySelectorAll(".code-input input");
const verifyBtn = document.querySelector("#verifyBtn");
const verifyMsg = document.querySelector("#verify-message");

function showConfirmMsg() {
  const classes = confirmMsg.classList;
  if (!classes.contains("show")) {
    classes.add("show");
  }
}

function hideConfirmMsg() {
  const classes = confirmMsg.classList;
  if (classes.contains("show")) {
    classes.remove("show");
  }
}

function showModal() {
  hideConfirmMsg();
  hideVerifyMsg();
  resetInputs();
  const classes = overlay.classList;
  if (!classes.contains("show")) {
    classes.add("show");
  }
}

function dismissModal() {
  const classes = overlay.classList;
  if (classes.contains("show")) {
    classes.remove("show");
  }
}

function showVerifyMsg() {
  const classes = verifyMsg.classList;
  if (!classes.contains("show")) {
    classes.add("show");
  }
}

function hideVerifyMsg() {
  const classes = verifyMsg.classList;
  if (classes.contains("show")) {
    classes.remove("show");
  }
}

function resetInputs() {
  codeInputs.forEach((input) => {
    input.value = "";
  });
}

document.querySelector("#showModalBtn").addEventListener("click", showModal);
document.querySelector(".close").addEventListener("click", dismissModal);

window.onclick = (e) => {
  if (e.target == overlay) {
    dismissModal();
  }
};
codeInputs.forEach((input) => {
  input.addEventListener("keyup", (e) => {
    const currentElement = document.querySelector(`#${e.target.id}`);
    const nextSiblingElement = currentElement.nextElementSibling;
    const prevSiblingElement = currentElement.previousElementSibling;

    // console.log(e);

    if (e.key.toLowerCase() === " ") {
      currentElement.value = "";
      return;
    }

    if (e.key.toLowerCase() === "backspace") {
      if (!prevSiblingElement) return;

      console.log(prevSiblingElement.value);
      prevSiblingElement.value = "";
      prevSiblingElement.focus();
      return;
    }

    if (nextSiblingElement) {
      nextSiblingElement.focus();
    } else {
      currentElement.blur();
    }
  });
});

document.querySelector("#verification-form").onsubmit = (e) => {
  e.preventDefault();

  let verifyResult = true;
  for (const code of codeInputs) {
    if (code.value === "") {
      verifyResult = false;
    }
  }
  if (!verifyResult) {
    showVerifyMsg();
    return;
  }

  verifyBtn.innerHTML = "Verifying";
  verifyBtn.setAttribute("disabled", "");

  setTimeout(() => {
    verifyBtn.innerHTML = "Verify";
    verifyBtn.removeAttribute("disabled");
    dismissModal();
    showConfirmMsg();
  }, 1000);
};
