const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notif-container');
const finalMessage = document.getElementById('final-msg');
const figureParts = document.querySelectorAll('.figure-part');


const words = ['application', 'programming', 'interface', 'wizard'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(letter => `
      <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
      </span>`
    ).join('')}
  `;
  
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if(innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won!😃';
    popup.style.display = 'flex';
  }
}

function updateWrongLettersEl(){
  // Display wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
  ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts
  figureParts.forEach((part, idx) => {
    const errors = wrongLetters.length;

    if(idx < errors) {
      part.style.display = 'block';
    }else {
      part.style.display = 'none';
    }
  })

  // Check if lost
  if(wrongLetters.length === figureParts.length){
    finalMessage.innerText = 'Unfortunately you lost.😞';
    popup.style.display = 'flex';
  }
}

function showNotification(){
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000);
}

window.addEventListener('keydown', e => {
  const pattern = /^[a-zA-Z]/;
  // if(e.keyCode >= 65 && e.keyCode <= 90)
  if(pattern.test(e.key)) {
    const letter = e.key.toLowerCase();

    if(selectedWord.includes(letter)){
      if(!correctLetters.includes(letter)){
        correctLetters.push(letter);

        displayWord();
      }else {
        showNotification();
      }
    } else {
      if(!wrongLetters.includes(letter)){
        wrongLetters.push(letter);

        updateWrongLettersEl()
      }else {
        showNotification()
      }
    }
  }
})

// Restart Game
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)]

  displayWord();
  updateWrongLettersEl();
  popup.style.display = 'none'
})

displayWord();