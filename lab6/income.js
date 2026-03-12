const amountInput = document.getElementById("amount");
let isPositve = false;
const submit = document.getElementById("submit");

amountInput.addEventListener("mouseout", function () {
    amount = parseFloat(document.getElementById("amount").value);
    amountFixed = amount.toFixed(2);
    if(!Number.isNaN(amountFixed)){
        amountInput.value = amountFixed;
        isPositve = true;
        submit.disabled = false;
    }
    else{
         console.log("Input is not a positive number.");
         submit.disabled = true;
    }
});
