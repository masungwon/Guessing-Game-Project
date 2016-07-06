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
    playersGuess = parseInt($('#guess').val());
    $('#guess').val('');
    $('#hint').val('');
    checkGuess();
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
    $('#message').text("You win!");
    //TODO add more stuff here to congratulate the Player?
  } else if (guessArr.indexOf(playersGuess) != -1){
    $('#message').text("You submitted a duplicate number! Try again");
  } else {
    // if (remainingGuess != 0) {}
    if (remainingGuess != 1) {
      $('#message').text(guessMessage());
      remainingGuess-=1;
      guessesRemaining();
      guessArr.push(playersGuess);
    } else {
      // remainingGuess == 0
      $('#message').text("You lose! Try again!");
      raminingGuess==0;
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
    $('#guess-count').text("You used up all your guesses. You lose!"); //TODO 1 Guess Remaining is not updating to "You used up all your Guesses"
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
  //TODO I might want to make sure that the Player can only click the hint button once
  //TODO how might I add an image to the website? (https://i.ytimg.com/vi/lU3t91UUgF0/maxresdefault.jpg)
  $('#hint').text(hintMessage);
}

// Allow the "Player" to Play Again
function playAgain(){
  winningNumber = generateWinningNumber(),
  guessArr = [],
  remainingGuess = 5;
  playersGuess = -1; //TODO how do I reset playersGuess?
  $('#guess').val('');
  $('#message').val('Your game has been restarted. Submit a new guess!');
  $('#hint').val('');
  $("guess-count").val('');
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
