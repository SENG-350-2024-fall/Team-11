var userEmail = document.getElementById("log-email");
var userPassword = document.getElementById("log-password");

var loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", userLogin);



function userLogin(userEmail, userPassword) {
    var foundEmail = "";
    var foundPass = "";
    if (userPassword.length == 0 || userEmail.length == 0) {
        // return error here, please enter a valid email and password
        document.getElementById("login-output").innerHTML = "Invalid Email or Password, please try again";
    } else {
        //connect to db here, can't be done till db details exist
        //search db for email, cant be done till db details exist
        if (foundEmail == "") {
            //return error, no email exists
            document.getElementById("login-output").innerHTML = "Invalid Email or Password, please try again";
        } else {
            if (userPassword === foundPass) { //triple = for case sensitiveness
                //logged in!
            } else {
                //error, incorrect username or password entered
                document.getElementById("login-output").innerHTML = "Invalid Email or Password, please try again";
            }
        }
    }

}






// function login(email, password) {
//     const user = {email: email, password: password};
//     //access database, for now say database gives the following data
//     const userData = [{email:"ccosbey@gmail.com", password:"abc123"}, {email:"cg@gmail.com", password:"pasS"}];
    
//     for (let u of userData) {
//         if (u.name == user.name && u.password == user.password) {
//             document.cookie = `username=${user.email}`;
//             document.getElementById('footer').innerHTML = "Logged in :)";
//             return;
//         }
//     }
    
//     document.getElementById('footer') = "Could not log in, please try again";
// }