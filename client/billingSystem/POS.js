// Function to fetch items from the database and populate the dropdown menu
async function fetchItems() {
    try {
        //@Aquietkid fix the API: access inventory DB, not supplier
        const response = await fetch('http://localhost:20419/inventory/all/items');
        const data = await response.json();
        const itemDropdown = document.getElementById('itemDropdown');
        data.forEach(item => {
            const option = document.createElement('option');
            option.value = item.ID; // Assuming each item has an ID
            option.textContent = item.Name; // Assuming each item has a name
            // option.textContent = item.Price; // Assuming each item has a name
            // option.textContent = item.Qty; // Assuming each item has a name
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

    const itemPrice = getItemPrice(selectedItem).value;
    // Add selected item to the table
    const itemTableBody = document.getElementById('itemTableBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${selectedItem}</td>
        <td>${itemName}</td>
        <td>${itemPrice}</td>
        <td>${itemQty}</td>
    `;
    itemTableBody.appendChild(newRow);
}

// Fetch items when the page loads
// window.onload = function() {
//     fetchItems();
// };


// async function getItemPrice(id) {
//     try {
//         //console.log(id);
//         //@Aquietkid fix the API: access inventory DB, not supplier
//         const response = await fetch(`http://localhost:20419/inventory/${id}`);
//         const data = await response.json();
//         console.log(data);
//         return data;
//     } catch (error) {
//         console.error('Error fetching items:', error);
//     }
// }

//GPT VERSION
async function getItemPrice(id) {
    try {
        const response = await fetch(`http://localhost:20419/inventory/price/id`);
        if (!response.ok) {
            throw new Error('Failed to fetch item price');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching item price:', error.message);
        // Display error message to the user or handle it gracefully
    }
}



window.addEventListener(onload, fetchItems());


//Checkout Confirmation 

// JavaScript function to open the modal
function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// JavaScript function to close the modal
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}


// Function to open the clear modal
function openClearModal() {
    document.getElementById("clearModal").style.display = "block";
}

// Function to close the clear modal
function closeClearModal() {
    document.getElementById("clearModal").style.display = "none";
}

// Function to clear the item
function clearItem() {
    const itemId = document.getElementById("clearItemId").value;
    const tableBody = document.getElementById("itemTableBody");
    const rows = tableBody.getElementsByTagName("tr");

    // Loop through each row in the table body
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const idCell = row.cells[0]; // Assuming the first cell contains the item ID

        // Check if the item ID in the current row matches the entered item ID
        if (idCell.textContent === itemId) {
            // Remove the row from the table
            tableBody.removeChild(row);
            // Perform any other necessary updates (e.g., update total price)
            break; // Exit the loop since we found and removed the item
        }
    }

    // Close the clear modal
    closeClearModal();
}



