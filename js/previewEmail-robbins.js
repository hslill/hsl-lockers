// Function to generate a 4-digit combination
function generateCombination() {
    return Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number between 1000 and 9999
}

// Function to assign a locker number between 32 and 39
function assignLockerNumber() {
    const minLocker = 32;
    const maxLocker = 39;
    return Math.floor(Math.random() * (maxLocker - minLocker + 1)) + minLocker;
}

document.addEventListener("DOMContentLoaded", function() {
    // Ensure locker number and combination are only generated when needed
    window.lockerNumber = null;
    window.combination = null;

    // Log for debugging purposes
    console.log("Waiting for locker assignment...");
});

// Function to generate locker number and combination when triggered
function generateLockerAndCombination() {
    if (!window.lockerNumber && !window.combination) {
        // Only generate if they aren't already generated
        window.lockerNumber = document.getElementById('lockerNumberField').value;  // Ensure we use the value from the hidden field
        window.combination = generateCombination();  // Generate a 4-digit combination

        console.log(`Assigned locker number: ${window.lockerNumber}`);
        

    }

    // Update the email preview content with the locker number and combination
    updateEmailPreview();
}

// Update the email preview with the locker number and combination
function updateEmailPreview() {
    // Get the email preview element and the current email content
    const emailPreviewElement = document.getElementById("emailPreview");
    let emailContent = emailPreviewElement.innerHTML;

    // Replace the placeholders with the actual locker number and combination
    emailContent = emailContent.replace("[Locker Number]", window.lockerNumber || "[Locker Number]");
    emailContent = emailContent.replace("[Combination]", window.combination || "[Combination]");

    // Update the email preview with the new content
    emailPreviewElement.innerHTML = emailContent;

    // Optionally, update the form fields with the values (if needed for submission)
    document.getElementById("lockerNumberField").value = window.lockerNumber;
    document.getElementById("combinationField").value = window.combination;
}

// Example of event listener for triggering the locker assignment
document.getElementById("assignLockerButton").addEventListener("click", function() {
    generateLockerAndCombination();
});

// Function to generate the barcode for a given transaction number
function generateBarcode(transactionNumber) {
    // This should return a URL of the barcode image
    return `https://barcode.tec-it.com/barcode.ashx?data=${transactionNumber}&code=Code128&translate-esc=true`;
}

// Update the email preview dynamically based on form values
async function updateEmailPreview() {
    const recipientName = recipientNameField.value.trim();
    const recipientEmail = recipientEmailField.value.trim();
    const bookDetails = bookDetailsField.value.trim();
    const transactionNumber = transactionNumberField.value.trim();

    // Generate the barcode for the current transaction number
    const barcodeDataURL = generateBarcode(transactionNumber);

    // Build the email content dynamically with HTML formatting
    let emailPreview = `
        <p>Hi ${recipientName || "[Recipient Name]"},</p>
        <p>You have material available for pickup at the <a href="https://hsl.med.nyu.edu/libraries/herman-robbins-medical-library-nyu-langone-orthopedic-hospital" target="_blank" rel="noopener">Herman Robbins Medical Library:</a></p>
        <p>${bookDetails || "[Book Details]"}</p>
        <p>Our pickup service operates 24/7, allowing you to retrieve it at any time. Please head to the kiosk located near the book lockers. You have two options to complete the process:</p>
        <img src="https://libapps.s3.amazonaws.com/accounts/129950/images/BookLockerPickup.JPG" width="187" height="240" alt="Book Locker Pickup Image">
        <ol>
            <li>Scan the barcode below using the handheld scanner provided at the kiosk.</li>
            <li>Alternatively, you can enter the Transaction Number displayed below the barcode and press ENTER or click the Submit button.</li>
        </ol>
        <p><strong>Transaction Number: </strong>${transactionNumber || "[Transaction Number]"}</p>
        <p><img src="${barcodeDataURL}" alt="Transaction Barcode" style="width: 200px; height: auto;"/></p>
        <p>The computer will then display the following details for your locker retrieval (Note to staff: Locker # and Combination will not be in sent email):</p>
        <ul>
            <li><strong>Locker Number:</strong> ${window.lockerNumber || "[Locker Number]"}</li> <!-- Locker number synced here -->
            <li><strong>Combination:</strong> ${window.combination || "[Combination]"}</li> <!-- Combination synced here -->
        </ul>
        <p>If you encounter any issues or have questions, please feel free to contact the library.</p>
        <p>In case you no longer need the book(s), we kindly ask that you let us know as soon as possible. This will enable us to return the book(s) before the due date and prevent you from receiving any overdue notices.</p>
        <p>Best regards,</p>
        <p><strong>Document Delivery Services</strong><br>
        NYU Health Sciences Library at LOH<br>
        301 East 17th Street, Second Floor<br>
        New York, NY 10003<br>
        (212) 598-6275<br>
        <a href="mailto:dds@med.nyu.edu">dds@med.nyu.edu</a><br>
        <a href="https://nyulangone.org" target="_blank">nyulangone.org</a></p>
    `;

    // Update the email preview content with the dynamic email preview
    const emailPreviewElement = document.getElementById("emailPreview");
    emailPreviewElement.innerHTML = emailPreview;
}

// Listen for changes in the form fields and update the preview accordingly
document.getElementById('recipientNameField').addEventListener("input", updateEmailPreview);
document.getElementById('recipientEmailField').addEventListener("input", updateEmailPreview);
document.getElementById('bookDetailsField').addEventListener("input", updateEmailPreview);
document.getElementById('transactionNumberField').addEventListener("input", updateEmailPreview);

// Add an event listener for the "Assign Locker" button
document.getElementById("assignLockerButton").addEventListener("click", function() {
    const lockerNumber = assignLockerNumber();
    const combination = generateCombination();

    // Set the generated values in the hidden fields
    document.getElementById("lockerNumberField").value = lockerNumber;
    document.getElementById("combinationField").value = combination;

    // Optionally update the email preview with the new locker number and combination
    updateEmailPreview();
});
