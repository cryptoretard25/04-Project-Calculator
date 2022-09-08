const { log } = console;

const buttons = document.querySelectorAll(".btn");
const container = document.querySelector(".btn-container");
const input = document.querySelector("#main-input");
const readOnly = document.querySelector("#storage-input");

class Button {
  constructor(element) {
    this.element = element;
    // binding this for object
    this.onclickHandler = this.onclick.bind(this);
    this.ontransitionHandler = this.ontransition.bind(this);

    this.element.addEventListener("click", this.onclickHandler);
    this.element.addEventListener("transitionend", this.ontransitionHandler);
  }

  onclick(event) {
    event.preventDefault();
    const btn = this.element;
    btn.classList.add("pressed");

    if (btn.dataset.type === "number") {
      if (calculator.result) {
        calculator.clear();
        log(calculator);
      } else {
        if (
          calculator.current[0] === "0" &&
          !calculator.current[1] &&
          btn.dataset.type === "number"
        ) {
          calculator.current = btn.value;
          input.value = calculator.current;
          readOnly.value += btn.value;
          log(calculator);
        } else {
          calculator.current += btn.value;
          input.value = calculator.current;
          readOnly.value += btn.value;
          log(calculator);
        }
      }
    }
    if (btn.dataset.type === "operand") {
      if (!calculator.operand && btn.id === "calculate") return;
      calculator.result = false;
      if (calculator.current && calculator.previous && calculator.operand) {
        calculator.current = calculator.calculate(
          calculator.previous,
          calculator.current
        );
        calculator.operand = "";
        calculator.result = true;
        input.value = calculator.current;
        log(calculator);
      } else if (calculator.current && !calculator.operand) {
        calculator.previous = calculator.current;
        calculator.operand = btn.value;
        input.value = calculator.previous;
        readOnly.value += btn.value;
        calculator.current = "";
        log(calculator);
      }
    }
    if (btn.dataset.type === "decimal") {
      if (calculator.result) {
        calculator.clear();
        log(calculator);
      } else {
        if (calculator.current.includes(".")) return;
        calculator.current += btn.value;
        input.value = calculator.current;
        readOnly.value += btn.value;
        log(calculator);
      }
    }
  }

  ontransition(event) {
    if (event.propertyName === "transform")
      this.element.classList.remove("pressed");
  }
}
buttons.forEach((button) => {
  window[`btn${button.id}`] = new Button(button);
});

const calculator = {
  current: "",
  previous: "",
  operand: "",
  result: false,
  calculate(a, b) {
    switch (this.operand) {
      //summ
      case "+":
        return (+a + +b).toString();
      //sub
      case "-":
        return (+a - +b).toString();
      //mul
      case "*":
        return (+a * +b).toString();
      //div
      case "/":
        return (+a / +b).toString();
      //percent
      case "%":
        return ((+a / 100) * +b).toString();
    }
  },
  clear() {
    this.current = "";
    this.previous = "";
    this.operand = "";
    input.value = "0";
    readOnly.value = "";
    this.result = false;
  },
};
