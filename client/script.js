// function fetchQuotation() {
//     const selectedItem = document.getElementById('item').value;

//     // Make a request to the API with the selected item ID
//     // For demonstration purposes, we'll simulate the API response
//     const mockApiResponse = {
//         itemName: selectedItem === '1' ? 'Book' : 'Raw Material',
//         price: selectedItem === '1' ? '$10' : '$20',
//         deliveryTime: selectedItem === '1' ? '2 days' : '3 days'
//     };

//     // Update the quotation result section with the API response
//     const quotationResult = document.getElementById('quotationResult');
//     quotationResult.innerHTML = `
//         <h2>Quotation Details</h2>
//         <p><strong>Item:</strong> ${mockApiResponse.itemName}</p>
//         <p><strong>Price:</strong> ${mockApiResponse.price}</p>
//         <p><strong>Delivery Time:</strong> ${mockApiResponse.deliveryTime}</p>
//     `;
//     quotationResult.style.display = 'block';
// }



// GPT try 1
// function fetchQuotation() {
//     // Get the selected item ID from the dropdown
//     const selectedItem = document.getElementById('item').value;

//     // Make a GET request to the backend API endpoint
//     fetch(`./routes/supplier/${selectedItem}`)
//         .then(response => {
//             // Check if the response is successful (status code 200)
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             // Parse the JSON response
//             return response.json();
//         })
//         .then(data => {
//             // Display the quotation result on the HTML page
//             displayQuotation(data);
//         })
//         .catch(error => {
//             // Handle any errors that occurred during the fetch
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }

// function displayQuotation(data) {
//     const quotationResultElement = document.getElementById('quotationResult');
//     // Clear any previous result
//     quotationResultElement.innerHTML = '';

//     // Check if there's data returned from the backend
//     if (data && data.data) {
//         const { ItemName, SupplierID, SupplierName, SupplierRate } = data.data;
//         // Create HTML elements to display the quotation
//         const quotationHTML = `
//             <p>Item: ${ItemName}</p>
//             <p>Supplier ID: ${SupplierID}</p>
//             <p>Supplier Name: ${SupplierName}</p>
//             <p>Supplier Rate: ${SupplierRate}</p>
//         `;
//         // Set the HTML content to display the quotation
//         quotationResultElement.innerHTML = quotationHTML;
//     } else {
//         // Display a message if no data was returned from the backend
//         quotationResultElement.innerHTML = 'No quotation available for the selected item.';
//     }
// }


// GPT try 2

function fetchQuotation() {
    // Get the selected item ID from the dropdown
    const selectedItem = document.getElementById('item').value;

    // Make a GET request to the backend API endpoint
    fetch(`http://localhost:20419/supplier/${selectedItem}`)
        .then(response => {
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Parse the JSON response
            return response.json();
        })
        .then(data => {
            // Display the quotation result on the HTML page
            displayQuotation(data);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
            // Display an error message on the HTML page
            displayError();
        });
}

function displayQuotation(data) {
    const quotationResultElement = document.getElementById('quotationResult');
    // Clear any previous result
    quotationResultElement.innerHTML = '';

    // Check if there's data returned from the backend
    if (data && data.data) {
        const { ItemName, SupplierID, SupplierName, SupplierRate } = data.data;
        // Create HTML elements to display the quotation
        const quotationHTML = `
            <p>Item: ${ItemName}</p>
            <p>Supplier ID: ${SupplierID}</p>
            <p>Supplier Name: ${SupplierName}</p>
            <p>Supplier Rate: ${SupplierRate}</p>
        `;
        // Set the HTML content to display the quotation
        quotationResultElement.innerHTML = quotationHTML;
    } else {
        // Display a message if no data was returned from the backend
        quotationResultElement.innerHTML = 'No quotation available for the selected item.';
    }
}

function displayError() {
    const quotationResultElement = document.getElementById('quotationResult');
    // Display an error message on the HTML page
    quotationResultElement.innerHTML = 'There was a problem fetching the quotation. Please try again later.';
}


// populate dropdown list (GPT try 3)
// Function to fetch items from the backend API and populate the dropdown
function fetchItems() {
    fetch('http://localhost:20419/supplier/all/items')
        .then(response => {
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
            console.log('Above return response.json()', response);
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Populate the dropdown with items from the backend
            populateDropdown(data);
        })
        .catch(error => {
            console.error('There was a problem fetching items:', error);
        });
}

// Function to populate the dropdown with items
function populateDropdown(items) {
    const itemDropdown = document.getElementById('item');

    // Clear existing options
    itemDropdown.innerHTML = '';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select an item';
    itemDropdown.appendChild(defaultOption);

    // Add options for each item
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.ID; // Assuming each item has an ID property
        option.textContent = item.Name; // Assuming each item has a Name property
        itemDropdown.appendChild(option);
    });
}

// Call fetchItems when the page loads to populate the dropdown
// window.onload = fetchItems();

window.addEventListener(onload, fetchItems());