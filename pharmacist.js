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


    // Display success message
    document.getElementById("result").textContent = "Prescription submitted successfully!";
    
    // Clear form fields after submission
    document.getElementById("prescriptionForm").reset();
}