const {getFirstNameByEmailAndPassword} = require('./database.js'); // Ensure this matches the exported function

var loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", userLogin);
let firstName = "testing!";

function userLogin() {
    document.getElementById("login-output").textContent = "Trying to log in!";
    var userEmail = document.getElementById("log-email").value;
    var userPassword = document.getElementById("log-password").value;

    //debug info, remove later!
    console.log("Email:", userEmail);  // Debug log
    console.log("Password:", userPassword);  // Debug log

    // Call the function and pass the email and password values
    getFirstNameByEmailAndPassword(userEmail, userPassword, function(err, firstName) {
        if (err) {
            document.getElementById("login-output").textContent = "Invalid Email or Password, please try again.";
            console.error(err);
        } else {
            document.getElementById("login-output").textContent = "Welcome, " + firstName;
        }
    });
}


// var loginButton = document.getElementById("login-button");
// loginButton.addEventListener("click", userLogin);
// const { getFNfromEmailAndPassword } = require('./database'); // Adjust the path as necessary



// function userLogin() {
//     document.getElementById("login-output").textContent = "trying to log in!";
//     var userEmail = document.getElementById("log-email").value;
//     var userPassword = document.getElementById("log-password").value;
//     // var foundEmail = "";
//     // var foundPass = "";

//     getFNfromEmailAndPassword(userEmail, userPassword, function(err, firstName) {
//         if (err) {
//             document.getElementById("login-output").textContent = "Invalid Email or Password, please try again.";
//             console.error(err);
//         } else {
//             console.log("First name:", firstName);
//             document.getElementById("login-output").textContent = "Welcome, " + firstName;
//         }
//     });
// }
//     // if (userPassword.length == 0 || userEmail.length == 0) {
//     //     // return error here, please enter a valid email and password
//     //     document.getElementById("login-output").textContent   = "Invalid Email or Password, please try again.";
//     // } else {
//     //     //connect to db here, can't be done till db details exist
//     //     //search db for email, cant be done till db details exist
//     //     if (foundEmail == "") {
//     //         //return error, no email exists
//     //         document.getElementById("login-output").textContent   = "Invalid Email or Password, please try again.";
//     //         window.location.href = "index.html";
//     //     } else {
//     //         if (userPassword === foundPass) { //triple = for case sensitiveness
//     //             //logged in!
//     //         } else {
//     //             //error, incorrect username or password entered
//     //             document.getElementById("login-output").textContent   = "Invalid Email or Password, please try again.";
//     //         }
//     //     }
//     // }

// //}



// function loggedIn(name, value, hours) {
//     let expires = "";
//     if (hours) {
//         const date = new Date();
//         date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); //expires after 1 hour
//         expires = "; expires=" + date.toUTCString();
//     }
//     document.cookie = name + "=" + (value || "") + expires + "; path=/";
// }

// function userLogout() {
//     setCookie("loggedIn", "", -1);  // Expire the cookie
//     window.location.href = "home.html";  // Redirect to login page after logout
// }





// // function login(email, password) {
// //     const user = {email: email, password: password};
// //     //access database, for now say database gives the following data
// //     const userData = [{email:"ccosbey@gmail.com", password:"abc123"}, {email:"cg@gmail.com", password:"pasS"}];
    
// //     for (let u of userData) {
// //         if (u.name == user.name && u.password == user.password) {
// //             document.cookie = `username=${user.email}`;
// //             document.getElementById('footer').innerHTML = "Logged in :)";
// //             return;
// //         }
// //     }
    
// //     document.getElementById('footer') = "Could not log in, please try again";
// // }