
//server side code 

//ED_view = http://localhost:300/nurse_users
//nurse_view = http://localhost:300/nurse_users
//Physician view  = http://localhost:300/nurse_users


const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
//let num=0;
let sseClients = [];
const filePath = 'patient_info.json';


class NewPatient {
    constructor(username, recordID, diagnosis, age) {
        this.username = username;
        this.recordID = recordID;
        this.diagnosis = diagnosis;
        this.age = age; 
    }
}

patient1 = new NewPatient("Tina Smith", "5675765", "Leg injury", "33");

// ObserverImplementation class
class ObserverImplementation {
    constructor() {
        this.observers = []; // Initialize an empty array to store observers
    }
    // Method to add an observer
    addObserver(observer) {
        this.observers.push(observer);
    }
    // Method to notify all observers about a new patient
    notifyObservers(patient) {
        this.observers.forEach(observer => observer(patient));
    }
    // Method to poll the database for new patients
    async pollDatabase(lastChecked) {
        try {
            //access data from database
           //return new patient from database
           return patient1 //new patient for testing 
        } catch (error) {
            console.error("Error querying the database:", error);
            throw error;
        } 
    }
}

// Instantiate ObserverImplementation
const observerManager = new ObserverImplementation();
// Route to add a new observer
observerManager.addObserver(incomingPatient);


//starts here!!!
(async function startPolling() {
    let lastChecked = new Date();  // initialize with current time
    console.log("Starting polling...");
    setInterval(async () => {
        try {
            const newPatients = await observerManager.pollDatabase(lastChecked);
            if (newPatients.username!='') {
                lastChecked = new Date(); // Update last checked timestamp
                observerManager.notifyObservers(newPatients); // Notify all observers
            }
        } catch (error) {
            console.error("Error polling database:", error);
        }
    }, 20000);
})();

//observer function
//fucntion send new patient alter
async function incomingPatient(patient) {
    sseClients.forEach(client => {
        client.write(`data: ${JSON.stringify(patient)}\n\n`);
    });    
    savedatatofile(patient);
}

function savedatatofile(patient) {
    fs.access(filePath, fs.constants.F_OK, (err) => { //checking
        if (err) {
            console.log('File does not exist. Creating a new file...');
            const data = [patient];  
            fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => { //create and write
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
                console.log('Patient info saved to new file!');
            });
        } 
        else {
            console.log('File exists. Updating it...');
            fs.readFile(filePath, 'utf8', (err, data) => { //read data 
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            let existingData = JSON.parse(data); //save existing data 
            existingData.push(patient); // update data   
            fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (err) => { // Write back to file
            if (err) {
                console.error('Error writing file:', err);
            }
               console.log('Patient info updated!');
            });
            });
        }
    });
}

app.get('/api/patients', (req, res) => {
    fs.access(filePath, fs.constants.F_OK, (err) => { //checking
        if (err) {
            console.log('File does not exist');
            return
        } 
        try{
            console.log('File exists');
            fs.readFile(filePath, 'utf8', (err, data) => { //read data 
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            let saved_data= JSON.parse(data); //save existing data    
            res.json(saved_data); 
            });
        } catch (senderr){ 
            console.error('error sending data');
            return;
        }    
    });   
});  
    
app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    sseClients.push(res);

    req.on('close', () => {
        sseClients = sseClients.filter(client => client !== res);
    });
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Handle the root route to serve the main HTML file
app.get('/ED_users', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'ED_view.html'));
}); 

// Handle the root route to serve the main HTML file
app.get('/nurse_users', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'nurse_view.html'));
}); 

// Handle the root route to serve the main HTML file
app.get('/clinic_users', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'clinic_view.html'));
}); 

// Start the server
const PORT = 300; // You can adjust the port as needed
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});