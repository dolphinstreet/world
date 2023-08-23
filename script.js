let countries = document.querySelectorAll(".land");
let activeCountry = null;
let input = document.querySelector("#guessBar");
let score = document.querySelector("#score");
let totalCountries = document.querySelector("#totalCountries");
let guessedCountries = 0;
let timer = document.getElementById("timer");

const endGameDialog = document.getElementById("endGameDialog");
const endGamedialogMessage = document.getElementById("dialogMessage");
const endGameRestartButton = document.getElementById("restartButton");

const pauseButton = document.querySelector("#pause-game i");

const pauseDialog = document.getElementById("pauseGameDialog");
const pauseDialogResumeButton = document.getElementById("resume-button");
const pauseDialogQuitButton = document.getElementById("quit-button");


disableInput()
function startGame() {

    countries.forEach(country => {
        timerFunction(0.5, timer)
        country.addEventListener("click", () => {
            enableInput()
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
                    if (countryData[activeCountry.getAttribute("id")].some(name => removeAccents(name.toLowerCase())===removeAccents(input.value.toLowerCase()))) {
                        activeCountry.classList.remove("active")
                        activeCountry.classList.add("win")
                        disableInput()
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
function disableInput() {
    input.disabled = true;
    input.placeholder = "Choose a country"
}
function enableInput() {
    input.disabled = false;
    input.placeholder = "Guess the country"
}
function removeAccents(input) {
    return input
        .replace(/[éèàîôûêùçïäëöü'ù-]/g, match => {
            switch (match) {
                case 'é': return 'e';
                case 'è': return 'e';
                case 'à': return 'a';
                case 'î': return 'i';
                case 'ô': return 'o';
                case 'û': return 'u';
                case 'ê': return 'e';
                case 'ù': return 'u';
                case 'ç': return 'c';
                case 'ï': return 'i';
                case 'ä': return 'a';
                case 'ë': return 'e';
                case 'ö': return 'o';
                case 'ü': return 'u';
                case '\'': return ' ';
                case '-': return ' ';
            }
        });
}

function updateScore() {
    guessedCountries++
    score.innerHTML = guessedCountries;
    totalCountries.innerHTML = countries.length;
    if (guessedCountries === totalCountries) {
        endGame("You won")
    }
}

function timerFunction(minutes, timerElement) {
    let seconds = minutes * 60;
    let counter = ""
    let intervalId = setInterval(() => {
        counter = `${Math.floor(seconds / 60)}:${seconds % 60}`;
        timerElement.innerHTML = counter;
        if (seconds === 0) {
            endGame("Time's up !");
            clearInterval(intervalId);
        } else {
            seconds--
        }
    }, 1000);

}

pauseButton.addEventListener("click", () => {
   pauseDialog.showModal()
})

pauseDialogResumeButton.addEventListener("click", () => {
    console.log("resume")
    pauseDialog.close()
 })

function endGame(message) {
    endGameDialog.close()
    pauseDialog.close()
    showEndGameModal(message);
    clearInput();
    disableInput();

}

function showEndGameModal(message) {
    endGamedialogMessage.textContent = `${message} Score: ${guessedCountries}/${countries.length}`;
    endGameDialog.showModal();
    endGameRestartButton.style.display = "block";
}

endGameRestartButton.addEventListener("click", () => {
    endGameDialog.close();
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
    disableInput()
    //reset score
    score.innerHTML = guessedCountries;
    //start new game
    startGame();
}

startGame();





