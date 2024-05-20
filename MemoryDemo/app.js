// 1. SELECTORS//
// These elements represent different sections of the game: introduction, game mode, play button, and end screen, respectively.



const intro = document.querySelector(".intro");
const gamemode = document.querySelector(".game-mode");
let playbtn = document.querySelector(".play-btn");
let lockBoard = false; 
const end = document.querySelector('.end');

// 2. DOMContentLoaded Event:
// When the DOM content is fully loaded, the code sets the initial display of the intro, game mode, and end sections.
//It retrieves the high score from local storage and updates the score display accordingly.

document.addEventListener("DOMContentLoaded", function () {
  intro.style.display = "block";
  gamemode.style.display = "none";
  end.style.display = "none";

  let highScore = localStorage.getItem("highscore");
  let score = document.querySelectorAll('.score span');
  if(highScore) {
    score[0].innerHTML = highScore;
  }else{
    score[1].innerHTML = '0';
  }
});

// 3. Play Button Click Event:

// When the play button is clicked, the game mode section is displayed while the intro section is hidden.

playbtn.addEventListener("click", function (e) {
  gamemode.style.display = "flex";
  intro.style.display = "none";
});

let cards = document.querySelectorAll(".card-flip");
let score  = document.querySelectorAll('.score span');
let moveCount = 0;
function move(){
  moveCount++
  score[2].innerText = moveCount;
}

// 4. Card Click Event:
// When a card is clicked (flipCard function), it flips if the board is not locked (no more than two cards flipped).
// It checks whether it's the first or second card clicked and stores them accordingly.
// If two cards are flipped, it compares their data-card attributes.
// If they match, their event listeners are removed, and the score is updated.
// If not, the board is locked temporarily, and after a delay, the cards are flipped back.

function flipCard() {
  if (lockBoard) return; // Don't flip if more than 2 cards are already flipped
  this.classList.add('flipped');
  


  
  if (!hasFlippedCard) {
    // on the first click
    hasFlippedCard = true;
    firstCard = this;  
  } else {
    // on the second click
    move();
    hasFlippedCard = false;
    secondCard = this;
   

    if (firstCard.dataset.card === secondCard.dataset.card) {
      let score  = document.querySelectorAll('.score span');
      // it's a match
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
      
        if(firstCard.dataset.card === secondCard.dataset.card){
          score[1].innerText = parseInt(score[1].innerHTML) + 10 ;
          
        }

      

        if (parseInt(score[1].innerHTML) > parseInt(score[0].innerHTML)) {
          score[0].innerHTML = score[1].innerHTML;
          localStorage.setItem("highscore", score[0].innerHTML);
        }

        if(score[1].innerText == 80){
          end.style.display = "flex";
          gamemode.style.display = "none";
        }

    } else {
      lockBoard = true; // Lock the board
      // not a match
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        lockBoard = false; // Unlock the board
      }, 1000);
    }
  }
}

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", flipCard);
}

// 5. Restart Button Click Event:

// When the restart button is clicked, the following actions are performed:
// Flipped cards are cleared.
// Event listeners for card clicks are reattached.
// Cards are shuffled.
// Scores are reset, and move count is set to zero.


document.querySelector(".restartbtn").addEventListener("click", function () {
  // Clear the flipped cards
  for (let card of cards) {
    card.classList.remove('flipped');
    card.addEventListener('click', flipCard);
  }

  // Shuffle the cards
  const cardsContainer = document.querySelector(".cards");
  for (let i = cardsContainer.children.length; i >= 0; i--) {
    cardsContainer.appendChild(
      cardsContainer.children[(Math.random() * i) | 0]
    );
  }

  score[1].innerText = '0';
  score[2].innerText = '0';
  moveCount = 0;
});



let hasFlippedCard = false;
let firstCard, secondCard;