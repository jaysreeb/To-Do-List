const inputData = document.getElementById("input-box");
const todoDate = document.getElementById("datepick");
const addButton = document.getElementById("addbutton");
const listDetails = document.getElementById("list-container");
let todos =[]; // To store the todo objects

// Load saved todos when page loads
function loadTodos(){
    const savedTodos =localStorage.getItem('todos');
    if(savedTodos){
        todos = JSON.parse(savedTodos);
        console.log(todos);
        listDetails.innerHTML ="";
        todos.forEach(todo => {
            const li = document.createElement("li");
            li.innerHTML = `<span class="todo-text" style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span>
                <span class="todo-date" style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.date}</span>
                <button onclick="deleteTask(this)">Delete</button>`;
            listDetails.appendChild(li);            
        });
        

    }
}

addButton.addEventListener("click", function(){
    // check if user input is empty, if empty display an error
    if(inputData.value===""|| todoDate.value ===""){
        const errorDiv= document.getElementById("error");
        errorDiv.textContent = 'Please Enter your task and a date';
        return;
    }
    // Create todo object
    const todo ={
        text: inputData.value,
        date: todoDate.value,
        completed: false
    };

   
// Add to todos array, push the object todo to array
    todos.push(todo);

    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" ${todo.completed ? 'checked': ''} onchange="toggleTodo(this)">
    <span class="todo-text">${todo.text}</span><span class="todo-date">${todo.date}</span><button onclick="deleteTask(this)">Delete</button>`

    listDetails.appendChild(li);
    
    // save to local storage
    saveData();
    // Clear the input area
    inputData.value="";
    todoDate.value="";
    document.getElementById("error").textContent="";
});
// toggleTodo(this) function to toggle the checkboxes
function toggleTodo(checkbox){
    const li = checkbox.parentElement;
    // const todoText = li.querySelector('span').textContent;
    // const textElement = li.querySelector('span');
    const todoText = li.querySelector('.todo-text');
    const todoDate = li.querySelector('.todo-date');
    console.log(todoText);
    const todo = todos.find(t => t.text === todoText);
    console.log(todo);
    if(todo){
        todo.completed =checkbox.checked;
        if(checkbox.checked){
            todoText.style.textDecoration = 'line-through';
            todoDate.style.textDecoration = 'line-through';
          
        }
        else{
            todoText.style.textDecoration = 'none';
            todoDate.style.textDecoration = 'none';
           
        }
           
        saveData();
    }
}


// function save to local storage
function saveData(){     
    localStorage.setItem('todos', JSON.stringify(todos));  
}

// Delete todos

function deleteTask(button){ 

    const li = button.parentElement;
    const todoText = li.querySelector('span').textContent;
     // Remove todo from todos array
    todos = todos.filter(todo => todo.text !== todoText);
    // console.log("Todos array after deletion:", todos);
    // Save todo
    li.remove();
    saveData();
}

window.onload = loadTodos();














// addButton.addEventListener("click", function(){

//     if (inputData.value === "" || todoDate.value === "") {
//         const errorDiv = document.getElementById("error");
//         errorDiv.textContent = 'Task and due date cannot be empty!';
//         return;
        
//     } 
        
//         const li = document.createElement("li"); //Dynamically creating list elements

//         li.innerHTML = `<span>${inputData.value}</span><span>${todoDate.value}</span>
//         <button onclick="deleteTask(this)">Delete</button>`;

//         listDetails.appendChild(li);

//         inputData.value ="";
//         todoDate.value="";
//         errorDiv.textContent="";
        
// });

// inputData.addEventListener("input", function () {
//     document.getElementById("error").textContent = "";
// });
// todoDate.addEventListener("input", function () {
//     document.getElementById("error").textContent = "";
// });

// // Delete Function
// function deleteTask(button){
//     button.parentElement.remove();
    
// }
// // Save Data locally

// function saveData(){
//     localStorage.setItem('todos', JSON.stringify(listDetails));
// }

