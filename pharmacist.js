

async function submitPrescription(event) {
    event.preventDefault(); 

    const prescriptionData = {
        patientName: document.getElementById("patientName").value,
        medication: document.getElementById("medication").value,
        dosage: document.getElementById("dosage").value,
        frequency: document.getElementById("frequency").value,
        instructions: document.getElementById("instructions").value,
    };

    const submitCommand = new SubmitPrescriptionCommand(prescriptionData);

    try {
        const result = await retry(() => submitCommand.execute());
        document.getElementById("result").textContent = result; // Display success message
    } catch (error) {
        document.getElementById("result").textContent = `Failed to submit prescription: ${error.message}`; // Display error message
    }

    // Clear form fields after submission
    document.getElementById("prescriptionForm").reset();

}

async function sendPrescriptionToDatabase(prescriptionData) {
    // Simulating a successful database submission with a timeout
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            j = 0;
            
            if (j == 0) { 
                resolve("Prescription added successfully");
            } else {
                reject(new Error("Database submission failed")); 
            }
        }, 1000);
    });
}
class SubmitPrescriptionCommand {
    constructor(prescriptionData) {
        this.prescriptionData = prescriptionData;
    }

    async execute() {
        return await sendPrescriptionToDatabase(this.prescriptionData);
    }
}


async function retry(fn, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn(); // Try to execute 
        } catch (error) {
            if (i === retries - 1) throw error; // Rethrow error if last attempt fails
            await new Promise(res => setTimeout(res, delay)); // Wait before retrying
        }
    }
}



