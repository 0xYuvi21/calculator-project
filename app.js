const display = document.getElementById("display");

/*to display the symbols*/
function showInDisplay(input) {
  display.value += input;
}

function clearDisplay() {
  display.value = "";
}

/* using match() which converts string to regex expressions using / ... / 
and splits the string into diff elements we need, and make it as a list */
/* Regex exp below: number(s), decimal point, decimal part (or) any math operator */
/* ? - allows decimal part iff there is number part or atleast a decimal point */
/* | - or exp (chooses either left or right exp */
function tokenizer(expression) {
  return expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
}

function infixToPostfix(tokens) {
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };
  let output = [];
  let stack = [];

  for (let token of tokens) {
    if (!isNaN(token)) {
      output.push(token);
    } else {
      while (
        stack.length &&
        precedence[stack[stack.length - 1]] >= precedence[token]
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }
  while (stack.length) {
    output.push(stack.pop());
  }

  return output;
}

function evalPostfix(postfix) {
  const stack = [];

  for (let element of postfix) {
    if (!isNaN(element)) {
      stack.push(parseFloat(element));/* have to convert the string to int */
    } else {
      const b = stack.pop();
      const a = stack.pop();

      if (element === "+") {
        stack.push(a + b);
      } else if (element === "-") {
        stack.push(a - b);
      } else if (element === "*") {
        stack.push(a * b);
      } else if (element=== "/") {
        stack.push(a / b);
      }
    }
  }
  console.log(stack);
  return stack[0];
}

function Solver(exp) {
  let listTokens = tokenizer(exp);
  let postfixRes = infixToPostfix(listTokens);
  let result = evalPostfix(postfixRes);
  return result;
}

function calculate() {
  try {
    
    const resultant = Solver(display.value);
    display.value = resultant;
  } catch {
    display.value = "Error";
    
    setTimeout(() => {
      clearDisplay();
    }, 1000);
  }
}
