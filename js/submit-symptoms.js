window.onload = function() {
    populateYearOptions();
    populateDayOptions();

    
    document.getElementById("birthYear").addEventListener("change", populateDayOptions);
    document.getElementById("birthMonth").addEventListener("change", populateDayOptions);
};


function populateYearOptions() {
    const yearSelect = document.getElementById("birthYear");
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 100; year--) {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
}

function populateDayOptions() {
    const daySelect = document.getElementById("birthDay");
    const month = document.getElementById("birthMonth").value;
    const year = document.getElementById("birthYear").value;

    const daysInMonth = new Date(year, month, 0).getDate();
    daySelect.innerHTML = ""; 
    for (let day = 1; day <= daysInMonth; day++) {
        const option = document.createElement("option");
        option.value = day;
        option.textContent = day;
        daySelect.appendChild(option);
    }
}