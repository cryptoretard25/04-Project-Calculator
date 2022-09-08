const { log } = console;

const buttons = document.querySelectorAll(".btn");
const container = document.querySelector(".btn-container");
const input = document.querySelector("#main-input");
const readOnly = document.querySelector("#storage-input");
let calculate = [];

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
    //if (input.value === "0") input.value = "";
    const current = calculator.currentValue;
    const previous = calculator.previousValue;
    const operand = calculator.operand;
    //-----------------------------------------------------------------------------------------
    if (current && previous && operand) {
      calculator.currentValue = this.calculate(previous, current);
    }
    if (!current && btn.dataset.type === "operand") {
      return;
    } else if (btn.dataset.type !== "operand") {
      calculator.currentValue += btn.value;
      log(calculator);
    }
    if (btn.dataset.type === "operand") {
      calculator.previousValue = calculator.currentValue;
      calculator.operand = btn.value;
      calculator.currentValue = "";
      log(calculator);
    }
    //-----------------------------------------------------------------------------------------
    // if (calculate.length < 2) {
    //   if (btn.dataset.type === "operand" && !input.value){ input.value = '0'; return};
    //   if (btn.dataset.type === "number"|| btn.dataset.type ==='decimal') {
    //     if(btn.dataset.type ==='decimal'&& input.value.includes('.')) return
    //     input.value += btn.value;
    //     readOnly.value += btn.value;
    //     container.dataset.type = btn.dataset.type;
    //   } else {
    //     calculate[0] = input.value;
    //     calculate[1] = btn.value;
    //     input.value = "";
    //     readOnly.value += btn.value;
    //     container.dataset.type = btn.dataset.type;
    //   }
    // } else {
    //   if (container.dataset.type === "operand" && btn.dataset.type === "operand") return;
    //   if (btn.dataset.type === "number" || btn.dataset.type === "decimal") {
    //     if (btn.dataset.type === "decimal" && input.value.includes(".")) return;
    //     if (input.value == calculate[0]) {
    //       input.value = "";
    //     }
    //     input.value += btn.value;
    //     readOnly.value += btn.value;
    //     container.dataset.type = btn.dataset.type;
    //   } else if (
    //     (container.dataset.type = "number" && btn.dataset.type === "operand")
    //   ) {
    //     calculate[2] = input.value;
    //     input.value = "";
    //     readOnly.value += btn.value;
    //     this.calculate(calculate[0], calculate[2]);
    //     calculate[1] = btn.value;
    //     input.value = calculate[0];
    //     container.dataset.type = "operand";
    //   }else if(btn.id === 'calculate'){
    //     calculate[2] = input.value;
    //     input.value = '';
    //     this.calculate(calculate[0], calculate[2]);
    //     input.value = calculate[0];
    //     readOnly.value = calculate[0];
    //     container.dataset.type = "number";
    //   }
    // }
    //-----------------------------------------------------------------------------------------
  }
  ontransition(event) {
    if (event.propertyName === "transform")
      this.element.classList.remove("pressed");
  }
  calculate(a, b) {
    return (a - b).toString();
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
