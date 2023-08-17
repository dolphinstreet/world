let countries = document.querySelectorAll(".land");
let activeCountry = null;
let input = document.querySelector("#guessBar");
let score = document.querySelector("#score");
let totalCountries=document.querySelector("#totalCountries");
let guessedCountries = 0;
let timer = document.getElementById("timer");

input.disabled = true;
countries.forEach(country => {
    
    timerFunction(20, timer)
    country.addEventListener("click", () => {
        input.disabled = false;
        input.focus()

        if (activeCountry) {
            activeCountry.classList.remove("active");
            clearInput();
        }
        if (!country.classList.contains("win")) {
            activeCountry = country;
            country.classList.toggle("active")
        }
        setTimeout(() => {
            input.addEventListener("keyup", () => {
                clearTimeout()
                if (input.value === activeCountry.getAttribute("title")) {
                    activeCountry.classList.remove("active")
                    activeCountry.classList.add("win")
                    updateScore();
                    clearInput();
                }
            })
        }, 200);
    })
});

function clearInput() {
    input.value = ""
}
function updateScore() {
    guessedCountries++
    score.innerHTML = guessedCountries;
    totalCountries.innerHTML = countries.length;
}

function timerFunction(minutes, timer ){
    let seconds= minutes*60;
    let counter =""
    setInterval(() => {
        counter=`${Math.floor(seconds/60)}:${seconds%60}`;
        timer.innerHTML=counter;
        seconds--
    }, 1000);
}



