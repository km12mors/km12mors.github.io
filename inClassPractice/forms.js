console.log("This is a test alert from forms.js!");

const buttonA = document.getElementById("button_A");
const headingA = document.getElementById("heading_A");

buttonA.addEventListener("click",function(){
    const name = prompt("What is your name?");
    alert(`Hello ${name}, nice to see you!`);
    headingA.textContent = `Welcome ${name}`;
});

/*
function buttonA_Clicked(){
    alert("Button Clicked!");
}
    */