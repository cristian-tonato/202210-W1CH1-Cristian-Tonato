class Calculator {
    constructor(previousNumberText, actualNumberText) {
        this.previousNumberText = previousNumberText;
        this.actualNumberText = actualNumberText;
        this.clearAllContent();
    }

    clearAllContent() {
        this.previousNumber = "";
        this.actualNumber = "";
        this.operation = undefined;
    }

    deleteContent() {
        this.actualNumber = this.actualNumber.toString().slice(0, -1);
    }

    showNumber(number) {
        if (number === "," && this.actualNumber.toString().includes(",")) {
            return;
        }

        if (this.actualNumber.toString() === "0" && number != ",") {
            this.actualNumber = number.toString();
        } else {
            this.actualNumber =
                this.actualNumber.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.actualNumber === "") {
            return;
        }
        if (this.previousNumber != "") {
            this.calculate();
        } else {
            this.operation = operation;
            this.previousNumber = this.actualNumber;
            this.actualNumber = "";
        }
    }

    calculate() {
        let result;
        let previous;
        let actual;

        console.log(this.previousNumber);

        if (this.previousNumber.toString().includes(",")) {
            previous = parseFloat(
                this.previousNumber.toString().replace(",", ".")
            );
        } else {
            previous = parseFloat(this.previousNumber);
        }

        if (this.actualNumber.toString().includes(",")) {
            actual = parseFloat(this.actualNumber.toString().replace(",", "."));
        } else {
            actual = parseFloat(this.actualNumber);
        }

        if (isNaN(previous) || isNaN(actual)) {
            return;
        }

        switch (this.operation) {
            case "+":
                result = previous + actual;
                break;
            case "-":
                result = previous - actual;
                break;
            case "×":
                result = previous * actual;
                break;
            case "÷":
                result = previous / actual;
                break;
            default:
                return;
        }

        if (result.toString().includes(".")) {
            result = result.toString().replace(".", ",");
        }

        this.operation = undefined;
        this.previousNumber = "";
        this.actualNumber = result;
    }

    updateDisplay() {
        this.actualNumberText.innerText = this.actualNumber;
        if (this.operation != null) {
            this.previousNumberText.innerText = `${this.previousNumber} ${this.operation}`;
        } else {
            this.previousNumberText.innerText = "";
        }
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const previousNumberText = document.querySelector("[data-previous-number]");
const actualNumberText = document.querySelector("[data-actual-number]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButtons = document.querySelector("[data-delete]");
const equalButton = document.querySelector("[data-equal]");

const calculator = new Calculator(previousNumberText, actualNumberText);

numberButtons.forEach((button) => {
    console.log(button);
    button.addEventListener("click", () => {
        calculator.showNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach((button) => {
    console.log(button);
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalButton.addEventListener("click", (button) => {
    calculator.calculate();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
    calculator.clearAllContent();
    calculator.updateDisplay();
});

deleteButtons.addEventListener("click", (button) => {
    calculator.deleteContent();
    calculator.updateDisplay();
});
