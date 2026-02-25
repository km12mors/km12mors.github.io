console.log("This is a test alert from forms.js!");

const buttonA = document.getElementById("button_A");
const headingA = document.getElementById("heading_A");
const message = document.getElementById("message");
const box = document.getElementById("box");
const inputField = document.getElementById('textInput');

buttonA.addEventListener("click",function(){
    const name = prompt("What is your name?");
    alert(`Hello ${name}, nice to see you!`);
    headingA.textContent = `Welcome ${name}`;
    message.textContent = "Hello, JavaScript!";
});

box.addEventListener("click",function(){
    box.style.backgroundColor = "cyan";
});

inputField.addEventListener('input', function(event) {
    console.log(event.target.value);
});

