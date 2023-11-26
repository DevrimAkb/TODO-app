const todoForm = document.querySelector('#todoForm')
const todoTitle = document.querySelector('#todoTitle')
const todoText = document.querySelector('#todoText')


/* Event listener */
todoForm.addEventListener('submit', e => {
    e.preventDefault()

    validateTitle(todoTitle)
    validateTodo(todoText)
})

/* Error meddelande funktion, tar inputens parent och lägger till klassen
is-invalid, skriver även ut meddelandet */
function setError(input, message) {
    const parent = input.parentElement;
    // classList.add() lägger bara till klassen om den inte redan finns
    parent.classList.add('is-invalid')
    parent.classList.remove('is-valid')
    const errorElement = parent.querySelector('.invalid-input')
    errorElement.innerText = message
}

/* Success funktion, här behövs inget meddelande */
function setSuccess(input) {
    const parent = input.parentElement;
    // classList.add() lägger bara till klassen om den inte redan finns
    parent.classList.remove('is-invalid')
    parent.classList.add('is-valid')
}

/* validerar titeln*/
function validateTitle(input) {
    if(input.value.trim() === '') {
        setError(input, 'Title cant be empty')
        return
    }
    else if (input.value.trim().length <= 1) {
        setError(input, 'Title cant contain less than 2 characters')
        return
    }

    // Success 
    setSuccess(input)
}

/* validerar todo */
function validateTodo(input) {
    if(input.value.trim() === '') {
        setError(input, 'Todo cant be empty')
        return
    }
    else if (input.value.trim().length <= 1) {
        setError(input, 'Todo cant contain less than 2 characters')
        return
    }

    setSuccess(input)
}