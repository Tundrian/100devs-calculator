/*
    fixes needed:
        - limit to 17 characters to fit on display area, or expan display area to height = fit-content
*/

// ===================
// Object Constructors
// ===================

// Calculator
function Calculator(){
    this.currentValue = 0,      // store the current running total value
    this.inProgressValue = '',  // store the value of the numbers currently being entered
    this.displayValue = '',     // store the value to display on screen
    this.lastOperator = '',     // store the last operator button pressed
    // this.display = document.querySelector(".results").innerHTML

    // ==========
    // operations
    // ==========

    // When a number button is pressed
    this.numbers = function(value){
        // if the a button is pressed right after = is pressed, clear all
        if(this.lastOperator == "="){
            this.clearAll()
        }

        // prevent multiple zeros from being entered when no other value is entered
        if(!(value == "0" && this.inProgressValue == 0)){
            
            // prevent multiple decimal points
            if(!(this.inProgressValue.includes(".") && value == ".")){

                // Update current "inProgressValue" and the display to
                this.inProgressValue += value
                this.displayValue = this.inProgressValue
                document.querySelector(".results").innerHTML = this.displayValue
            }
        } 
    },

    // When an operator button is pressed
    this.operations = function(operator){
        // check if this is the first operation
        if(this.lastOperator === ''){
            // set current value to value entered and store operator for next calculation.
            // display the results
            this.currentValue = +this.inProgressValue
            this.inProgressValue = ''
            this.lastOperator = operator
            this.displayValue = this.currentValue
            document.querySelector(".results").innerHTML = this.displayValue
            // console.log(`operator: ${operator}\ncurrentValue: ${this.currentValue}\ninProgressValue: ${this.inProgressValue}\nlastOperator: ${this.lastOperator}\ndisplayValue: ${this.displayValue}`)
        } else{
            // Handle each operator function
            switch(this.lastOperator){
                case "+":
                    this.currentValue += +this.inProgressValue
                    break
                case "-":
                    this.currentValue -= +this.inProgressValue
                    break
                case "X":
                    this.currentValue *= +this.inProgressValue
                    break
                case "/":
                    this.currentValue /= +this.inProgressValue
                    break
                case "=":
                    // prevent clearing the screen when "=" is entered repeatedly
                    if(!(this.currentValue == 0 && this.lastOperator == '') && !(this.lastOperator == '=')){
                        this.currentValue += +this.inProgressValue
                        console.log(this.currentValue, this.inProgressValue)
                    }
                    break
            }
            // reset properies accordingly and display results
            this.inProgressValue = ''
            this.lastOperator = operator
            this.displayValue = this.currentValue
            document.querySelector(".results").innerHTML = this.displayValue
        }
    },

    // When the clear button is pressed
    this.clearAll = function(){
        // Reset all properties to base value
        this.currentValue = 0
        this.inProgressValue = ''
        this.displayValue = ''
        this.lastOperator = ''
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
