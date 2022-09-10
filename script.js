const { log } = console;

const buttons = document.querySelectorAll(".btn");
const inputIn = document.querySelector("#input-in");
const inputOut = document.querySelector("#input-out");

class Calculator {
  constructor(inputIn, inputOut) {
    this.inputIn = inputIn;
    this.inputOut = inputOut;
    this.current = "";
    this.previous = "";
    this.sign = "";
    this.finished = false;
  }
  clear() {
    this.current = "";
    this.previous = "";
    this.sign = undefined;
    this.finished = false;
    this.inputOut.value = "";
    this.inputIn.value = 0;
  }
  delete() {
    if (this.current.length) {
      this.current = this.current.slice(0, -1);
      this.inputOut.value = this.inputOut.value.slice(0, -1);
      this.inputIn.value = this.current || 0;
    }
    if (this.finished) this.clear();
  }
  //if !current and sign pressed current==='0'
  appendZero() {
    if (!this.current && !this.previous && !this.sign) {
      this.inputOut.value += "0";
      this.current = "0";
    } else {
      return;
    }
  }
  chooseOperation(element) {
    this.finished = false;
    this.sign = element.textContent;
    this.previous = calculator.current;
    this.current = "";
  }
  updateDisplay(element) {
    this.inputIn.value = "";
    this.inputIn.value = this.current;
    this.inputOut.value += element.textContent;
  }
  processBugs(element) {
    const btnText = element.textContent;
    // add zero before dot if dot is the first character
    if (btnText === "." && !this.current) {
      this.current = "0";
      this.inputOut.value += "0";
    }
    // leading zeros '0000' '02' bug
    if (btnText !== "." && this.current[0] === "0" && !this.current[1]) {
      this.current = "";
      this.inputOut.value = this.inputOut.value.slice(0, -1);
    }
  }
  compute() {
    const a = this.previous;
    const b = this.current;
    const sign = this.sign;
    this.finished = true;
    this.sign = undefined;
    this.previous = "";
    switch (sign) {
      //summ
      case "+":
        return (+a + +b).toString();
      //sub
      case "-":
        return (+a - +b).toString();
      //mul
      case "×":
        return (+a * +b).toString();
      //div
      case "÷":
        if (b == 0) {
          this.current = "";
          this.previous = "";
          this.sign = undefined;
          this.finished = true;
          return "Cant divide by zero";
        }
        return (+a / +b).toString();
      //percent
      case "%":
        return ((+a / 100) * +b).toString();
    }
  }
}

class Button {
  constructor(element) {
    this.element = element;
    // binding this for object
    this.onclickHandler = this.onmouseclick.bind(this);
    this.ontransitionHandler = this.ontransition.bind(this);
    this.onkeydownHandler = this.onkeydown.bind(this);

    window.addEventListener("keydown", this.onkeydownHandler);
    this.element.addEventListener("click", this.onclickHandler);
    this.element.addEventListener("transitionend", this.ontransitionHandler);
  }
  //KEYBOARD SUPPORT
  onkeydown(event) {
    const btn = this.element;
    event.preventDefault();
    if (event.key === btn.value) {
      btn.click();
      btn.classList.add("pressed");
    }
  }
  //ONCLICK HANDLER
  onmouseclick(event) {
    event.preventDefault();
    const btn = this.element;

    //* CLEAR button logic
    if (btn.dataset.type === "clear") {
      calculator.clear();
    }
    //* DELETE button logic
    if (btn.dataset.type === "del") {
      calculator.delete();
    }
    //* NUMBER buttons logic
    if (btn.dataset.type === "number") {
      // printing more then one dot bug
      if (btn.textContent === "." && calculator.current.includes(".")) return;
      // process 
      calculator.processBugs(btn);
      // enter number
      if (calculator.finished) calculator.clear();
      calculator.current += btn.textContent;
      calculator.updateDisplay(btn);

      log(calculator);
    }
    //* OPERATOR button logic
    if (btn.dataset.type === "sign") {
      calculator.appendZero();
      //compute
      if (calculator.current && calculator.sign && calculator.previous) {
        calculator.current = calculator.compute();
        calculator.inputIn.value = calculator.current;

        log(calculator);
      } else {
        //choose operation
        if (!calculator.current || btn.textContent === "=" || calculator.sign)
          return;
        calculator.updateDisplay(btn);
        calculator.chooseOperation(btn);

        log(calculator);
      }
    }
  }

  ontransition(event) {
    if (event.propertyName !== "transform") return;
    this.element.classList.remove("pressed");
  }
}

const calculator = new Calculator(inputIn, inputOut);

buttons.forEach((button) => {
  window[`btn${button.id}`] = new Button(button);
});
