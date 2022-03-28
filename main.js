/*
    fixes needed:
        - limit to 17 characters to fit on display area, or expan display area to height = fit-content
*/

// ===================
// Object Constructors
// ===================

// Calculator
function Calculator(){
    let currentValue = 0      // store the current running total value
    let inProgressValue = ''  // store the value of the numbers currently being entered
    let displayValue = ''     // store the value to display on screen
    let lastOperator = ''     // store the last operator button pressed
    // this.display = document.querySelector(".results").innerHTML

    // ==========
    // operations
    // ==========

    // When a number button is pressed
    this.numbers = function(value){
        // if the a button is pressed right after = is pressed, clear all
        if(lastOperator == "="){
            this.clearAll()
        }

        // prevent multiple zeros from being entered when no other value is entered
        if(!(value == "0" && inProgressValue == 0)){
            
            // prevent multiple decimal points
            if(!(inProgressValue.includes(".") && value == ".")){

                // Update current "inProgressValue" and the display
                inProgressValue += value
                displayValue = inProgressValue
                document.querySelector(".results").innerHTML = displayValue
            }
        } 
    },

    // When an operator button is pressed
    this.operations = function(operator){
        // check if this is the first operation
        if(lastOperator === ''){
            // set current value to value entered and store operator for next calculation.
            // display the results
            currentValue = +inProgressValue
            inProgressValue = ''
            lastOperator = operator
            displayValue = currentValue
            document.querySelector(".results").innerHTML = displayValue
            // console.log(`operator: ${operator}\ncurrentValue: ${this.currentValue}\ninProgressValue: ${this.inProgressValue}\nlastOperator: ${this.lastOperator}\ndisplayValue: ${this.displayValue}`)
        } else{
            // Handle each operator function
            switch(lastOperator){
                case "+":
                    currentValue += +inProgressValue
                    break
                case "-":
                    currentValue -= +inProgressValue
                    break
                case "X":
                    currentValue *= +inProgressValue
                    break
                case "/":
                    currentValue /= +inProgressValue
                    break
                case "=":
                    // prevent clearing the screen when "=" is entered repeatedly
                    if(!(currentValue == 0 && lastOperator == '') && !(lastOperator == '=')){
                        currentValue += +inProgressValue
                        console.log(currentValue, inProgressValue)
                    }
                    break
            }
            // reset properies accordingly and display results
            inProgressValue = ''
            lastOperator = operator
            displayValue = currentValue
            document.querySelector(".results").innerHTML = displayValue
        }
    },

    // When the clear button is pressed
    this.clearAll = function(){
        // Reset all properties to base value
        currentValue = 0
        inProgressValue = ''
        displayValue = ''
        lastOperator = ''
        document.querySelector(".results").innerHTML = 0
    }
}

// ===============
// Object Creation
// ===============

const myCalc = new Calculator()

// ===============
// Event Listeners
// ===============

// number buttons
document.querySelectorAll(".num").forEach(element => {
    element.addEventListener('click', function(){
        myCalc.numbers(element.innerHTML)
    })
})

// operator buttons
document.querySelectorAll(".ops").forEach(element => {
    element.addEventListener('click', function(){
        myCalc.operations(element.innerHTML)
    })
})

// clear button
document.querySelectorAll(".clearBtn").forEach(element => {
    element.addEventListener('click', function(){
        myCalc.clearAll(element.innerHTML)
    })
})
