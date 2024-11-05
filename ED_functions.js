// NewPatient class to represent a incoming patient
class NewPatient {
    constructor(username, recordID, diagnosis, ED) {
        this.username = username;
        this.recordID = recordID;
        this.diagnosis = diagnosis;
        this.ED = ED; // Add ED parameter to store emergency department location
    }
}
 
//mock incomming patient data 
patient1 = new NewPatient("Tina Smith", "123456", "Leg injury", "City Hospital Emergency (123 Main St)");

// Observer implementation class
class ObserverImplementation {
    constructor() {
        this.observers = []; // Array to hold observers
        this.np = null;      // Placeholder for a NewPatient instance
    }
    // Method to add an observer to the list
    addObserver(observer) {
        this.observers.push(observer);
    }
    // Method to remove an observer from the list
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    // Method to set the new patient and notify observers
    addNewPatient() {
        this.np = patient1 
        this.notifyObservers();   
    }
    // Method to notify all observers about the new patient
    notifyObservers() {
        this.observers.forEach(observer => observer(this.np));
    }
}

// Function to display incoming patient information
function incomingPatient(np) {
    const resultElement = document.getElementById("result");
    document.getElementById("submit1").style.display = "none";
    resultElement.innerHTML = `Name: ${np.username}
    Record ID: ${np.recordID}
    Diagnosis: ${np.diagnosis}
    Directed ED: ${np.ED}`;
}

// Initialize ObserverImplementation instance
const observerImpl = new ObserverImplementation();
// Add displayIncomingPatient as an observer
observerImpl.addObserver(incomingPatient);

// Function to trigger the addition of a new patient and notify observers
function helpincomingPatient() {
    observerImpl.addNewPatient();
}

//flags for implementing availability tactic- removal of service. 
//leaving nursesAvailable() and physiciansAvailable() functiond out of sevice for now
let physiciansAvailableFlag = false;
let nursesAvailableFlag = false;
let sendprescriptionFlag =true;
let patientRecordsflag =true; 


// Function to toggle physician availability
function togglePhysicianAvailability() {
    physiciansAvailableFlag = !(physiciansAvailableFlag);
}

// Function to toggle nurse availability
function toggleNurseAvailability() {
    nursesAvailableFlag = !(nursesAvailableFlag);
}

// Function to display physician availability based on flag
function physiciansAvailable() {
    const resultElement = document.getElementById("result");
    document.getElementById("submit1").style.display = "none";
    if (physiciansAvailableFlag) {
        resultElement.textContent = "Physicians available.";
    } else {
        resultElement.textContent = "Service not available";
    }
}

// Function to display nurse availability based on flag
function nursesAvailable() {
    const resultElement = document.getElementById("result");
    document.getElementById("submit1").style.display = "none";
    if (nursesAvailableFlag) {
        resultElement.textContent = "Nurses available.";
    } else {
        resultElement.textContent = "Service not available";
    }
}

// Function to toggle patient records
function togglepatientRecords() {
    patientRecordsflag  = !(patientRecordsflag);
}

function patientRecords() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = ""
    var form = document.getElementById("submit1");
    form.style.display = "none";
    if(patientRecordsflag){
        form.style.display = "block";
        }
        else{
            resultElement.textContent = "Service not available";
        }
}

//function to toggle sendprescription()
function togglesendprescription() {
    sendprescriptionFlag = !(sendprescriptionFlag);
}

function sendprescription() {
    const resultElement = document.getElementById("result");
    document.getElementById("submit1").style.display = "none";
    if(sendprescriptionFlag){
    resultElement.textContent = " ";
    }
    else{
        resultElement.textContent = "Service not available";
    }
}


