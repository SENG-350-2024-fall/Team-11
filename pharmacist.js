function submitPrescription() {
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
        document.getElementById("result").textContent = "Prescription submitted successfully!";
    } catch (error) {
        document.getElementById("result").textContent = `Failed to submit prescription: ${error.message}`;
    }

    function databaseAddition(){
        patientName,
        medication,
        dosage,
        frequency,
        instructions
    });
}

    function sendPrescriptionToDatabase(){
        setTimeout(() => {
            // Display success message
            document.getElementById("result").textContent = "Prescription submitted successfully!";
            
            // Clear form fields after submission
            document.getElementById("prescriptionForm").reset();
        }, 1000);
        
    }

    // Clear form fields after submission
    document.getElementById("prescriptionForm").reset();
}
    // Display success message
    document.getElementById("result").textContent = "Prescription submitted successfully!";
    
    // Clear form fields after submission
    document.getElementById("prescriptionForm").reset();
}