const keys = document.querySelectorAll(".key");
const displayInput = document.querySelector(".display .input");
const displayOutput = document.querySelector(".display .output");


let input = "";



for (const key of keys) {
    const value = key.dataset.key;

    key.addEventListener('click', function () {
        if (value === "clear") {
            clear();
        } else if (value == "backspace") {
            input = input.slice(0, -1)
            displayInput.innerHTML = cleanInput(input)
        } else if (value === "=") {
            const result = eval(prepareInput(input))
            displayOutput.innerHTML = cleanOutput(result)
        }
        else if (value === "brackets") {
            appendBrackets(input)
        }
        else {
            appendValue(value)
        }
    })
}

function clear() {
    input = "";
    displayInput.innerHTML = "";
    displayOutput.innerHTML = "";
}

function appendValue(value) {
    if (validateInput(value)) {
        input += value;
        displayInput.innerHTML = cleanInput(input);
    }
}

function validateInput(value) {
    const operators = ["+", "-", "*", "/"];
    const lastInput = input.slice(-1)


    if (value === ".") {
        // Check if the last input is a dot or an operator
        if (lastInput === "." || operators.includes(lastInput)) {
            return false;
        }

        // Check if there is already a dot in the current number
        const parts = input.split(/[-+*/]/);
        const currentNumber = parts[parts.length - 1];
        if (currentNumber.includes(".")) {
            return false;
        }
    } else if (operators.includes(value)) {
        if (operators.includes(lastInput)) {
            return false;
        }
    }


    return true;
}

function cleanInput(input) {
    const inputArr = input.split("")

    for (let i = 0; i < inputArr.length; i++) {
        if (inputArr[i] == "*") {
            inputArr[i] = ` <span class="operator">x</span> `;
        } else if (inputArr[i] == "/") {
            inputArr[i] = ` <span class="operator">÷</span> `;
        } else if (inputArr[i] == "+") {
            inputArr[i] = ` <span class="operator">+</span> `;
        } else if (inputArr[i] == "-") {
            inputArr[i] = ` <span class="operator">-</span> `;
        } else if (inputArr[i] == "(") {
            inputArr[i] = `<span class="brackets">(</span>`;
        } else if (inputArr[i] == ")") {
            inputArr[i] = `<span class="brackets">)</span>`;
        } else if (inputArr[i] == "%") {
            inputArr[i] = `<span class="percent">%</span>`;
        }
    }

    return inputArr.join("");
}

function appendBrackets(input) {
    if (
        input.indexOf("(") == -1 ||
        input.indexOf("(") != -1 &&
        input.indexOf(")") != -1 &&
        input.lastIndexOf("(") < input.lastIndexOf(")")
    ) {
        input += "(";
    } else if (
        input.indexOf("(") != -1 &&
        input.indexOf(")") == -1 ||
        input.indexOf("(") != -1 &&
        input.indexOf(")") != -1 &&
        input.lastIndexOf("(") > input.lastIndexOf(")")
    ) {
        input += ")";
    }

    displayInput.innerHTML = cleanInput(input);
}

function prepareInput(input) {
    const inputArr = input.split("");

    for (let i = 0; i < inputArr.length; i++) {
        if (inputArr[i] == "%") {
            inputArr[i] = "/100";
        }
    }

    return inputArr.join("");
}

function cleanOutput(output) {
    let outputStr = output.toString();
    const decimal = outputStr.split(".")[1];
    outputStr = outputStr.split(".")[0];

    let outputArr = outputStr.split("");

    if (outputArr.length > 3) {
        for (let i = outputArr.length - 3; i > 0; i -= 3) {
            outputArr.splice(i, 0, ",");
        }
    }

    if (decimal) {
        outputArr.push(".");
        outputArr.push(decimal);
    }

    return outputArr.join("");
}