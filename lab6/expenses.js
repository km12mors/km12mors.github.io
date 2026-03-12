let currentDate = new Date().toISOString().split('T')[0];
const date = document.getElementById("date");
const amountInput = document.getElementById("amount");
const submit = document.getElementById("submit");

date.setAttribute("max", currentDate);

amountInput.addEventListener("mouseout", function () {
    amount = parseFloat(document.getElementById("amount").value);
    amountFixed = amount.toFixed(2);
    amountInput.value = amountFixed;
});

submit.addEventListener("click", function(event){
    const options = document.querySelectorAll(".form-check-input:checked");
    if(options.length<1){
        event.preventDefault();
        alert("Must select at least one expense category from list!")
    }
    
});








