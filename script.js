const form = document.querySelector('form')
const inputs = document.querySelectorAll('input')
const confirmBtn = document.querySelector('.confirm')
const name = document.querySelector('.name')
const number = document.querySelector('.number')
const expiryMonth = document.querySelector('.month-expiry')
const expiryYear = document.querySelector('.year-expiry')
const cvvInput = document.querySelector('.cvv-input')
const cvv = document.querySelector('.cvv')
const month = document.querySelector('.month')
const cardName = document.querySelector('.card-name')
const cardNumber = document.querySelector('.card-number')
const year = document.querySelector('.year')
const continueBtn = document.querySelector('.continue')
const message = document.querySelector('.message')
const output = [cardName, cardNumber, month, year, cvv]


let validatedNumberInputs = 0
let regex = /^[0-9]+$/

form.addEventListener('submit', validate) 

inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        output[index].textContent = input.value
    })
})

continueBtn.addEventListener('click', () => {
    location.reload()
})

function validate(e) {
    e.preventDefault();
    if(!name.value) {
        name.nextElementSibling.textContent = `Can't be empty`
        name.style.border = `1px solid red`
    } else if (regex.test(name.value)) {
        name.nextElementSibling.textContent = "Wrong format, letter only"
        name.style.border = `1px solid red`
    } else {
        name.nextElementSibling.textContent = ''
        name.style.border = `1px solid greenyellow`
    }

    validateInput(number, number.value, 24)
    validateInput(expiryMonth, expiryMonth.value, 2)
    validateInput(expiryYear, expiryYear.value, 2)
    validateInput(cvvInput, cvvInput.value, 3) 
    isValidated()
}

function validateInput(input, value, maxInput) {
    
      if(value === '') {
        input.nextElementSibling.textContent = "Can't be blank"
        input.style.border = `1px solid red`
        return
    } else if(!regex.test(value)) {
        input.nextElementSibling.textContent = 'Wrong format numbers only'
        input.style.border = `1px solid red`
        return
    } else if(value.length > maxInput) {
        input.nextElementSibling.textContent = 'Number cannot exceed' + maxInput + 'charactors'
        input.style.border = `1px solid red`
        return
    } else if(value.length < maxInput) {
        input.nextElementSibling.textContent = 'Number too short'
        input.style.border = `1px solid red`
        return
    } else {
        if(input.style.border === '1px solid greenyellow') {
            return  
        } else {
            input.style.border = `1px solid greenyellow`
            validatedNumberInputs++
            input.nextElementSibling.textContent = ''
        }
    }
}

function isValidated() {
    validatedNumberInputs = 0
    inputs.forEach(input => {
        if(input.style.border === '1px solid greenyellow') {
            validatedNumberInputs++
        }
    });
    if(validatedNumberInputs === inputs.length && name.value) {
            message.style.display = 'block'
            form.style.display = 'none'
    }
}