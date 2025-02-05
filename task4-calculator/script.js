document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("Input");
    const buttons = document.querySelectorAll("button");
    
    let currentInput = "";
    let lastOperator = false;
    let decimalUsed = false;

    function updateDisplay() {
        input.value = currentInput || "0";
    }

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");

            if (!value) return;

            if (value === "AC") {
                currentInput = "";
                lastOperator = false;
                decimalUsed = false;
            } else if (value === "Del") {
                currentInput = currentInput.slice(0, -1);
            } else if (value === "=") {
                try {
                    currentInput = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
                    let result = new Function("return " + currentInput)();
                    currentInput = result.toString();
                } catch {
                    currentInput = "Error";
                }
            } else if (["+", "-", "*", "/", "%"].includes(value)) {
                if (lastOperator) return; // Prevent consecutive operators
                currentInput += value;
                lastOperator = true;
                decimalUsed = false;
            } else if (value === ".") {
                if (decimalUsed) return; // Prevent duplicate decimal in one number
                currentInput += value;
                decimalUsed = true;
            } else {
                currentInput += value;
                lastOperator = false;
            }

            updateDisplay();
        });
    });

    updateDisplay();
});
