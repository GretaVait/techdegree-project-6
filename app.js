//Global variables
document.querySelector('body').style.fontFamily = 'Roboto, sans-serif';
const ul = document.querySelector('ul');
const li = document.createElement('li');
var startButton = document.querySelector('.btn__reset');
const title = document.querySelector('.title');
const container = document.querySelector('.main-container');
const overlayDiv = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const tries = document.querySelectorAll('.tries img');
let missed = 0;
const phrasesList = 
    ['Horse and duck',
    'Dragon with hat',
    'Mango is delicious',
    'Donut and cake',
    'Concert was awful'];

//Generating random phrase
function getRandomPhraseAsArray(arr){
    const randomPhrase = arr[Math.floor(Math.random() * arr.length)];
    return randomPhrase.split("");
}

//
function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.appendChild(li);
        if (arr[i] !== " ") {
            li.className = 'letter';
          } else {
            li.className = 'space';
        }
    }
}

//
function checkLetter(letterButton) {
    let letterFound;
    const letters = document.querySelectorAll('.letter');
    for (let i = 0; i < letters.length; i++) {
        if(letterButton.textContent.toLowerCase() === letters[i].textContent.toLowerCase()) {
            letters[i].className = 'letter show scale';
            letterFound = letterButton;
        }
    }
    if (letterFound) {
        return letterFound;
    } else {
        return null;
    }
}

// 
qwerty.addEventListener('click', function(event){
    if (event.target.tagName === 'BUTTON') {
        const button = event.target;
        button.disabled = true;
        button.className = 'chosen';
        const letterFound = checkLetter(button);
        if (letterFound === null) {
            tries[missed].src = "images/lostHeart.png";
            missed ++;
        }
        checkWin();
    }
});

//
function checkWin () {
    const listItem = ul.children;
    let letterCount = 0;
    for (let i = 0; i < listItem.length; i++) {
        if (listItem[i].classList.contains('letter')) {
            letterCount ++;
        }
    }
    let showCount = 0;
    for (let i = 0; i < listItem.length; i++) {
        if (listItem[i].classList.contains('show')) {
            showCount ++;
        }
    }
    if (letterCount === showCount) {
        overlayDiv.className = 'win';
        overlayDiv.style.display = 'flex';
        title.textContent = 'You Won The Game!';
        startButton.textContent = 'Reset Game';
    } else if (missed >= 5) {
        overlayDiv.className = 'lose';
        overlayDiv.style.display = 'flex';
        title.textContent = 'You Lost The Game!';
        startButton.textContent = 'Reset Game';
    }
}

//reseting game
startButton.addEventListener('click', function(){
    missed = 0;
    resetqwerty();
    deletePhrase();
    let letterList= document.getElementsByClassName('letter');
        const phraseArray = getRandomPhraseAsArray(phrasesList);
    addPhraseToDisplay(phraseArray);
    resetTries();
    if (overlayDiv.style.display === 'none') {
        overlayDiv.style.display = 'flex';
    } else {
        overlayDiv.style.display = 'none';
    }
});

//reseting keyboard
function resetqwerty() {
    for (let i = 0; i < qwerty.childElementCount; i++) {
        for (let j = 0; j < qwerty.children[i].childElementCount; j++) {
            const qwertyLetter = qwerty.children[i].children[j];
            qwertyLetter.className = '';
            qwertyLetter.disabled = false;
        }
    }
}

//deleting old phrase
function deletePhrase() {
    let letterList= document.querySelectorAll('#phrase li');
    if(letterList.length > 0) {
        for (let i = 0; i < letterList.length; i++) {
            letterList[i].remove();
        }
    }
}

//reseting heart images
function resetTries() {
    for (let i = 0; i < tries.length; i++) {
        tries[i].src = "images/liveHeart.png";
    }
}