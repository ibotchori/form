var form = document.getElementById("form");
var username = document.getElementById("username");
var date = document.getElementById("date");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password2 = document.getElementById("password2");

// Show input error message
function showEror(input, message) {
  var formControl = input.parentElement;
  formControl.className = "form-control error";
  var small = formControl.querySelector("small");
  small.innerText = message;
}

//Show success
function showSuccess(input) {
  var formControl = input.parentElement;
  formControl.className = "form-control success";
}

// Ckeck email is valid
function checkEmail(input) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showEror(input, "Email is not valid");
  }
}
//Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showEror(
      input,
      getFieldName(input) + " must be at least " + min + " characters"
    );
  } else if (input.value.length > max) {
    showEror(
      input,
      getFieldName(input) + " must be less than " + max + " characters"
    );
  } else {
    showSuccess(input);
  }
}

// Check required field
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showEror(input, getFieldName(input) + " is requred");
    } else {
      showSuccess(input);
    }
  });
}

//Check Date
function checkDate(input) {
  var days = input.value.substring(0, 2);
  var month = input.value.substring(3, 5);
  var years = input.value.substring(6, 10);
  if (parseInt(days) < 1 || parseInt(days) > 31) {
    showEror(date, "Data is no valid");
  } else if (parseInt(month) < 1 || parseInt(month) > 12) {
    showEror(date, "Data is no valid");
  } else if (parseInt(years) < 2020) {
    showEror(date, "Data is no valid");
  }
  console.log(parseInt(days));
}

//Check password match
function chekPassworMath(input1, input2) {
  if (input1.value !== input2.value) {
    showEror(input2, "Password do not match");
  }
}

// Get Field Name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2, date]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 15);
  checkLength(date, 10, 10);
  checkEmail(email);
  chekPassworMath(password, password2);
  checkDate(date);
});
