// Initialize EmailJS
emailjs.init("uxWxBkV6fbk7E2fvK");  // Replace with your actual public key

function sendEmail() {
    // Form submission event listener
    document.getElementById("notificationForm").addEventListener("submit", function (event) {
        event.preventDefault();

        const btn = document.querySelector('button[type="submit"]');
        btn.textContent = "Sending...";

        // Get form field values
        const recipientName = document.getElementById("recipientNameField").value.trim();
        const recipientEmail = document.getElementById("recipientEmailField").value.trim();
        const bookDetails = document.getElementById("bookDetailsField").value.trim();
        const transactionNumber = document.getElementById("transactionNumberField").value.trim();

        // Debugging log: Check if the email and other form values are captured correctly
        console.log("Recipient Name:", recipientName);
        console.log("Recipient Email:", recipientEmail);
        console.log("Book Details:", bookDetails);
        console.log("Transaction Number:", transactionNumber);

        if (!recipientEmail || !recipientName || !bookDetails || !transactionNumber) {
            alert("All fields must be filled out.");
            btn.textContent = "Send";  // Reset button text
            return;  // Prevent email sending if any field is missing
        }

        // Generate barcode URL
        const barcodeUrl = getBarcodeUrl(transactionNumber);
        console.log("Generated Barcode URL:", barcodeUrl);

        // Ensure the book cover URL is defined (from the ISBN lookup or another source)
        let bookCoverUrl = "";  // Default value if no cover is found

        // Assuming you have a function to fetch book data and generate the bookCoverUrl
        const isbn = document.getElementById("isbnNumber").value.trim();
        if (isbn) {
            const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;
            
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.items && data.items.length > 0) {
                        const book = data.items[0].volumeInfo;

                        // Extract book cover URL if available
                        const bookId = data.items[0].id;
                        bookCoverUrl = `https://books.google.com/books/content?id=${bookId}&printsec=frontcover&img=1&zoom=1`;

                        // Proceed to send email after the cover URL is fetched
                        const emailData = {
                            recipientName: recipientName,
                            recipientEmail: recipientEmail,
                            bookDetails: bookDetails,
                            transactionNumber: transactionNumber,
                            barcode_url: barcodeUrl,
                            bookCoverUrl: bookCoverUrl // Pass the cover URL
                        };

                        console.log("Data being sent to EmailJS:", emailData);

                        // Send the email using EmailJS
                        emailjs.send("pickup", "book_pickup_lapidus", emailData)
                            .then((response) => {
                                console.log('Email sent successfully!', response);
                                alert('Email sent successfully!');
                                btn.textContent = "Sent!";
                            })
                            .catch((error) => {
                                console.error('Failed to send email:', error);
                                alert('Failed to send email!');
                                btn.textContent = "Send";  // Reset the button text
                            });

                    } else {
                        alert("No book found with this ISBN number.");
                        btn.textContent = "Send";  // Reset the button text
                    }
                })
                .catch(error => {
                    console.error("Error fetching book data:", error);
                    alert("Failed to fetch book details.");
                    btn.textContent = "Send";  // Reset the button text
                });
        } else {
            // If ISBN is not provided, proceed to send email without book cover
            const emailData = {
                recipientName: recipientName,
                recipientEmail: recipientEmail,
                bookDetails: bookDetails,
                transactionNumber: transactionNumber,
                barcode_url: barcodeUrl,
                bookCoverUrl: bookCoverUrl // No cover URL if ISBN is empty
            };

            // Send the email using EmailJS
            emailjs.send("pickup", "book_pickup_lapidus", emailData)
                .then((response) => {
                    console.log('Email sent successfully!', response);
                    alert('Email sent successfully!');
                    btn.textContent = "Sent!";
                })
                .catch((error) => {
                    console.error('Failed to send email:', error);
                    alert('Failed to send email!');
                    btn.textContent = "Send";  // Reset the button text
                });
        }
    });
}