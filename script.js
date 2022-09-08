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

    const current = calculator.currentValue;
    const previous = calculator.previousValue;
    const operand = calculator.operand;
    //-----------------------------------------------------------------------------------------
    //Early returns
    //handle with many zero at start
    if (current[0] === "0" && !current[1] && btn.value === "0") return;
    //handle with many dots
    if (btn.dataset.type === "decimal" && current.includes(".")) return;
    //if 1st number is empty operand button unavaliable
    if (!current && btn.dataset.type === "operand") return;
    //add zero before '.'
    if (btn.value === ".") calculator.currentValue = "0";
    //-----------------------------------------------------------------------------------------
    //if object properties filled and operand pressed calculate number
    //or calculate button pressed
    if (
      (current && previous && operand && btn.dataset.type === "operand") ||
      btn.id === "calculate"
    ) {
      calculator.currentValue = this.calculate(previous, current);
      calculator.previousValue = "";
      calculator.operand = btn.value;
    }
    //-----------------------------------------------------------------------------------------
    //handle with first number
    if (btn.dataset.type !== "operand") {
      input.value = btn.value;
      calculator.currentValue += btn.value;
      input.value = calculator.currentValue;
      readOnly.value += btn.value;
      log(calculator);
    }
    //handle with operand and second number
    if (btn.dataset.type === "operand") {
      calculator.previousValue = calculator.currentValue;
      calculator.operand = btn.value;
      readOnly.value += btn.value;
      input.value = calculator.previousValue;
      calculator.currentValue = "";
      log(calculator);
    }
    //-----------------------------------------------------------------------------------------
  }
  ontransition(event) {
    if (event.propertyName === "transform")
      this.element.classList.remove("pressed");
  }
  calculate(a, b) {
    return (+a + +b).toString();
  }
}

buttons.forEach((button) => {
  window[`btn${button.id}`] = new Button(button);
});

const calculator = {
  currentValue: "",
  previousValue: "",
  operand: "",
};
