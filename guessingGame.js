/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber(),
    guessArr = [],
    remainingGuess = 3;

/* **** Guessing Game Functions **** */

// Generate the Winning Number
function generateWinningNumber(){
	return Math.floor(100 * Math.random() + 1);
}

// Fetch the Players Guess
function playersGuessSubmission(){
    playersGuess = parseInt($('#guess').val());
    $('#guess').val('');
    $('#hint').val('');
    checkGuess();
}

// Determine if the next guess should be a lower or higher number
function lowerOrHigher(){
  if(winningNumber > playersGuess) {
    return "lower";
  }
  if(winningNumber < playersGuess) {
    return "higher";
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
    $('#message').text('');
    $('#guess-count').text("YOU WON!!!!! CONGRATULATIONS!!!");
    //TODO how might I add an image to the website? (https://i.ytimg.com/vi/lU3t91UUgF0/maxresdefault.jpg)
    //changing visibility with jquery
    $('#hint').text('');
  } else if (guessArr.indexOf(playersGuess) != -1){
    $('#message').text("You submitted a duplicate number! Try again");
  } else {
    if (remainingGuess != 1) {
      $('#message').text(guessMessage());
      remainingGuess-=1;
      guessesRemaining();
      guessArr.push(playersGuess);
    } else {
      remainingGuess = 0;
      $('#message').text('');
      $('#hint').text('');
      //TODO how might I add an image to the website? (https://i.ytimg.com/vi/lU3t91UUgF0/maxresdefault.jpg)
      //changing visibility with jquery
      guessesRemaining();
    }
  }
}

// Display number of guesses remaining
function guessesRemaining() {
  if(remainingGuess == 2) {
    $('#guess-count').text("2 Guesses Remaining");
  }
  if (remainingGuess == 1) {
    $('#guess-count').text("1 Guess Remaining");
  }
  if (remainingGuess == 0) {
    //TOOD we never get here
    $('#guess-count').text("You used up all your guesses. You lose!");
  }
}

// Display the hint when the "hint" button is clicked
function provideHint(){
  var optionsArr = [];
  var dummyVal1 = Math.floor(100 * Math.random() + 1);
  var dummyVal2 = Math.floor(100 * Math.random() + 1);
  optionsArr.push(winningNumber, dummyVal1, dummyVal2);
  optionsArr.join(', ');
  var hintMessage = "One of these values is the winning number: " + optionsArr + ". Submit a guess!";
  $('#hint').text(hintMessage);
}

// Allow the "Player" to Play Again
function playAgain(){
  winningNumber = generateWinningNumber(),
  guessArr = [],
  remainingGuess = 3;
  playersGuess = -1;
  $('#guess-count').text("3 Guesses Remaining");
  $('#guess').val('');
  $('#message').text('Your game has been restarted. Submit a new guess!');
  $('#hint').val('');
}


/* **** Event Listeners/Handlers ****  */
$(document).ready( function(){
  $('#submit').click( function(event){
    event.preventDefault();
    playersGuessSubmission();
  });

  $('#guessBox').keyup( function(event){
    if (event.keyCode == 13 || event.which == 13){
      debugger
      console.log("Enter got pressed");
      debugger
      event.preventDefault();
      playersGuessSubmission();
    }
  });

  $("#getHint").click( function(event){
    event.preventDefault();
    provideHint();
  });

  $('#again').click( function(event) {
    playAgain();
  })
});
