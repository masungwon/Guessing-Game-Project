/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber(),
    guessArr = [],
    remainingGuess = 3;

//TODO also I might want to make sure that the Player is not entering anything that's not a number
//Need to display the remainingGuess count

/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber(){
	return Math.floor(100 * Math.random() + 1);
}

// Fetch the Players Guess
function playersGuessSubmission(){
//  $('#submit').on('click', function(){
    playersGuess = parseInt($('#guess').val()); //TODO how do I read the input?!
    console.log(playersGuess);
    $('#guess').val('');
    $('#hint').val(''); //TODO what is the difference between .text() and .val()?
    checkGuess();
//  });
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
  //enter this function only if winningNumber != playersGuess
  if(winningNumber > playersGuess) {
    return "lower"; //"Your guess is lower"
  }
  if(winningNumber < playersGuess) {
    return "higher"; //"Your guess is higher"
  }
};

// Return a string that will be used in the DOM message when
// the checkGuess function is invoked
function guessMessage() {
  var message = "Your guess is " + lowerOrHigher();
  if (Math.abs(winningNumber - playersGuess) < 5) {
    message += " and within 5 digits of the winning number";
    return message;
  }
  if (Math.abs(winningNumber - playersGuess) < 10) {
    message += " and within 10 digits of the winning number";
    return message;
  }
  if (Math.abs(winningNumber - playersGuess) < 20) {
    message += " and within 20 digits of the winning number";
  }
  message += " and 20 or more digits away from the winning number";
  return message;
}

// Check if the Player's Guess is the winning number
function checkGuess(){
  if (winningNumber == playersGuess){
    $('#message').text("You win!"); //TODO this line is not showing up?!
    //TODO add more stuff here to congratulate the Player
  } else if (guessArr.indexOf(playersGuess) != -1){
    $('#message').text("You submitted a duplicate number! Try again"); //TODO this line is not showing up?!
  } else {
    if (remainingGuess != 0) {
      $('#message').text(guessMessage()); //TODO this line is not showing up?!
      remainingGuess-=1;
      guessArr.push(playersGuess);
    } else {
      // remainingGuess == 0
      // TODO the Player lost! They're a loser!!
    }
  }
}

//TODO what the heck is going on in this code?
function guessesRemaining() {
    remainingGuess > 2 ? (remainingGuess -= 1,
    document.getElementById("guess-count").innerHTML = remainingGuess + " Guesses Remaining") : 2 === playerGuessCount ? (playerGuessCount -= 1,
    document.getElementById("guess-count").innerHTML = remainingGuess + " Guess Remaining") : document.getElementById("guess-count").innerHTML = "Sorry, play again!"
};

// Display the hint when the "hint" button is clicked
function provideHint(){
  var optionsArr = [];
  var dummyVal1 = Math.floor(100 * Math.random() + 1);
  var dummyVal2 = Math.floor(100 * Math.random() + 1);
  optionsArr.push(winningNumber, dummyVal1, dummyVal2);
//  shuffle(optionsArr);
  optionsArr.join(', ');
  var hintMessage = "One of these values is the winning number: " + optionsArr + ". Submit a guess!";
  //TODO I might want to make sure that the Player can only click the hint button once
  //TODO how might I add an image to the website? (https://i.ytimg.com/vi/lU3t91UUgF0/maxresdefault.jpg)
  $('#hint').text(hintMessage);
}

// Fisher-Yates Shuffle algorithm, found on StackOverflow
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Allow the "Player" to Play Again
function playAgain(){
  winningNumber = generateWinningNumber(),
  guessArr = [],
  remainingGuess = 5;
  $('#guess').val('');
  $('#message').val('');
  $('#hint').val('');
  //TODO what do the following 3 lines do?
  textStatus.innerHTML = "Your game has been restarted. Submit a new guess!",
  document.getElementById("guess-count").innerHTML = "",
  document.getElementById("playersGuess").value = ""
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function(){
  $('#submit').click( function(event){
    event.preventDefault(); //prevents the page from reloading?
    playersGuessSubmission();
  })
  $("#getHint").click( function(event){
    event.preventDefault();
    provideHint();
  });
});
