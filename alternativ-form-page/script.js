const todoForm = document.querySelector('#todoForm')
const todoText = document.querySelector('#todoText')
const submitBtn = document.querySelector('#submit-btn')


//KVAR ATT GÖRA: man ska inte kunna lägga till todo med en bokstav/karaktär

/* Event listener */
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    if(e.submitter.id === 'submit-btn'){
        if(validateTodo(todoText)){
            await createTodo()
            await fetchPosts()
            renderPosts()
        }
    }
})



//Funktion för att skapa todos och skicka till API

async function createTodo() {
        const title = todoText.value.trim()
        if(title.length > 1){
            const post = {
                title
            }
            try {
                const res = await fetch("https://js1-todo-api.vercel.app/api/todos?apikey=645478ef-292e-4731-ab3e-6aba10a07aa8", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(post)
                })
            }
            catch(error) {
                console.error(error.message)
            }
    }
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


// Funktion för att rendera och ta bort todos



function renderPosts() {
    const listContainer = document.querySelector('#list-container')
    listContainer.innerHTML = ''

    posts.forEach(post => {
        listContainer.insertAdjacentHTML('beforeend', `
        <li class="list-content">${post.title}</li>
        <button id="remove-${post._id}" class="delete-button"><i class="fa-solid fa-trash"></i></button>
        `)
        
        document.querySelector('#remove-' + post._id).addEventListener('click', async () => {
            console.log(post._id)
            try {
                const res = await fetch(`https://js1-todo-api.vercel.app/api/todos/${post._id}?apikey=645478ef-292e-4731-ab3e-6aba10a07aa8`, {
                    method: 'DELETE'
                })
                console.log(res)
                if(res.status !== 200){
                    throw new Error('Could not delete todo' + res.status)
                }
                // const data = await res.json()
                // console.log(data)
                posts = posts.filter(_post => _post._id !== post._id)
                renderPosts()
            }
            catch(error) {  
                console.log('something went wrong')
            }
        })
    })
}
//-----------------------------------------------------------------------------

// Ett sätt att rendera posts och lägga till element

// function renderPosts() {
//     const listContainer = document.querySelector('#list-container')
//     listContainer.innerHTML = ''

//       posts.forEach(post => {
//           listContainer.appendChild(createPostElement(post))
//       })
//     }

// function createPostElement(post) {
//     const postDiv = createCustomElement('div', 'post-container');

//     const liElement = createCustomElement('li', 'post-title', post.title);
//     postDiv.appendChild(liElement);

//     const buttonElement = createCustomElement('button', 'delete-button', 'Delete');
//     postDiv.appendChild(buttonElement);

//     return postDiv;
// }

//   function createCustomElement(type, classList, text,) {
//       const element = document.createElement(type)
//       if(classList.length < 0) {
//           element.className = classList
//       }
//       if(text) {
//         element.textContent = text
//       }
//       return element
//   }

//-------------------------------------------------------------------------------------------
