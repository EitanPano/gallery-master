// board and cards elements
const cards = document.querySelectorAll('.card');
const elMenu = document.querySelector('.menu');
const elWin = document.querySelector('.win');
const elBoard = document.querySelector('.board');
// player and best time elements
let elBestPlayer = document.querySelector('.best-of-all');
let elPlayerName = document.querySelector('.p-name');
let elPlayerTime = document.querySelector('.p-time');
// saving data to localstorage
let lastPlayer;
let lastBestTime;
let elNameInput = document.querySelector('#name-input');
// core game logic
const couplesCount = cards.length / 2;
let flippedCouplesCount = 0;
let isFlippedCard = true;
let lockBoard = false;
let firstCard, secondCard;
// time functions
let isTimeStart = false;
let tens = 00;
let seconds = 00;
let minutes = 00;
let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let appendMinutes = document.getElementById("minutes");
let Interval;
// sounds
const soundCorrect = new Audio('sounds/correct.mp3');
const soundUnflip = new Audio('sounds/unflip.mp3');

// shuffle all cards and add click event to them
const shuffle = (() => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
        card.addEventListener('click', flipCard);
    })
})()
// localstorage search "last_player" & "best_time" Keys  
const LoadLastPlayer = (() => {
    if (localStorage.getItem('last_player') != null) {
        lastPlayer = localStorage.getItem('last_player');
        console.log(`Hello ${lastPlayer} :)`);
        elPlayerName.innerText = lastPlayer;
        elNameInput.value = lastPlayer;
    }
    if (localStorage.getItem('best_time') != null) {
        lastBestTime = localStorage.getItem('best_time');
        elBestPlayer.innerText = `Best time - ${lastBestTime}`;
    }
})()
// flipping cards logic and functions
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (!isTimeStart) {
        console.log('Timer Started');
        isTimeStart = true;
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    }
    this.classList.toggle('flipped');
    this.classList.toggle('face-down');

    if (isFlippedCard) {
        // first card click
        isFlippedCard = false;
        firstCard = this;

        return;
    }
    // second card click
    isFlippedCard = true;
    secondCard = this;

    checkForMatch();
}

// check if cards match.
const checkForMatch = () => {
    const isMatch = firstCard.dataset.mark === secondCard.dataset.mark;

    isMatch ? disableCards() : unflipCards();
}

// Cards match, disable them
const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    soundCorrect.play();
    resetBoard();
    flippedCouplesCount++;
    checkForWin();
}

// Wrong card couple flipped, unflip.
const unflipCards = () => {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.toggle('flipped');
        firstCard.classList.toggle('face-down');
        secondCard.classList.toggle('flipped');
        secondCard.classList.toggle('face-down');

        soundUnflip.play();
        resetBoard();
    }, 1200)
}
// Reset core game logic variables
const resetBoard = () => {
    [isFlippedCard, lockBoard] = [true, false];
    [firstCard, secondCard] = [null, null];
}
// check if player meets completion conditions
const checkForWin = () => {
    if (couplesCount === flippedCouplesCount) {
        isTimeStart = false;
        stopTimer();
        savePlayer(lastPlayer);
        checkBestTime();
        elMenu.classList.toggle('hidden');
        elBoard.classList.toggle('transperent');
        let elWinReview = document.querySelector('.win-review');
        const elComplete = document.querySelector('.switch-player');
        const playBtn = document.querySelector('.play-btn');

        elWinReview.innerText = `Good!`;
        elComplete.classList.remove('hidden');
        playBtn.innerText = 'Play Again';
    }
}
// shuffle cards and start the game
const playGame = () => {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
        card.addEventListener('click', flipCard);
        if (card.classList.contains('flipped')) {
            card.classList.toggle('flipped');
            card.classList.toggle('face-down');
        }
    })
    elMenu.classList.toggle('hidden');
    elBoard.classList.remove('transperent');
    flippedCouplesCount = 0;

    getPlayer();
    resetTimer();
}

const getPlayer = () => {
    let newPlayer = elNameInput.value;
    if (newPlayer.length === 0) {
        newPlayer = 'Player-1';
        console.log(`${newPlayer} is the default name`)
    }
    elPlayerName.innerHTML = newPlayer;
    lastPlayer = newPlayer;
    localStorage.setItem('last_player', lastPlayer);
}

const savePlayer = (playerName) => {
    if (localStorage.getItem('player_list') === null) {
        localStorage.setItem('player_list', '[]');
    }
    let playerList = JSON.parse(localStorage.getItem('player_list'));
    let currentPlayer = playerList.find(player => player.name === playerName);
    if (currentPlayer) {
        let oldTime = currentPlayer.time.replaceAll(" : ", "");
        let newTime = elPlayerTime.innerText.replaceAll(" : ", "");
        if (newTime < oldTime) {
            console.log('New best score, replaced with previous score');
            newTime = newTime.match(/.{1,2}/g);
            newTime = `${newTime[0]} : ${newTime[1]} : ${newTime[2]}`
            currentPlayer.time = newTime;
            console.log(currentPlayer);
            localStorage.setItem('player_list', JSON.stringify(playerList));
        }
        else {
            console.log('Your previous score was better, Keep trying :)');
            return;
        }
    }
    else {
        console.log(`Player not found, Creating player "${playerName}"`);
        playerList.push(
            {
                "name": playerName,
                "time": elPlayerTime.innerText
            });
        localStorage.setItem('player_list', JSON.stringify(playerList));
    }
}


const checkBestTime = () => {
    let playerList = JSON.parse(localStorage.getItem('player_list'));
    let allTimes = playerList.map(player => player.time);
    let sortedTimes = [];

    allTimes.forEach(time => sortedTimes.push(time.replaceAll(" : ", "")));

    sortedTimes.sort();
    lastBestTime = sortedTimes[0].match(/.{1,2}/g);
    lastBestTime = `${lastBestTime[0]} : ${lastBestTime[1]} : ${lastBestTime[2]}`;
    localStorage.setItem('best_time', lastBestTime);
    elBestPlayer.innerText = `Best time - ${lastBestTime}`
}

const startTimer = () => {
    tens++;
    if (tens <= 9) appendTens.innerHTML = "0" + tens;
    if (tens > 9) appendTens.innerHTML = tens;
    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }
    if (seconds > 9) appendSeconds.innerHTML = seconds;
    if (seconds > 59) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
}

const stopTimer = () => {
    clearInterval(Interval);
    console.log('Timer Stopped');
}

const resetTimer = () => {
    tens = "00";
    seconds = "00";
    minutes = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    appendMinutes.innerHTML = minutes;
}


