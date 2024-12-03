// import data from './user-data.json';
// console.log(data)



// public interface JsonArray;
// extends JsonStructure, List<JsonValue>;
//load libraries used (fs)
// var fs = require('fs');

// //import json data
// const jsonUserData = require('./user-data.json');

// var obj = JSON.parse(jsonUserData);

// var el = document.getElementById("create-account-button").addEventListener("click", createAccount);
// if (el.addEventListener)
//     el.addEventListener("click", createAccount, false);
// else if (el.attachEvent)
//     el.attachEvent('onclick', createAccount);


// var data = fs.readFileSync('user-data.json');
// var myUsers = JSON.parse(data);

// JsonArray users = Json.

//import json data!!
// import users-data from "./user-data.json" assert { type: json };


function createAccount() {
    //needed down the line!!
    var fs = require('fs');
    //variables new info will be put into, default values input
    var newID = "-1";
    var fnameinput = "FirstNameMissing";
    var lnameinput = "LastNameMissing";
    var emailinput = "placeholderEmail";
    var passwordinput = "";
    var passwordconfirmation = "";
    var utypeinput = null;

    //output location
    const textOutput = document.getElementById("login-output");

    //take all input data, utype not selectable atm
    fnameinput = document.getElementById("InputFname").value;
    lnameinput = document.getElementById("InputLname").value;
    emailinput = document.getElementById("InputEmail").value;
    passwordinput = document.getElementById("InputPassword").value;
    passwordconfirmation = document.getElementById("password-conf").value;

    //update this later, for now non-patients must be added manually
    utypeinput = "pt";

    //input validation
    if (fnameinput == "" || lnameinput == "") {
        textOutput.innerHTML = "Please enter your full name.";
    } else if (emailinput == "") {
        textOutput.innerHTML = "Please enter a valid email.";
    } else if (passwordinput == "" || passwordconfirmation == "" ) {
        textOutput.innerHTML = "Please enter a password.";
    } else if (passwordinput != passwordconfirmation) {
        textOutput.innerHTML = "Passwords don't match, please try again!";
    } else {
        textOutput.innerHTML = "Creating Account, please wait a moment!";
        //json time!

        //import json file
        // const jsonUserData = require('./user-data.json');
        // var obj = JSON.parse(jsonUserData);

        //put user data in object
        let newUser = {
            "id": newID,
            "fname": fnameinput,
            "lname": lnameinput,
            "email": emailinput,
            "password": passwordinput,
            "utype": "pt"
        }
        const newJSONUser = JSON.stringify(newUser);

        //push to json file!

    }



    console.log("right before json attempts\n");
    let rawUserData = fs.readFileSync('users-data.json');
    console.log("1\n");
    let usersData = JSON.parse(rawUserData)
    
    
    // console.log("right before json attempts\n");
    // //import json data
    // const jsonUserData = fetch('./user-data.json')
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));

    // console.log("1\n");
    
    // var obj = JSON.parse(jsonUserData);
    console.log("2\n");
    //put new data into object and push to json file
    obj['users'].push({"id":newID,"fname":fnameinput, "lname":lnameinput, "email":emailinput, "password":passwordinput, "utype":utypeinput});
    //testing info
    console.log("3\n");
    jsonStr = JSON.stringify(obj);
    console.log("4\n");
    console.log(jsonStr);
}





