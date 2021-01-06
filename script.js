const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreContainer = document.getElementById('score-container');
const timeContainer = document.getElementById('time-container');
const gameFinished = document.getElementById('game-over');

//Array of 30 words
const wordsArray = ['sigh', 'tense', 'airplane', 'ball', 'juice', 'limited', 'ironic', 'regard', 'whom', 'grammar', 'colonel', 'interested', 'enormity', 'tenant', 'unabashed', 'embarrass', 'food', 'excellent', 'height', 'poor', 'bad', 'knowledge', 'edible', 'party', 'system', 'switch', 'arctic', 'querty', 'window', 'castle'];

let randomWord;
let scoreCounter = 0;
let timeCounter = 10;
let flag = false;

text.focus();

//Adding word to DOM
function addWordToDOM() 
{
  randomWord = generateWords();
  word.innerHTML = randomWord;
}

//Pick random word from array
function generateWords() 
{
  return wordsArray[Math.floor(Math.random() * wordsArray.length)];
}

//EventListener to generate next word
text.addEventListener('input', myFunction);

function myFunction(e) 
{
  const insertedText = e.target.value;

  //Equating user typed word and generated word
  if (insertedText === randomWord) 
  {
    addWordToDOM();
    updateScore();

    //If user reached maximum score then call gameOver()
    if (scoreCounter === 30) 
    {
      flag = true;
      text.removeEventListener('input', myFunction);
      gameOver();
    } 
    else //else update time
    {
      e.target.value = '';
      if(scoreCounter === 15 || scoreCounter === 25)
      timeCounter -= 1;
      else
      timeCounter += 3;
      updateTime();
    }
  }
}

//Updating score
function updateScore() 
{
  scoreCounter++;
  scoreContainer.innerHTML = scoreCounter;
}

//Running the timer and updating it after every 1 second
const timeInterval = setInterval(updateTime, 1000);

//Updating time
function updateTime() 
{
  timeCounter--;
  timeContainer.innerHTML = timeCounter + 's';

  //Condition to check if user has run of time
  if (timeCounter === 0) 
  {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() 
{
  //Condition to check if user reached maximum score of 30
  if (flag === true) 
  {
    gameFinished.style.display = 'flex';
    gameFinished.innerHTML = `<h1 class="result-head">You are a legend.</h1>
                              <p class="result-para">You have scored a maximum 30.</p>
                              <button onclick="location.reload()">Play Again</button>`;
  } 
  else 
  {
    gameFinished.style.display = 'flex';
    gameFinished.innerHTML = `<h1 class="result-head">Time ran out</h1>
                              <p class="result-para">Your final score is ${scoreCounter}.</p>`;

    let elem = document.createElement("p");

    if (scoreCounter <= 10) 
    {
      elem.innerHTML = `Your typing speed is Bad.`;
      elem.className = "result-para";
      gameFinished.appendChild(elem);
    } 
    else if (scoreCounter >= 11 && scoreCounter <= 20) 
    {
      elem.innerHTML = `Your typing speed is Good.`;
      elem.className = "result-para";
      gameFinished.appendChild(elem);
    } 
    else 
    {
      elem.innerHTML = `Your typing speed is Awesome.`;
      elem.className = "result-para";
      gameFinished.appendChild(elem);
    }

    let button = document.createElement("button");
    button.innerHTML = "Try Again";
    button.onclick = function () 
    {
      location.reload()
    }
    gameFinished.appendChild(button);
  }
}

addWordToDOM();