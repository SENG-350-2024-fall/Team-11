// function implementations for ED, nurse and clinic users

//ED: 
//ED user should gets notified when a patient submit symptoms (uses observer design pattern ) 
//incomming patient information is displyed in ED view 
//ED recieve priscription submission from clinic/nurse users and make final submission to chemist

//Nurse
//nurse user should gets notified when a patient submit symptoms (uses observer design pattern )
//nurse submits presccription to database 
//nurses have access to patient records
 
//clinic 
//clinic user should get notified if a patients is directed to the clinic 
//clinic have access to patient records for patient visiting the clinic 
//clinic submits prescription to database

//front-end js 

//checks database every hour and prints all patients ????
function helpincomingPatient() {
    window.location.href = "patient_info.html";
}
 
fetch('/api/patients')
     .then(response => {
          if (!response.ok) {
                 throw new Error(`HTTP error! Status: ${response.status}`);
             }
             return response.json();
         })
     .then(patients => {
          // Display patient info on the page
         const patientTable = document.getElementById('patientTable');
         patients.forEach(patient=> {
            const row = document.createElement('tr');
            row.innerHTML = ` <td>${patient.username}</td>
                              <td>${patient.recordID}</td>
                              <td>${patient.age}</td>
                              <td>${patient.diagnosis}</td> `;
            patientTable.appendChild(row);
        })
        })
     .catch(error => console.error('Error fetching patient data:', error));  
   


    
// Connect to the SSE endpoint
const eventSource = new EventSource('/events');

// Listen for messages
eventSource.onmessage = (event) => {
    const patient = JSON.parse(event.data);
    let patientname = patient.username;
    alert(`New Patient Added:${patientname}`);
};

// Handle errors
eventSource.onerror = () => {
    console.error("Error connecting to SSE.");
    eventSource.close();
};


//flags for implementing availability tactic- removal of service. 
let sendprescriptionFlag =true;
let patientRecordsflag =true; 


// Function to toggle patient records
function togglepatientRecords() {
    patientRecordsflag  = !(patientRecordsflag);
}

function patientRecords() {
    const resultElement = document.getElementById("result");
    resultElement.textContent = ""
    var form2 = document.getElementById("nurse");
    var form3  = document.getElementById("Physicians");
    var form4  = document.getElementById("ED");
    var form1 = document.getElementById("submit1");
    //form1.style.display = "none";
    form2.style.display = "none";
    form3.style.display = "none";
    //form4.style.display = "none";
    if(patientRecordsflag){
        form1.style.display = "block";
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
    if(sendprescriptionFlag){
    window.location.href = "pharm-view.html";
    }
    else{
        resultElement.textContent = "Service not available";
    }
}


