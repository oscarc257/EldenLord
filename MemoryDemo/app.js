const intro = document.querySelector(".intro");
const gamemode = document.querySelector(".game-mode");
let playbtn = document.querySelector(".play-btn");
let lockBoard = false; 
const end = document.querySelector('.end');


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