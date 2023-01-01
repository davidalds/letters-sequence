(() => {
  const counterBar = document.querySelector("div[counter-bar]");
  const letters = document.querySelector("div[letters]");
  const btnStart = document.querySelector("button[btn-start]");
  const btnRestart = document.querySelector("button[btn-restart]");
  const intro = document.querySelector("div[intro]");
  let arrLetters = [];
  let won = false;
  let gameStarted = false;
  const amountLetters = 12;
  const barSpeed = 5;

  // Function to generate letters using ASCII (between 65 and 90)
  function lettersGenerate(id) {
    const [min, max] = [65, 90];
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    const letter = String.fromCharCode(randomNumber);
    arrLetters.push({ key: letter, id });
    return letter;
  }

  // Function to create a node (letter) on the DOM
  function createLetterNode(value) {
    const letter = document.createElement("div");
    letter.setAttribute("class", "letter");
    letter.innerHTML = value;
    return letter;
  }

  // Function to create the letters
  function appendLetters() {
    for (let i = 0; i < amountLetters; i++) {
      const letter = createLetterNode(lettersGenerate(i));
      letters.appendChild(letter);
    }
  }

  // Function to check the letter typed on keyboard
  function checkLetter(key) {
    if (arrLetters.length) {
      if (arrLetters[0].key === key) {
        const letterNode = letters.children[arrLetters[0].id];
        arrLetters.shift();
        letterNode.setAttribute("class", "letter letter-correct");
        checkWon();
      } else {
        const letterNode = letters.children[arrLetters[0].id];
        letterNode.setAttribute("class", "letter letter-incorrect");
        setTimeout(resetLetters, 200);
      }
    }
  }

  // Function to check if the array of letters is empty (if is empty === Won the game)
  function checkWon() {
    if (arrLetters.length === 0) {
      won = true;
    }
  }

  // Function to remove the nodes (letters) of the DOM
  function removeNodeLetters() {
    while (letters.firstChild) {
      letters.removeChild(letters.firstChild);
    }
  }

  // Function to reset the game
  function resetLetters() {
    arrLetters = [];
    removeNodeLetters();
    appendLetters();
  }

  // Function to catch the value of the typed key
  function keyPress(event) {
    const key = event.key;
    checkLetter(key.toUpperCase());
  }

  // Function to alert win or lose
  function alertMessage(msg) {
    setTimeout(alert(msg), 200);
  }

  // Function to decrease the counter bar when the game is started
  function decreaseCounterBar() {
    let id = setInterval(animation, barSpeed);
    function animation() {
      const counterBarWidth = counterBar.clientWidth;
      if (counterBarWidth === 0) {
        clearInterval(id);
        alertMessage("Time is over. You lose!");
        toggleBtnRestart();
        gameStartedToggle();
      } else if (won) {
        clearInterval(id);
        alertMessage("Congratulations. You won!");
        toggleBtnRestart();
        gameStartedToggle();
      } else {
        counterBar.style.width = `${counterBarWidth - 1}px`;
      }
    }
  }

  // Function to get the display mode of the buttons
  function getBtnDisplay(btn) {
    return window.getComputedStyle(btn).display;
  }

  function toggleBtnStart() {
    if (getBtnDisplay(btnStart) === "none") {
      btnStart.style.display = "block";
    } else {
      btnStart.style.display = "none";
    }
  }

  function toggleBtnRestart() {
    if (getBtnDisplay(btnRestart) === "none") {
      btnRestart.style.display = "block";
    } else {
      btnRestart.style.display = "none";
    }
  }

  function gameStartedToggle() {
    gameStarted = !gameStarted;
  }

  function startGame() {
    intro.style.display = "none";
    letters.style.display = "flex";
    toggleBtnStart();
    gameStartedToggle();
    decreaseCounterBar();
  }

  function resetGame() {
    won = false;
    letters.style.display = "none";
    intro.style.display = "block";
    counterBar.style.width = "100%";
    toggleBtnRestart();
    toggleBtnStart();
    resetLetters();
  }

  window.addEventListener("keypress", (event) => {
    if (gameStarted) {
      keyPress(event);
    }
  });
  window.addEventListener("load", () => appendLetters());
  btnStart.addEventListener("click", () => startGame());
  btnRestart.addEventListener("click", () => resetGame());
})();