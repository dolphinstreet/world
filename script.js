let countries = document.querySelectorAll(".land")
let activeCountry = null;
let input = document.querySelector("#guessBar")
let score = document.querySelector("#score")
let guessedCountries = 0;
input.disabled = true;

countries.forEach(country => {

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
}

