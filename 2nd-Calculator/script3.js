const { log } = console;

const buttons = document.querySelectorAll(".btn");
const inputIn = document.querySelector("#input-in");
const inputOut = document.querySelector("#input-out");

class Caltulator {
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
  delete() {}
  appendNumber() {}
  chooseOperation(sign) {}
  process(str){
      let floatNum = parseFloat(str);
      let res = floatNum % 1 == 0 ? floatNum.toFixed(0) : floatNum.toFixed(1);
      return res;
  }
  compute(a, b) {
    switch (this.sign) {
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
      if(b==0) {
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
  updateDisplay() {
    this.inputTextElement.textContent = 123;
  }
}

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
    let previous = calculator.previous
    let current = calculator.current
    btn.classList.add("pressed");
    if (btn.dataset.type === "clear") {
      calculator.clear();
    }
    if (btn.dataset.type === "number") {
        // if (calculator.current && calculator.sign) {
        //   if(btn.dataset.type === 'del'){
        //     log('del')
        //   }
        //   calculator.previous += btn.textContent;
        //   calculator.inputOut.value += btn.textContent;
        //   calculator.inputIn.value = calculator.previous;
        //   log(calculator);
        // } else 
        
          if(calculator.finished) calculator.clear();

          calculator.current += btn.textContent;

          calculator.inputIn.value = "";
          calculator.inputOut.value += btn.textContent;
          calculator.inputIn.value = calculator.current;

          log(calculator);
        
    }
    if (btn.dataset.type === "sign") {
      if(calculator.current && calculator.sign && calculator.previous){

        calculator.finished = true;

        calculator.current = calculator.compute(calculator.previous, calculator.current);
        calculator.sign = '';
        calculator.previous=''
        
        calculator.inputIn.value = calculator.current;
        
        log(calculator)
      }else{
      if(!calculator.current||btn.textContent==='='||calculator.sign) return;
     
      calculator.finished = false;

      calculator.sign = btn.textContent;  


      calculator.inputIn.value = "";
      calculator.inputOut.value += btn.textContent;
      calculator.inputIn.value = calculator.current;  


      calculator.previous = calculator.current;
      calculator.current = ''

      log(calculator);
      }
    }
  }

  ontransition(event) {
    if (event.propertyName === "transform")
      this.element.classList.remove("pressed");
  }
}

const calculator = new Caltulator(inputIn, inputOut);
buttons.forEach((button) => {
  window[`btn${button.id}`] = new Button(button);
});
