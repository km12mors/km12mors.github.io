
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.getElementById("guesses");
const lowOrHi = document.querySelector(".lowOrHi");
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");
const result = document.getElementById("result");
const turn = document.getElementById("turn");
const resultParas = document.querySelector(".resultParas");

let guessCount = 1;
let resetButton;
let currentGuess;

guessSubmit.addEventListener("click",function(){
    const newItem = document.createElement("li");
    newItem.textContent = currentGuess;
    guesses.appendChild(newItem);
    checkGuess();
    guessCount++;
});

guessField.addEventListener('input', function(event) {
    currentGuess = event.target.value;
});


function checkGuess(){
    console.log("Current: " + currentGuess);
    console.log("Random: " + randomNumber);
    console.log("Guess Count: " + guessCount);
    turn.textContent = "Guess Count: " + guessCount;
    currentGuess = Number(currentGuess);
    if(currentGuess===randomNumber){
        guessSubmit.disabled = true;
        guessField.disabled = true;
        result.textContent = "Congratuations! You guessed correctly!";
        result.style.backgroundColor = "green";
        result.style.color = "white";
        resetButton = document.createElement("button");
        resetButton.textContent = "Start new game";
        document.body.append(resetButton);
        resetButton.addEventListener("click", resetGame);
    }
    else if(currentGuess > randomNumber){
        result.textContent = "Incorrect, guess again!";
        result.style.backgroundColor = "red";
        lowOrHi.textContent = "Too High";
    }

    else if(currentGuess < randomNumber){
        result.textContent = "Incorrect, guess again!";
        result.style.backgroundColor = "red";
        lowOrHi.textContent = "Too Low";
    }

    if(guessCount==10){
        guessSubmit.disabled = true;
        guessField.disabled = true;
        result.textContent = "!!!GAME OVER!!!";
        result.style.color = "white";
        result.style.backgroundColor = "blue";
        lowOrHi.textContent = "";
        resetButton = document.createElement("button");
        resetButton.textContent = "Start new game";
        document.body.append(resetButton);
        resetButton.addEventListener("click", resetGame);
    }

}

function resetGame(){
    guessSubmit.disabled = false;
    guessField.disabled = false;
    guessCount = 1;
    result.textContent = "";
    resetButton.parentNode.removeChild(resetButton);
    randomNumber = Math.floor(Math.random() * 100) + 1;
    for(item in guesses){
        guesses.removeChild(guesses.lastChild);
    }
}
