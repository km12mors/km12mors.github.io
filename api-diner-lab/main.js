"use strict";

function init() {
    let btn = document.getElementById("fetch-btn");
    let meal_btn = document.getElementById("meal-btn");
    btn.addEventListener("click", fetchDog);
    meal_btn.addEventListener("click", fetchMeal);

    let joke_btn = document.getElementById("joke-btn");
    joke_btn.addEventListener("click", fetchJoke);

    let programmingJokeBtn = document.getElementById("programming-joke-btn");
    programmingJokeBtn.addEventListener("click", fetchProgrammingJoke);

}

function fetchDog() {
    let url = "https://dog.ceo/api/breeds/image/random";
    fetch(url)
        .then(statusCheck)
        .then(resp => resp.json())
        .then(showDog)
        .catch(handleError);
}

function showDog(data) {
    console.log("Dog data:", data);
    console.log(JSON.stringify(data));
    let img = document.createElement("img");
    img.src = data.message;
    img.alt = "A random dog";
    document.getElementById("output").appendChild(img);
}

async function statusCheck(res) {
    if (!res.ok) {
        throw new Error(await res.text());
    }
    return res;
}

function handleError(err) {
    console.error("Something went wrong:", err);
    document.getElementById("output").textContent =
        "The kitchen is closed! (Error loading data)";
}

init();

function fetchMeal() {
    let food = document.getElementById("food-input").value;
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + food;
    fetch(url)
        .then(statusCheck)
        .then(resp => resp.json())
        .then(showMeals)
        .catch(handleError);
}

function showMeals(data) {
    let output = document.getElementById("meal-output");
    output.innerHTML = "";

    console.log(data);
    if (data.meals == null) {
        console.log("Sorry, that's not on our menu!");
        let error = document.createElement("p");
        error.textContent = "Sorry, that's not on our menu!";
        document.getElementById("meal-output").appendChild(error);
        return;
    }
    for (let meal in data.meals) {
        let mealSection = document.createElement("div");
        document.getElementById("meal-output").appendChild(mealSection);
        console.log(data.meals[meal].strMeal);
        console.log(data.meals[meal].strCategory);
        console.log(data.meals[meal].strMealThumb);

        let name = document.createElement("p");
        name.textContent = "Name: " + data.meals[meal].strMeal;

        let category = document.createElement("p");
        category.textContent = "Category: " + data.meals[meal].strCategory;

        let img = document.createElement("img");
        img.src = data.meals[meal].strMealThumb;
        img.alt = "An image of a meal";
        mealSection.appendChild(name);
        mealSection.appendChild(category);
        mealSection.appendChild(img);

    }
}

function fetchJoke() {
    let url = "https://official-joke-api.appspot.com/random_joke";
    fetch(url)
        .then(statusCheck)
        .then(resp => resp.json())
        .then(showJoke)
        .catch(handleError);
}

function showJoke(data) {
    document.getElementById("joke-output").innerHTML = "";

    let setup = document.createElement("p");
    setup.textContent = data.setup;
    document.getElementById("joke-output").appendChild(setup);

    let punchlineButton = document.createElement("button");
    punchlineButton.textContent = "Show Punchline";
    document.getElementById("joke-output").appendChild(punchlineButton);

    punchlineButton.addEventListener("click", function(){
        let punchline = document.createElement("p");
        punchline.textContent = data.punchline;
        document.getElementById("joke-output").appendChild(punchline);
    });
}


document.getElementById("usersBtn").addEventListener("click", function() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(response => response.json())
        .then(users => {
            console.log("All users:", users);
            console.log("Number of users:", users.length);

            const output = document.getElementById("complex-output");
            output.replaceChildren(); // clear previous content

            const heading = document.createElement("h3");
            heading.textContent = "User Directory";

            const list = document.createElement("ul");

            for (let i = 0; i < users.length; i++) {
                const item = document.createElement("li");

                const strong = document.createElement("strong");
                strong.textContent = users[i].name;

                item.appendChild(strong);
                item.appendChild(document.createTextNode(`, ${users[i].email} (located in ${users[i].address.city}), Company Name: ${users[i].company.name}`));

                list.appendChild(item);
            }


            output.appendChild(heading);
            output.appendChild(list);
            const area = document.createElement("p");
            area.textContent = "Longitude and Latitude of first user"
            const lat = users[0].address.geo.lat;
            const long = users[0].address.geo.lng;
            const longAndLat = document.createElement("p");

            longAndLat.textContent = "Leanne Graham - Longitude: " + long + " Latitude: " + lat;
            output.appendChild(longAndLat);
        })
        .catch(error => {
            console.error("Fetch error:", error);

            const output = document.getElementById("complex-output");
            const message = document.createElement("p");
            message.textContent = "Failed to load users.";
            output.replaceChildren(message); // This is new!! Check it out
        });
});


function fetchProgrammingJoke() {
    let url = "https://official-joke-api.appspot.com/jokes/programming/random";
    fetch(url)
        .then(statusCheck)
        .then(resp => resp.json())
        .then(showProgrammingJoke)
        .catch(handleError);
}

function showProgrammingJoke(data) {
    let joke = data[0];
    document.getElementById("programming-joke-output").innerHTML = "";

    let id = document.createElement("p");
    id.textContent = "Joke ID: " + joke.id;
    document.getElementById("programming-joke-output").appendChild(id);

    let setup = document.createElement("p");
    setup.textContent = joke.setup;
    document.getElementById("programming-joke-output").appendChild(setup);

    let punchlineButton = document.createElement("button");
    punchlineButton.textContent = "Show Punchline";
    document.getElementById("programming-joke-output").appendChild(punchlineButton);

    punchlineButton.addEventListener("click", function(){
        let punchline = document.createElement("p");
        punchline.textContent = joke.punchline;
        document.getElementById("programming-joke-output").appendChild(punchline);
    });
}

