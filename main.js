const add = (a, b) => {
  let ans = (a + b).toPrecision();
  if (ans.toString().length > 13) return Number(ans).toPrecision(13);
  else return ans;
};
const subtract = (a, b) => {
  let ans = (a - b).toPrecision();
  if (ans.toString().length > 13) return Number(ans).toPrecision(13);
  else return ans;
};
const multiply = (a, b) => {
  let ans = (a * b).toPrecision();
  if (ans.toString().length > 13) return Number(ans).toPrecision(13);
  else return ans;
};
const divide = (a, b) => {
  let ans = (a / b).toPrecision();
  if (ans.length > 13) return Number(ans).toPrecision(13);
  else return ans;
};

let cal = [];

function operate() {
  let fallback = 0;
  if (cal.length == 0) return;
  while (cal.length != 1) {
    while (cal.findIndex((x) => x === "/") != -1) {
      let i = cal.findIndex((x) => x === "/");
      cal[i] = divide(Number(cal[i - 1]), Number(cal[i + 1]));
      cal.splice(i + 1, 1);
      cal.splice(i - 1, 1);
    }
    while (cal.findIndex((x) => x === "x" || x === "X") != -1) {
      let i = cal.findIndex((x) => x === "x" || x === "X");
      cal[i] = multiply(Number(cal[i - 1]), Number(cal[i + 1]));
      cal.splice(i + 1, 1);
      cal.splice(i - 1, 1);
    }
    while (cal.findIndex((x) => x === "+") != -1) {
      let i = cal.findIndex((x) => x === "+");
      cal[i] = add(Number(cal[i - 1]), Number(cal[i + 1]));
      cal.splice(i + 1, 1);
      cal.splice(i - 1, 1);
    }
    while (cal.findIndex((x) => x === "-") != -1) {
      let i = cal.findIndex((x) => x === "-");
      cal[i] = subtract(Number(cal[i - 1]), Number(cal[i + 1]));
      cal.splice(i + 1, 1);
      cal.splice(i - 1, 1);
    }
    if (fallback++ == 1000) break;
  }
  displayLine2.innerText = `${cal.join("")}`;
  // console.log(cal);
  if (isNaN(cal[0])) {
    cal = [];
    displayLine1.innerText = "";
    displayLine2.innerText = "0";
  }
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function render() {
  clearElement(displayLine2);
}

const equals = document.querySelector(".equals");
const numbers = document.querySelectorAll(".numbers");
const displayLine1 = document.querySelector(".line1");
const displayLine2 = document.querySelector(".line2");
const clear = document.querySelector(".clear");
const del = document.querySelector(".delete");

let num = [];

function insertOperation(e) {
  displayLine1.innerText = "";
  if (e.match(/[\d\.]/)) {
    if (displayLine2.innerText == "0") render();
    num.push(e);
    if (
      String(num).match(/\./g) != null &&
      String(num).match(/\./g).length >= 2
    ) {
      num.pop();
      return;
    }
    let numb = num.join("");
    if (String(cal.at(-1)).match(/[\d\.]/)) cal.pop();
    cal.push(numb);
  } else if (cal.length != 0 && e != "=") {
    cal.push(e);
    num = [];
  }

  if (cal.length != 0 && e != "=") displayLine2.innerText = `${cal.join("")}`;
  // console.log(cal);
}

numbers.forEach((number) => {
  number.addEventListener("click", (e) => insertOperation(e.target.innerText));
});

function execute() {
  if (cal.length != 0) displayLine1.innerText = cal.join("") + "=";
  operate();
  num = [];
  num.push(Array.from(cal[0].toString()));
  num = num.flat();
}

equals.addEventListener("click", execute);

function clearOperation() {
  render();
  displayLine2.innerText = "0";
  displayLine1.innerText = "";
  cal = [];
  num = [];
}

clear.addEventListener("click", clearOperation);

function deleteOperation() {
  displayLine1.innerText = "";
  if (cal.at(-1) != "") {
    cal[cal.length - 1] = cal.at(-1).toString().slice(0, -1);
    num.pop();
    if (cal[cal.length - 1].length == 0) {
      cal.pop();
    }
  } else {
    cal.pop();
  }
  if(cal.length == 0) clearOperation();
  else displayLine2.innerText = `${cal.join("")}`;
}

del.addEventListener("click", deleteOperation);

document.addEventListener("keydown", (e) => {
  if (e.key.match(/[\d\.xX\/+-]/)) insertOperation(e.key);
  else if (e.key == "Enter" || e.key == "=") execute();
  else if (e.key == "Escape") clearOperation();
  else if (e.key == "Backspace") deleteOperation();
  else return;
});
