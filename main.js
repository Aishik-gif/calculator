const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => (a * b);
const divide = (a, b) => (a / b).toPrecision();

let cal = [];

function operate() {
  if (cal.length == 0) return;
  while (cal.length != 1) {
    while (cal.findIndex((x) => x === "/") != -1) {
      let i = cal.findIndex((x) => x === "/");
      cal[i] = divide(Number(cal[i - 1]), Number(cal[i + 1]));
      cal.splice(i + 1, 1);
      cal.splice(i - 1, 1);
    }
    while (cal.findIndex((x) => x === "x") != -1) {
      let i = cal.findIndex((x) => x === "x");
      cal[i] = multiply(Number(cal[i - 1]), Number(cal[i + 1]));
      cal.splice(i + 1, 1);
      cal.splice(i - 1, 1);
    }
    while(cal.findIndex((x) => x === "+") != -1) {
      let i = cal.findIndex((x) => x === "+");
      cal[i] = add(Number(cal[i - 1]), Number(cal[i + 1]));
      cal.splice(i + 1, 1);
      cal.splice(i - 1, 1);
    }
    while(cal.findIndex((x) => x === "-") != -1) {
      let i = cal.findIndex((x) => x === "-");
      cal[i] = subtract(Number(cal[i - 1]), Number(cal[i + 1]));
      cal.splice(i + 1, 1);
      cal.splice(i - 1, 1);
    }
  }
  displayLine2.innerText = `${cal.join("")}`;
  // console.log(cal);
  if(isNaN(cal[0])) {
    cal = [];
    displayLine1.innerText = '';
    displayLine2.innerText = '0';
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
const del = document.querySelector('.delete');

let num = [];

numbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    displayLine1.innerText = '';
    if (e.target.innerText.match(/[\d\.]/)) {
      if (displayLine2.innerText == "0") render();
      num.push(e.target.innerText);
      if (String(num).match(/\./g) != null && String(num).match(/\./g).length >= 2) {num.pop(); return;};
      let numb = num.join("");
      if (String(cal.at(-1)).match(/\d/)) cal.pop();
      cal.push(numb);
    } else if (cal.length != 0 && e.target.innerText != "=") {
      cal.push(e.target.innerText);
      num = [];
    }

    if (cal.length != 0 && e.target.innerText != "=")
      displayLine2.innerText = `${cal.join("")}`;
    // console.log(cal);
  });
});

equals.addEventListener("click", () => {
  displayLine1.innerText = cal.join('')+'=';
  operate();
  num = [];
  num.push(Array.from(cal[0].toString()));
  num = num.flat();
});

clear.addEventListener('click', () => {
  render();
  displayLine2.innerText = '0';
  displayLine1.innerText = '';
  cal = []; num =[];
});

del.addEventListener('click', () => {
  displayLine1.innerText = '';
  if(cal.at(-1)!='')
  {
    cal[cal.length - 1] = cal.at(-1).toString().slice(0,-1);
    num.pop();
    if(cal[cal.length - 1].length == 0)
    {
      cal.pop();
    }
  }
  else {
    cal.pop();
  }
  displayLine2.innerText = `${cal.join('')}`;
});