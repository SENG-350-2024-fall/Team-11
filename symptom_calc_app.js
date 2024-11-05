// Mock data for locations
const locations = {
    "emergency": [
        { name: "City Hospital Emergency", distance: "3 km", address: "123 Main St." },
        { name: "Metro Emergency Center", distance: "5 km", address: "456 Elm St." }
    ],
    "clinic": [
        { name: "Family Health Clinic", distance: "2 km", address: "101 Pine St." },
        { name: "Downtown Medical Center", distance: "4 km", address: "202 Maple St." }
    ]
};

// Abstract class for symptom evaluation
class SymptomEvaluator {
    constructor() {
        this.evaluationHistory = this.loadEvaluationHistory();
    }

    // Template method defining the evaluation process
    evaluate(patientData) {
        const severity = this.assessSeverity(patientData);
        const recommendation = this.makeRecommendation(severity);
        const timestamp = this.getTimestamp();

        // Store evaluation and timestamp in history
        this.evaluationHistory.push({ recommendation, timestamp });

        // Save updated history to local storage
        this.saveEvaluationHistory();

        return `${recommendation} (Evaluated on: ${timestamp})`;
    }

    // Abstract method for severity assessment
    assessSeverity(patientData) {
        throw new Error("Method 'assessSeverity()' must be implemented.");
    }

    // Abstract method for making recommendations
    makeRecommendation(severity) {
        throw new Error("Method 'makeRecommendation()' must be implemented.");
    }

    getTimestamp() {
        const now = new Date();
        return now.toLocaleString(); // Format the date and time
    }

    // Load evaluation history from local storage
    loadEvaluationHistory() {
        const history = localStorage.getItem('evaluationHistory');
        return history ? JSON.parse(history) : [];
    }

    // Save evaluation history to local storage
    saveEvaluationHistory() {
        localStorage.setItem('evaluationHistory', JSON.stringify(this.evaluationHistory));
    }

    // Retrieve the evaluation history as a log
    getEvaluationHistory() {
        return this.evaluationHistory.map(entry =>
            `Recommendation: ${entry.recommendation} | Time: ${entry.timestamp}`
        ).join('\n');
    }
}

// Concrete implementation of SymptomEvaluator
class SpecificSymptomEvaluator extends SymptomEvaluator {
    assessSeverity(patientData) {
        if (patientData.age > 65 && patientData.symptoms.includes('chest pain')) {
            return 'high';
        }
        return patientData.symptoms.includes('fever') ? 'medium' : 'low';
    }

    makeRecommendation(severity) {
        const recommendations = {
            high: "Please visit the nearest Emergency Department.",
            medium: "We recommend visiting a Clinic soon.",
            low: "You may visit a Clinic if symptoms persist."
        };

        const locationType = severity === 'high' ? 'emergency' : 'clinic';
        const location = locations[locationType][0];

        return `${recommendations[severity]} Location: ${location.name}, ${location.address}, ${location.distance}.`;
    }
}

// Handle form submission and connect to JavaScript evaluator
const evaluator = new SpecificSymptomEvaluator(); // Initialize SpecificSymptomEvaluator

document.getElementById('patientForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const age = parseInt(document.getElementById('age').value, 10);
    const symptoms = Array.from(document.querySelectorAll('input[name="symptoms"]:checked')).map(input => input.value);
    const medications = Array.from(document.querySelectorAll('input[name="medications"]:checked')).map(input => input.value);

    const patientData = { age, symptoms, medications };

    const recommendation = evaluator.evaluate(patientData);
    document.getElementById('result').textContent = recommendation;
});

// Example of displaying evaluation history
document.getElementById('showHistory').addEventListener('click', function() {
    alert(evaluator.getEvaluationHistory());
});
