// Function to get the cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to check if the user is logged in
function checkLoginStatus() {
    const loggedIn = getCookie("loggedIn");
    return loggedIn === "true";  // returns true if user is logged in, otherwise false
}

// Redirect the user to the login page if not logged in
function enforceLogin() {
    if (!checkLoginStatus()) {
        window.location.href = "login.html";  // Redirect to login page if not logged in
    }
}

// Redirect user to the home page if they try to access the login page while logged in
function redirectIfLoggedIn() {
    if (checkLoginStatus()) {
        window.location.href = "home.html";  // Redirect to home if already logged in
    }
}