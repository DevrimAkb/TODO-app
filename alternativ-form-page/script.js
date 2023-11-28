const todoForm = document.querySelector('#todoForm')
const todoText = document.querySelector('#todoText')

/* Event listener */
todoForm.addEventListener('submit', e => {
    e.preventDefault()
    validateTodo(todoText)
    createTodo() 
})

//Funktion för att skapa todos och skicka till API

async function createTodo() {
        const title = todoText.value

        const post = {
            title
        }
         console.log(post)
        const res = await fetch("https://js1-todo-api.vercel.app/api/todos?apikey=645478ef-292e-4731-ab3e-6aba10a07aa8", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(post)
        })
    
         console.log(res)
 }

 /* validerar todo */
 function validateTodo(input) {
     if(input.value.trim() === '') {
         setError(input, 'Todo cant be empty')
         return false
        }
        else if (input.value.trim().length <= 1) {
            setError(input, 'Todo cant contain less than 2 characters')
            return false
        }
        
        setSuccess(input)
        return true
    }
    
    /* Error meddelande funktion, tar inputs parent och lägger till klassen
    is-invalid, skriver även ut meddelandet */
function setError(input, message) {
    const parent = input.parentElement;
    parent.classList.add('is-invalid')
    parent.classList.remove('is-valid')
    const errorElement = parent.querySelector('.invalid-input')
    errorElement.innerText = message
}

function setSuccess(input) {
    const parent = input.parentElement;
    parent.classList.remove('is-invalid')
    parent.classList.add('is-valid')
}
// -------------------------------------------------------------------------------------
// Async api fetch
let posts = []

const fetchPosts = async () => {
    try {
        const res = await fetch('https://js1-todo-api.vercel.app/api/todos?apikey=645478ef-292e-4731-ab3e-6aba10a07aa8');
        if(res.status !== 200) {
            throw new Error('Something went wrong')
        }
        const data = await res.json();
        console.log(data);
        posts = data    
        renderPosts();
        } catch (error) {
        console.log(error.message)};
    };
    
fetchPosts();

//------------------------------------------------------------------


// Funktion för att skriva ut todos (EJ KLAR lektion 8 timestamp: 1.29.40)



function renderPosts() {
    const listContainer = document.querySelector('#list-container')
    listContainer.innerHTML = ''

    posts.forEach(post => {
        listContainer.innerHTML += `
        <ul id=list-container>
        <li></li>
        </ul>
        ${post.title}
        `
    })
}





