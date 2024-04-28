// Function to fetch items from the database and populate the dropdown menu
async function fetchItems() {
    try {
        //@Aquietkid fix the API: access inventory DB, not supplier
        const response = await fetch('http://localhost:20419/supplier/all/items');
        const data = await response.json();
        const itemDropdown = document.getElementById('itemDropdown');
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.ID; // Assuming each item has an ID
            option.textContent = item.Name; // Assuming each item has a name
            itemDropdown.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

// Function to add selected item to the cart
function addToCart() {
    const itemDropdown = document.getElementById('itemDropdown');
    const selectedItem = itemDropdown.value;
    const itemName = itemDropdown.options[itemDropdown.selectedIndex].text;
    const itemQty = document.getElementById('quantity').value;

    // Add selected item to the table
    const itemTableBody = document.getElementById('itemTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${selectedItem}</td>
        <td>${itemName}</td>
        <td>Price Placeholder</td>
        <td>${itemQty}</td>
    `;
    itemTableBody.appendChild(newRow);
}

// Fetch items when the page loads
// window.onload = function() {
//     fetchItems();
// };

window.addEventListener(onload, fetchItems());