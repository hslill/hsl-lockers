// barcodeUtils.js
function getBarcodeUrl(transactionNumber) {
    return `https://barcode.tec-it.com/barcode.ashx?data=${encodeURIComponent(transactionNumber)}&code=Code39&dpi=96`;
}

// Export the function if you're using modules (optional)
// export { getBarcodeUrl };
