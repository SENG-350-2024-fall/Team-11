// import db from './database.js';


// event listener, submit button clickage
let button = document.querySelector('#submit-button');
button.addEventListener("click", createAccount);


function createAccount() {
    // //needed down the line!!
    // var fs = require('fs');
    // //variables new info will be put into, default values input
    var newID = "-1";
    var fnameinput = "FirstNameMissing";
    var lnameinput = "LastNameMissing";
    var emailinput = "placeholderEmail";
    var passwordinput = "";
    var passwordconfirmation = "";
    var utypeinput = null;

    //output location
    const textOutput = document.getElementById("login-output");

    textOutput.innerHTML = "Testing!";

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

        //get maxUID for incrementing purposes (ie if a user is deleted their uid remains unique, to ensure no cross-contamination with Patients table)
        var newUID = getNewUID()

        // var sqlInsert = "INSERT INTO Users (fname, lname, email, password, utype, uid) VALUES ?";

        // // var newUID = con.query();
        // var values = [fnameinput, lnameinput, emailinput, passwordinput, "pt", newUID];

        // db.query(sqlInsert, [values], function (err, result) {
        //     if (err) throw err;
        //     console.log("Number of records inserted: " + result.affectedRows);
        //   });

        // let newUser = {
        //     "id": newID,
        //     "fname": fnameinput,
        //     "lname": lnameinput,
        //     "email": emailinput,
        //     "password": passwordinput,
        //     "utype": "pt"
        // }
        // const newJSONUser = JSON.stringify(newUser);

        // //push to json file!

    }



    // console.log("right before json attempts\n");
    // let rawUserData = fs.readFileSync('users-data.json');
    // console.log("1\n");
    // let usersData = JSON.parse(rawUserData)
    
    
    // // console.log("right before json attempts\n");
    // // //import json data
    // // const jsonUserData = fetch('./user-data.json')
    // //     .then((response) => response.json())
    // //     .then((json) => console.log(json));

    // // console.log("1\n");
    
    // // var obj = JSON.parse(jsonUserData);
    // console.log("2\n");
    // //put new data into object and push to json file
    // obj['users'].push({"id":newID,"fname":fnameinput, "lname":lnameinput, "email":emailinput, "password":passwordinput, "utype":utypeinput});
    // //testing info
    // console.log("3\n");
    // jsonStr = JSON.stringify(obj);
    // console.log("4\n");
    // console.log(jsonStr);
}

async function getNewUID() {
    const query = 'SELECT MAX(uid) AS maxUid FROM Users';
    try {
        const response = await fetch('http://localhost:3000/api/users');  // Fetch data from the server
        const data = await response.json();  // Parse the response as JSON

        if (response.ok) {
            // Assuming data contains an array of users and the max uid is calculated server-side
            const maxUid = data[0]?.maxUid || 0;  // Get the maxUid from the response (if it exists)
            const newUID = maxUid + 1;  // Increment maxUid to get the new unique ID
            return newUID;  // Return the new unique ID
        } else {
            throw new Error('Failed to fetch max UID');
        }
        // const [rows] = await db.execute(query); // Use db.query(query) if not using prepared statements
        // const maxUid = rows[0].maxUid || 0; // Use 0 if there are no rows
        // const newUID = maxUid + 1; // Increment to generate the new unique ID
        // return newUID;
    } catch (error) {
        console.error('Error fetching max uid:', error);
        throw error;
    }
}



