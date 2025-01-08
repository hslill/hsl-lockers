function generateBarcode(tn) {
    tn = String(tn).trim();  // Ensure tn is a string and trim any spaces around it

    // Check if transaction number is valid (numeric only for CODE39)
    if (tn && /^[\w\-]+$/.test(tn)) {  // CODE39 allows alphanumeric and some symbols like '-'

        // Create a new barcode SVG element
        const barcodeSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        // Use JsBarcode to generate the barcode
        JsBarcode(barcodeSVG, tn, {
            format: "CODE39",  // 3of9 barcode format
            displayValue: true,  // Display the value below the barcode
            lineColor: "#000",  // Set line color
            width: 2,  // Line thickness
            height: 50,  // Barcode height
            margin: 10,  // Margin around the barcode
        });

        // Convert the generated SVG to a Data URL
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(barcodeSVG);
        const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;

        // Return the Data URL directly instead of setting the value of the hidden input
        return dataUrl;
    } else {
        return '';  // Return an empty string if the transaction number is invalid
    }
}
