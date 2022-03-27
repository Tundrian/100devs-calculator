function Calculator(){
    this.currentValue = 0,
    this.inProgressValue = '',
    this.displayValue = '',
    this.lastOperator = '',
    // this.display = document.querySelector(".results").innerHTML

    // operations
    this.numbers = function(value){
        if(!(value == "0" && this.inProgressValue == 0)){
            if(!(this.inProgressValue.includes(".") && value == ".")){
                this.inProgressValue += value
                this.displayValue = this.inProgressValue
                document.querySelector(".results").innerHTML = this.displayValue
            }
        } 
    },

    this.operations = function(operator){
        if(this.lastOperator === ''){
            this.currentValue = +this.inProgressValue
            this.inProgressValue = ''
            this.lastOperator = operator
            this.displayValue = this.currentValue
            document.querySelector(".results").innerHTML = this.displayValue
            // console.log(`operator: ${operator}\ncurrentValue: ${this.currentValue}\ninProgressValue: ${this.inProgressValue}\nlastOperator: ${this.lastOperator}\ndisplayValue: ${this.displayValue}`)
        } else{
            switch(this.lastOperator){
                case "+":
                    this.currentValue += +this.inProgressValue
                    console.log("here")
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

                    if(!(this.currentValue = 0 && this.lastOperator == '') && !(this.lastOperator == '=')){
                        this.currentValue += +this.inProgressValue
                        console.log(this.currentValue, this.inProgressValue)
                    }
                    break
            }
            this.inProgressValue = ''
            this.lastOperator = operator
            this.displayValue = this.currentValue
            document.querySelector(".results").innerHTML = this.displayValue
        }
    },
    this.clearAll = function(){
        this.currentValue = 0
        this.inProgressValue = ''
        this.displayValue = ''
        this.lastOperator = ''
        document.querySelector(".results").innerHTML = 0
    }
}

// Object Creation
const myCalc = new Calculator()

// Event Listeners
document.querySelectorAll(".num").forEach(element => {
    element.addEventListener('click', function(){
        myCalc.numbers(element.innerHTML)
    })
})

document.querySelectorAll(".ops").forEach(element => {
    element.addEventListener('click', function(){
        myCalc.operations(element.innerHTML)
    })
})

document.querySelectorAll(".clearBtn").forEach(element => {
    element.addEventListener('click', function(){
        myCalc.clearAll(element.innerHTML)
    })
})
