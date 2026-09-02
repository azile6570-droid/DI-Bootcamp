// EXERCISE 1

function calculateTip() {
    const billAmount = document.getElementById("billAmt").value;
    const serviceQuality = document.getElementById("serviceQual").value;
    let numberOfPeople = document.getElementById("numOfPeople").value;
    if (serviceQuality == 0 || billAmount == "") {
        alert("Please enter the bill amount and select a service quality");
        return;
    }
    const eachDisplay = document.getElementById("each");
    if (numberOfPeople == "" || numberOfPeople < 1) {
        numberOfPeople = 1;
        eachDisplay.style.display = "none";
    } else {
        eachDisplay.style.display = "block";
    }
    const total = ((billAmount * serviceQuality) / numberOfPeople).toFixed(2);
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").textContent = total;
}
window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("totalTip").style.display = "none";
    const calculateBtn = document.getElementById("calculate");
    if (calculateBtn) {
        calculateBtn.onclick = calculateTip;
    }
});


// EXERCISE 2
function validateEmailWithoutRegex(email) {
    if (email.indexOf("@") === -1) {
        return false;
    }
    const parts = email.split("@");
    if (parts.length !== 2) {
        return false;
    }
    
    const beforeAt = parts[0];
    const afterAt = parts[1];
    if (beforeAt.length < 1) {
        return false;
    }
    const dotIndex = afterAt.indexOf(".");
    if (dotIndex === -1) {
        return false;
    }
    if (dotIndex < 1) {
        return false;
    }
    if (dotIndex === afterAt.length - 1) {
        return false;
    }
    
    return true;
}
function validateEmailWithRegex(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
function handleEmailFormSubmit(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById("emailInput");
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    const isValid = validateEmailWithRegex(email);
    
    if (isValid) {
        alert("Email is valid!");
    } else {
        alert("Email is invalid. Please enter a valid email address.");
    }
}
window.addEventListener("DOMContentLoaded", function() {
    const emailForm = document.getElementById("emailForm");
    if (emailForm) {
        emailForm.addEventListener("submit", handleEmailFormSubmit);
    }
});


// EXERCISE 3

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                
            
                const resultsDiv = document.getElementById("geolocationResults");
                if (resultsDiv) {
                    resultsDiv.innerHTML = `
                        <p>Latitude: ${latitude}</p>
                        <p>Longitude: ${longitude}</p>
                    `;
                } else {
                    alert(`Latitude: ${latitude}\nLongitude: ${longitude}`);
                }
            },
            function(error) {
                alert("Error getting geolocation: " + error.message);
            }
        );
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

window.addEventListener("DOMContentLoaded", function() {
    const geoButton = document.getElementById("geolocationBtn");
    if (geoButton) {
        geoButton.addEventListener("click", getGeolocation);
    }
});
