var userEmail = document.getElementById("log-email");
var userPassword = document.getElementById("log-password");

function login(email, password) {
    const user = {email: email, password: password};
    //access database, for now say database gives the following data
    const userData = [{email:"ccosbey@gmail.com", password:"abc123"}, {email:"cg@gmail.com", password:"pasS"}];
    
    for (let u of userData) {
        if (u.name == user.name && u.password == user.password) {
            document.cookie = `username=${user.email}`;
            document.getElementById('footer').innerHTML = "Logged in :)";
            return;
        }
    }
    
    document.getElementById('footer') = "Could not log in, please try again";
}