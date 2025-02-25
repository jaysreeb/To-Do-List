const inputData = document.getElementById("input-box");
const todoDate = document.getElementById("datepick");
const addButton = document.getElementById("addbutton");
const listDetails = document.getElementById("list-container");
const errorDiv = document.getElementById("error");
let todos =[]; // To store the todo objects
//Check if the elements of the html are properly being captured
console.log("Checking elements:", {
    inputData,
    todoDate,
    addButton,
    listDetails
});

// Creating a function to generate ID's for todo
function ID(){
    const uniqueId = Math.floor(Math.random() * 1000000).toString(16);
    return uniqueId;
}
// Load saved todos when page loads
function loadTodos(){
    console.log("Loading todos...");
    console.log("Raw localStorage data:", localStorage.getItem("todos"));    
    try{
        const savedTodos = localStorage.getItem('todos');
        if(savedTodos){
            todos = JSON.parse(savedTodos);
            listDetails.innerHTML = "";
            console.log('saved todos:', typeof(todos));
            todos.forEach(todo => renderTodoItems(todo));
        }
    }catch(error){
        console.log('Error loading todoso:', error);
    }
}

// todo saves the data as object and it is pushed to todos using push() which converts it into an array of objects
addButton.addEventListener("click", function(event){
    event.preventDefault();
    console.log("Button clicked!");
    const todo ={
        id: ID(),
        text: inputData.value.trim(),
        date: todoDate.value,
        completed: false
    };
    console.log("New todo:", todo);
    if(todo.text !=="" && todo.date !== ""){
        todos.push(todo);
        console.log("Updated todos array:", todos);
        renderTodoItems(todo); 
        saveData();  
        inputData.value="";
        todoDate.value="";
        errorDiv.innerHTML= "";
    }else {
        // If empty display this error
        errorDiv.innerHTML = "Enter Todo and a Date of Completion";
    }
    //Clear the Error messages once user starts typing
    [inputData, todoDate].forEach(input =>{
        input.addEventListener("input", () => errorDiv.innerHTML="");
    });
    
});

// render todo items added by user in the UI
function renderTodoItems(todo){
     console.log("Rendering todo:", todo);
    const li= document.createElement("li");
    li.dataset.id = todo.id;

    const checkbox =document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className ='check';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', function(){
        toggleTodoComplete(todo.id);
    });
    
    const todoText = document.createElement("span");
    todoText.className = "todo-text";
    todoText.textContent = todo.text;

    const todoDateSpan = document.createElement("span");
    todoDateSpan.className = "todo-date";
    todoDateSpan.textContent = todo.date;

    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () =>  editTodo(todo.id));
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () =>  deleteTask(todo.id)); 


    li.appendChild(checkbox);
    li.appendChild(todoText);
    li.appendChild(todoDateSpan);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    listDetails.appendChild(li);
    
}
// Function to toggle the completion status of todo in the checkbox

function toggleTodoComplete(todoId){
    
    const todo = todos.find(todo => todo.id === todoId);
    if(todo){
        todo.completed = !todo.completed;
        // console.log('Updated todos :', todos);
        saveData();
        listDetails.innerHTML = "";  
        todos.forEach(todo => renderTodoItems(todo));
    }
}
// function save to local storage
function saveData(){     
    try{
        if(!todos || todos.length ===0){
            console.warn("Todos array is empty or undefined. Nothing to save");
            return;
        }
    
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Data saved to local storage:', localStorage.getItem('todos'));    

    }catch(error){
        console.error('Error saving the data', error);
    }
}

// Function to edit todos
function editTodo(todoId){
    console.log(`The todoId is ${todoId} and its ${typeof(todoId)} type`);
  
}

// Delete todos
function deleteTask(todoId){
    console.log("Deleting todo:", todoId);
    console.log("Before deletion:", todos);
    todos = todos.filter(todo => todo.id !== todoId);
    console.log('After filtering:', todos);
    saveData();  
    // renderTodoItems();
    listDetails.innerHTML = "";  
    todos.forEach(todo => renderTodoItems(todo));
       
}

window.addEventListener('load', function(){
    
    loadTodos()
});
