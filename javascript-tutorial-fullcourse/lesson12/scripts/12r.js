// we're a setting a default value if score is null
// default operator: ||
// if left truthy, use left
// if left falsy, use right as default value
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

/*
if (!score) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  }
}
*/

let isAutoPlaying = false;
let intervalId;

// const autoPlay = () => {

// };
function autoPlay() {
  const buttonElement = document.querySelector('.js-auto-play-button');
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    buttonElement.innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    buttonElement.innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    showConfirmationMessage();
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showConfirmationMessage();
  }
});

function showConfirmationMessage() {
  document.querySelector('.js-confirmation-message')
    .innerHTML = `
      Are you sure you want to reset the score?
      <button class="reset-confirm-button js-reset-confirm-button-yes">Yes</button>
      <button class="reset-confirm-button js-reset-confirm-button-no">No</button>
  `;

  document.querySelector('.js-reset-confirm-button-yes')
    .addEventListener('click', () => {
      resetScore();
      hideConfirmationMessage();
  });

  document.querySelector('.js-reset-confirm-button-no')
    .addEventListener('click', () => {
      hideConfirmationMessage();
  });
}

function hideConfirmationMessage() {
  document.querySelector('.js-confirmation-message')
    .innerHTML = '';
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}



function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else {
      result = 'Tie.';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else {
      result = 'You lose.';
    }
  } else {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else {
      result = 'You win!';
    }
  }

  if (result === 'You win!') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;

  document.querySelector('.js-moves')
    .innerHTML = `You
                  <img src="images/${playerMove}-emoji.png" alt="" class="move-icon">
                  <img src="images/${computerMove}-emoji.png" alt="" class="move-icon">
                  Computer`;
}

function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';
  
  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}