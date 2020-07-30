// declare all available characters in separate categories
var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var lowerCase = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var specials = "!#%&?@\_";
// declare flags
var flagUpper = false;
var flagLower = false;
var flagNums = false;
var flagSpecials = false;
// declare checkboxes to use in code
var checkboxUpper, checkboxLower, checkboxNumbers, checkboxSpecials;
var length;
var categories = [];


function setup() {
  noCanvas();
  checkboxUpper = select("#checkboxUpper");
  checkboxUpper.changed(changeFlags);
  checkboxLower = select("#checkboxLower");
  checkboxLower.changed(changeFlags);
  checkboxNumbers = select("#checkboxNumbers");
  checkboxNumbers.changed(changeFlags);
  checkboxSpecials = select("#checkboxSpecials");
  checkboxSpecials.changed(changeFlags);
  var generate = select("#buttonGenerate");
  generate.mousePressed(generatePassword);
  var password = select("#password");
  password.mousePressed(copyPassword);
  
}

function generatePassword() {
    // get length from the input
	length = select("#inputLength").value();
	checkConstraints();
    // create arrays for password and chosen options
	var password = [];
    var chars = categories.join("");
    // append characters to password up to required length
    for(var i = 0; i < length; i++) {
      password[i] = chars.charAt(random(chars.length));
    }
    // output the password
	select("#password").value(password.join(""));
}

function copyPassword() {
  // save returned password to the clipboard
  var copy = document.getElementById("password");
  copy.select();
  copy.setSelectionRange(0, 100);
  document.execCommand("copy");
}

function checkConstraints() {
    // if no options were chosen then password will be all in uppercase
	if (flagUpper === false &&
			flagLower === false &&
			flagNums === false &&
			flagSpecials === false) {
		flagUpper = true;
	}
    // if length was not specified or is smaller than 1, use default length
	if (length < 1) {
		length = 12;
	}
    // maximum length of a password is 100 characters
	if (length > 100) {
		length = 100;
	}
    // use only the options that the user has chosen
    categories = [];
    if (flagUpper) {
      categories.push(upperCase);
    }
    if (flagLower) {
      categories.push(lowerCase);
    }
    if (flagNums) {
      categories.push(numbers);
    }
    if (flagSpecials) {
      categories.push(specials);
    }
}

// update flags whenever a choice was made
function changeFlags() {
  flagUpper = checkboxUpper.checked();
  flagLower = checkboxLower.checked();
  flagNums = checkboxNumbers.checked();
  flagSpecials = checkboxSpecials.checked()
}