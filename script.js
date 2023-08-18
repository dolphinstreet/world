let countries = document.querySelectorAll(".land");
let activeCountry = null;
let input = document.querySelector("#guessBar");
let score = document.querySelector("#score");
let totalCountries = document.querySelector("#totalCountries");
let guessedCountries = 0;
let timer = document.getElementById("timer");

const dialog = document.getElementById("endGameDialog");
const dialogMessage = document.getElementById("dialogMessage");
const dialogRestartButton = document.getElementById("restartButton");

input.disabled = true;
function startGame() {
    countries.forEach(country => {

        timerFunction(2, timer)
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
}

function clearInput() {
    input.value = ""
}
function updateScore() {
    guessedCountries++
    score.innerHTML = guessedCountries;
    totalCountries.innerHTML = countries.length;
    if (guessedCountries===totalCountries){
        endGame("You won")
    }
}

function timerFunction(minutes, timer) {
    let seconds = minutes * 60;
    let counter = ""
    let intervalId = setInterval(() => {
        counter = `${Math.floor(seconds / 60)}:${seconds % 60}`;
        timer.innerHTML = counter;
        if (seconds === 0) {
            endGame("Time's up !");
            clearInterval(intervalId);
        } else {
            seconds--
        }
    }, 1000);

}

function endGame(message) {
    dialog.close()
    showModal(message);
    clearInput();
    input.disabled = true;
}

function showModal(message) {
    dialogMessage.textContent = `${message} Score: ${guessedCountries}/${countries.length}`;
    dialog.showModal();
    dialogRestartButton.style.display = "block";
}

dialogRestartButton.addEventListener("click", () => {
    dialog.close();
    restartGame();
});

function restartGame() {
    //reset variables
    activeCountry = null;
    guessedCountries = 0;
    // reset states
    countries.forEach(country => {
        country.classList.remove("active", "win");
    });
    clearInput()
    input.disabled = true;
    //reset score
    score.innerHTML = guessedCountries;
    //start new game
    startGame();
}

startGame();





