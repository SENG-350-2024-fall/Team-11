

// Command Pattern Base Class
class Command {
    async execute() {
        throw new Error('execute method must be implemented');
    }
}

// Retry Pattern Implementation
async function retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(res => setTimeout(res, delay));
            console.log(`Retry attempt ${i + 1} of ${retries}`);
        }
    }
}

// Command Implementations
class SubmitPrescriptionCommand extends Command {
    constructor(prescriptionData) {
        super();
        this.prescriptionData = prescriptionData;
    }

    async execute() {
        const response = await fetch('/api/prescriptions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.prescriptionData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit prescription');
        }

        return response.json();
    }
}

class MarkFilledCommand extends Command {
    constructor(uid) {
        super();
        this.uid = uid;
    }

    async execute() {
        const response = await fetch(`/api/prescriptions/${this.uid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prescription_filled: 1 })
        });

        if (!response.ok) {
            throw new Error('Failed to mark prescription as filled');
        }

        return response.json();
    }
}

class LoadPrescriptionsCommand extends Command {
    async execute() {
        const response = await fetch('/api/prescriptions/unfilled');
        if (!response.ok) {
            throw new Error('Failed to fetch prescriptions');
        }
        return response.json();
    }
}




class SearchPrescriptionsCommand extends Command {
    constructor(patientName) {
      super();
      this.patientName = patientName;
    }
  
    async execute() {
      const response = await fetch(`/api/prescriptions/search?name=${encodeURIComponent(this.patientName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to search prescriptions');
      }
      return response.json();
    }
  }



// Page Functions
async function submitPrescription(event) {
    event.preventDefault();
    
    const prescriptionData = {
        patientId: document.getElementById("patientId").value,
        prescription: document.getElementById("prescription").value
    };

    const submitCommand = new SubmitPrescriptionCommand(prescriptionData);
    
    try {
        const result = await retry(() => submitCommand.execute());
        document.getElementById("result").textContent = "Prescription added successfully";
        document.getElementById("result").style.color = "green";
        loadUnfilledPrescriptions();
    } catch (error) {
        document.getElementById("result").textContent = `Failed to submit prescription: ${error.message}`;
        document.getElementById("result").style.color = "red";
    }
    document.getElementById("prescriptionForm").reset();
}

function createPrescriptionElement(prescription) {
    const div = document.createElement('div');
    div.style.border = '1px solid #ddd';
    div.style.padding = '10px';
    div.style.margin = '10px 0';
    div.style.borderRadius = '4px';

    div.innerHTML = `
        <h3>Patient ID: ${prescription.uid}</h3>
        <p>Medication: ${prescription.prescription}</p>
    `;

    const button = document.createElement('button');
    button.textContent = 'Mark as Filled';
    button.onclick = () => markAsFilled(prescription.uid);
    div.appendChild(button);

    return div;
}



function createSearchResultElement(result) {
    const div = document.createElement('div');
    div.style.border = '1px solid #ddd';
    div.style.padding = '15px';
    div.style.borderRadius = '4px';
  
    const status = result.prescription_filled ? 'Filled' : 'Not Filled';
    div.innerHTML = `
      <p><strong>Patient:</strong> ${result.fname} ${result.lname}</p>
      <p><strong>Medication:</strong> ${result.prescription}</p>
      <p><strong>Status:</strong> ${status}</p>
    `;
  
    return div;
  }

async function loadUnfilledPrescriptions() {
    const loadCommand = new LoadPrescriptionsCommand();
    
    try {
        const prescriptions = await retry(() => loadCommand.execute());
        const prescriptionList = document.getElementById('prescriptionList');
        prescriptionList.innerHTML = '';
        
        prescriptions.forEach(prescription => {
            prescriptionList.appendChild(createPrescriptionElement(prescription));
        });
    } catch (error) {
        console.error('Error loading prescriptions:', error);
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.textContent = 'Error loading prescriptions. Please try again later.';
        document.getElementById('prescriptionList').appendChild(errorDiv);
    }
}

async function markAsFilled(uid) {
    const markFilledCommand = new MarkFilledCommand(uid);
    
    try {
        await retry(() => markFilledCommand.execute());
        loadUnfilledPrescriptions();
    } catch (error) {
        console.error('Error marking prescription as filled:', error);
        alert('Failed to mark prescription as filled. Please try again.');
    }
}

async function searchPatientMedications() {
    const patientName = document.getElementById("patientSearch").value.trim();
    const searchResults = document.getElementById("searchResults");
    
    if (!patientName) {
        searchResults.innerHTML = '';
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.textContent = 'Please enter a patient name';
        searchResults.appendChild(errorDiv);
        return;
    }

    const searchCommand = new SearchPrescriptionsCommand(patientName);
    
    try {
        const results = await retry(() => searchCommand.execute());
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.textContent = 'No medications found for this patient';
            searchResults.appendChild(noResultsDiv);
            return;
        }

        results.forEach(result => {
            searchResults.appendChild(createSearchResultElement(result));
        });
    } catch (error) {
        console.error('Error searching prescriptions:', error);
        const errorDiv = document.createElement('div');
        errorDiv.style.color = 'red';
        errorDiv.textContent = 'Error searching for patient medications. Please try again.';
        searchResults.appendChild(errorDiv);
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize prescriptions list
    loadUnfilledPrescriptions();
    
    // Add event listener for search
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', searchPatientMedications);
    }
    
    // Add event listener for prescription form
    const prescriptionForm = document.getElementById('prescriptionForm');
    if (prescriptionForm) {
        prescriptionForm.addEventListener('submit', submitPrescription);
    }
});