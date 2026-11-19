
// Get Monthly and Yearly buttons
const monthlyButton = document.getElementById("monthly");
const yearlyButton = document.getElementById("yearly");

// Get all pricing elements
const prices = document.querySelectorAll(".price");
const units = document.querySelectorAll(".unit");

// Function to change the billing period
function setBillingPeriod(period) {

    // Change all prices
    prices.forEach(function(price) {
        price.textContent = price.dataset[period];
    });

    // Change the billing labels
    units.forEach(function(unit) {
        if (period === "monthly") {
            unit.textContent = "per month";
        } else {
            unit.textContent = "per year";
        }
    });

    // Update button appearance and accessibility
    monthlyButton.classList.toggle("active", period === "monthly");
    yearlyButton.classList.toggle("active", period === "yearly");

    monthlyButton.setAttribute(
        "aria-pressed",
        String(period === "monthly")
    );

    yearlyButton.setAttribute(
        "aria-pressed",
        String(period === "yearly")
    );
}

// Listen for Monthly button clicks
monthlyButton.addEventListener("click", function() {
    setBillingPeriod("monthly");
});

// Listen for Yearly button clicks
yearlyButton.addEventListener("click", function() {
    setBillingPeriod("yearly");
});

// Set Monthly as the default billing period
setBillingPeriod("monthly");



const chooseButtons = document.querySelectorAll(".choose-btn");

const planPopup = document.getElementById("plan-popup");
const termsPopup = document.getElementById("terms-popup");
const successPopup = document.getElementById("success-popup");

const selectedPlan = document.getElementById("selected-plan");
const selectedPrice = document.getElementById("selected-price");
const selectedFeatures = document.getElementById("selected-features");
const confirmationMessage = document.getElementById("confirmation-message");

const viewTermsButton = document.getElementById("view-terms");
const backToPlanButton = document.getElementById("back-to-plan");
const agreeCheckbox = document.getElementById("agree-terms");
const continueButton = document.getElementById("continue-btn");
const finishButton = document.getElementById("finish-btn");

let currentPlan = "";
let termsViewed = false;

// Open selected plan
chooseButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const card = button.closest(".pricing-card");

        currentPlan = card.querySelector("h2").textContent;

        const price = card.querySelector(".price").textContent;
        const unit = card.querySelector(".unit").textContent;

        selectedPlan.textContent = currentPlan + " Plan";
        selectedPrice.textContent = "₹" + price + " " + unit;

        selectedFeatures.innerHTML = "";

        card.querySelectorAll(".features li").forEach(function(feature) {
            const item = document.createElement("li");
            item.textContent = feature.textContent;
            selectedFeatures.appendChild(item);
        });

        termsViewed = false;
        agreeCheckbox.checked = false;
        agreeCheckbox.disabled = true;
        continueButton.disabled = true;

        planPopup.hidden = false;
    });
});

// View Terms and Conditions
viewTermsButton.addEventListener("click", function() {
    termsPopup.hidden = false;
});

// Return after reading terms
backToPlanButton.addEventListener("click", function() {
    termsPopup.hidden = true;
    termsViewed = true;
    agreeCheckbox.disabled = false;
});

// Close terms
document.getElementById("close-terms").addEventListener("click", function() {
    termsPopup.hidden = true;
    termsViewed = true;
    agreeCheckbox.disabled = false;
});

// Enable Continue after agreement
agreeCheckbox.addEventListener("change", function() {
    continueButton.disabled = !(termsViewed && agreeCheckbox.checked);
});

// Close plan popup
document.getElementById("close-plan").addEventListener("click", function() {
    planPopup.hidden = true;
});

// Confirm subscription
continueButton.addEventListener("click", function() {
    if (!termsViewed || !agreeCheckbox.checked) {
        return;
    }

    planPopup.hidden = true;
    confirmationMessage.textContent = "You chose the " + currentPlan + " Plan!";
    successPopup.hidden = false;
});

// Finish
finishButton.addEventListener("click", function() {
    successPopup.hidden = true;
});
