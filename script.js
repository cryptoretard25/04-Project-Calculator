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
    if (calculator.currentValue[0] === "0" && !current[1] && btn.value === "0")
      return;
    //handle with many dots
    if (btn.dataset.type === "decimal" && current.includes(".")) return;
    //add zero before '.'
    if (btn.value === ".") calculator.currentValue = "0";

    if (!current && btn.dataset.type === "operand") return;
    //-----------------------------------------------------------------------------------------
    //if object properties filled and operand pressed calculate number
    //or calculate button pressed
    if (
      (current && previous && operand && btn.dataset.type === "operand") ||
      btn.id === "calculate"
    ) {
      calculator.currentValue = calculator.calculate(previous, current);
      calculator.previousValue = "";
      calculator.operand = btn.value;
      if(btn.id==='calculate') calculator.state = true;
    }
    //-----------------------------------------------------------------------------------------
    //handle with first number
    if (btn.dataset.type !== "operand") {
      if(calculator.state&&btn.id!== 'calculate'){
        calculator.clear();
        calculator.state = false;
      }
      calculator.currentValue += btn.value;
      input.value = calculator.currentValue;
      readOnly.value += btn.value;
      log(calculator);
    }
    //handle with operand and second number
    if (btn.dataset.type === "operand") {
      if(calculator.state){calculator.state = false}
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
}

buttons.forEach((button) => {
  window[`btn${button.id}`] = new Button(button);
});

const calculator = {
  currentValue: "",
  previousValue: "",
  operand: "",
  state:'',
  calculate(a, b) {
    switch (this.operand) {
      //summ
      case "+":
        return +a + +b;
      //sub
      case "-":
        return +a - +b;
      //mul
      case "*":
        return +a * +b;
      //div
      case "/":
        return +a / +b;
      //percent
      case "%":
        return (+a / 100) * +b;
    }
  },
  clear() {
    this.currentValue = "";
    this.previousValue = "";
    this.operand = "0";
    input.value = "0";
    readOnly.value = "";
    container.dataset.type = "";
  },
};
