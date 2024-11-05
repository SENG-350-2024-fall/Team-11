async function submitPrescription() {
    preventDefault(); 

    const patientName = document.getElementById("patientName").value;
    const medication = document.getElementById("medication").value;
    const dosage = document.getElementById("dosage").value;
    const frequency = document.getElementById("frequency").value;
    const instructions = document.getElementById("instructions").value;

    // Create a prescription object
    const prescriptionData = {
        patientName: patientName,
        medication: medication,
        dosage: dosage,
        frequency: frequency,
        instructions: instructions,
    };

    try {
        // Attempt to submit the prescription with retry
        const result = await retry(() => sendPrescriptionToDatabase(prescriptionData));
        document.getElementById("result").textContent = result; // Display success message
    } catch (error) {
        document.getElementById("result").textContent = `Failed to submit prescription: ${error.message}`; // Display error message
    }

    // function databaseAddition(){
    //     patientName,
    //     medication,
    //     dosage,
    //     frequency,
    //     instructions
    // });

    try {
        // Attempt to submit the prescription with retry
        const result = await retry(() => sendPrescriptionToDatabase(prescriptionData));
        document.getElementById("result").textContent = result; // Display success message
    } catch (error) {
        document.getElementById("result").textContent = `Failed to submit prescription: ${error.message}`; // Display error message
    }

        // Clear form fields after submission
        document.getElementById("prescriptionForm").reset();

        
        // Clear form fields after submission
        document.getElementById("prescriptionForm").reset();
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

async function sendPrescriptionToDatabase(prescriptionData) {
    // Simulating a successful database submission with a timeout
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            i = 0;
            
            if (i = 0) { 
                resolve("Prescription added successfully");
            } else {
                reject(new Error("Database submission failed")); 
            }
        }, 1000);
    });
}





