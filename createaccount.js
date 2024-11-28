// import data from './user-data.json';
// console.log(data)



// public interface JsonArray;
// extends JsonStructure, List<JsonValue>;
//load libraries used (fs)
// const fs = require('fs');

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

function createAccount() {
    //variables new info will be put into, default values input
    var newID = null;
    var fnameinput = "FirstNameMissing";
    var lnameinput = "LastNameMissing";
    var emailinput = "placeholderEmail";
    var passwordinput = null;
    var utypeinput = null;

    const textElem = document.getElementById("login-output")
    textElem.innerHTML = "Creating Account, please wait a moment!";






    // //put new data into object and push to json file
    // obj['users'].push({"id":newID,"fname":fnameinput, "lname":lnameinput, "email":emailinput, "password":passwordinput, "utype":utypeinput});
    // //testing info
    // jsonStr = JSON.stringify(obj);
}





