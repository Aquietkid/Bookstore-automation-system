function fetchQuotation() {
    const selectedItem = document.getElementById('item').value;

    // Make a request to the API with the selected item ID
    // For demonstration purposes, we'll simulate the API response
    const mockApiResponse = {
        itemName: selectedItem === '1' ? 'Book' : 'Raw Material',
        price: selectedItem === '1' ? '$10' : '$20',
        deliveryTime: selectedItem === '1' ? '2 days' : '3 days'
    };

    // Update the quotation result section with the API response
    const quotationResult = document.getElementById('quotationResult');
    quotationResult.innerHTML = `
        <h2>Quotation Details</h2>
        <p><strong>Item:</strong> ${mockApiResponse.itemName}</p>
        <p><strong>Price:</strong> ${mockApiResponse.price}</p>
        <p><strong>Delivery Time:</strong> ${mockApiResponse.deliveryTime}</p>
    `;
    quotationResult.style.display = 'block';
}
