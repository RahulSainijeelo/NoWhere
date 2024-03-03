document.addEventListener("DOMContentLoaded",()=>{
  
const inputs = document.querySelectorAll(".inpnew");
const messageDivs = document.querySelectorAll(".error");

function showMessage(messageDiv, message, color) {
  messageDiv.textContent = message;
  messageDiv.style.color = color;
};

function changeBorderColor(input, color) {
  input.style.borderColor = color;
};

function validateInput(input, messageDiv) {
  let message = "";
  let color = "";

  if (input.validity.valueMissing) {
    if (input.id === "titlenew") {
      message = "Please enter a Title!";
    } else if (input.id === "descnew") {
      message = "Plese enter a Description!";
    } else if (input.id === "imagenew") {
      message = "Please enter Valid image link!";
    } else if (input.id === "pricenew") {
      message = "Please enter a Price!";
    } else if (input.id === "locationnew") {
      message = "Please enter a Location!";
    } else if (input.id === "countrynew") {
      message = "Please enter a country!";
    } else if (input.id === "commentshow") {
      message = "Please a review!";
    } else if (input.id === "username") {
      message = "Please enter a username!";
    } else if (input.id === "password") {
      message = "Please enter a password!";
    } else if (input.id === "email") {
      message = "Enter a valid email!";
    } else if (input.id === "user") {
      message = "Please enter a username!";
    } else if (input.id === "pass") {
      message = "Please enter a password!";
    } else if (input.id === "imagenew") {
      message = "Please Choose a Image";
    }
    color = "red";
  } else {
    if (input.id === "titlenew") {
      message = "Awsome Title!";
    } else if (input.id === "descnew") {
      message = "Good Description!";
    } else if (input.id === "imagenew") {
      message = "Valid image Link!";
    } else if (input.id === "pricenew") {
      message = "Satisfying price, Isn't it ?";
    } else if (input.id === "locationnew") {
      message = "Looking well!";
    } else if (input.id === "countrynew") {
      message = "Great Contry!";
    } else if (input.id === "commentshow") {
      message = "Looking good!";
    } else if (input.id === "username") {
      message = "Good username!";
    } else if (input.id === "password") {
      message = "Valid password!";
    } else if (input.id === "email") {
      message = "Valid email!";
    } else if (input.id === "user") {
      message = "Good username!";
    } else if (input.id === "pass") {
      message = "Valid password!";
    }else if (input.id === "imagenew") {
      message = "Image Choosen";
    }
    color = "green";
  }

  showMessage(messageDiv, message, color);
  changeBorderColor(input, color);
};

function handleFocusOut(event) {
  const input = event.target;
  const messageDiv = input.nextElementSibling;
  validateInput(input, messageDiv);
};

inputs.forEach(function (input) {
  input.addEventListener("focusout", handleFocusOut);
});



if(document.getElementById("loginForm")){
  document.getElementById("loginForm").addEventListener("submit", function (event) {
    inputs.forEach(function (input, index) {
      const messageDiv = messageDivs[index];
      validateInput(input, messageDiv);
    });
  
    if (!this.checkValidity()) {
      event.preventDefault();
    }
  });
};

if(document.getElementById("signupfm")){
  document.getElementById("signupfm").addEventListener("submit", function (event) {
    inputs.forEach(function (input, index) {
      const messageDiv = messageDivs[index];
      validateInput(input, messageDiv);
    });
  
    if (!this.checkValidity()) {
      event.preventDefault();
    }
  });
};

if(document.getElementById("editlt")){
  document.getElementById("editlt").addEventListener("submit", function (event) {
    inputs.forEach(function (input, index) {
      const messageDiv = messageDivs[index];
      validateInput(input, messageDiv);
    });
  
  
    if (!this.checkValidity()) {
      event.preventDefault();
    }
  });
};

if(document.getElementById("newForm")){
  document.getElementById("newForm").addEventListener("submit", function (event) {
    inputs.forEach(function (input, index) {
      const messageDiv = messageDivs[index];
      validateInput(input, messageDiv);
    });
 
    if (!this.checkValidity()) {
      event.preventDefault();
    }
  });
};

if(document.getElementById("myForm")){
  document.getElementById("myForm").addEventListener("submit", function (event) {
    inputs.forEach(function (input, index) {
      const messageDiv = messageDivs[index];
      validateInput(input, messageDiv);
    });
 
    if (!this.checkValidity()) {
      event.preventDefault();
    }
  });
};

});