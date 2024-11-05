class NewPatient {
    constructor(username, recordID, diagnosis) {
        this.username = username;
        this.recordID = recordID;
        this.diagnosis = diagnosis;
    }
}

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
        this.np = new NewPatient("Tina", "123", "Shoulder pain");
        this.notifyObservers();
    }

    // Method to notify all observers about the new patient
    notifyObservers() {
        this.observers.forEach(observer => observer(this.np));
    }
}


// Initialize ObserverImplementation instance
const observerImpl = new ObserverImplementation();
// Add displayIncomingPatient as an observer
observerImpl.addObserver(incomingPatient);
// Trigger the addition of a new patient and notify observers
observerImpl.addNewPatient();


function helpincomingPatient(){
    observerImpl.addNewPatient();
}


function incomingPatient(np) {
    const resultElement = document.getElementById("result");
    document.getElementById("submit1").style.display = "none";
    resultElement.textContent = `Incoming patient info: Name: ${np.username}, Record ID: ${np.recordID}, Diagnosis: ${np.diagnosis}`;
}

function physiciansAvailable() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = ""; 
    document.getElementById("submit1").style.display = "none";
    resultElement.textContent ="Physicians available: ";
}

function nursesAvailable() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = ""; 
    document.getElementById("submit1").style.display = "none";
    resultElement.textContent = "Nurses available: ";
    
}

function patientRecords() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = ""; 
    var form = document.getElementById("submit1");
    form.style.display = "block";
    
}
function sendprescription() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = ""; 
    document.getElementById("submit1").style.display = "none";
    resultElement.textContent ="$$$";
}

