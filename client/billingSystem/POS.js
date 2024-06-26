// Function to fetch items from the database and populate the dropdown menu
async function fetchItems() {
    try {
        const response = await fetch('http://localhost:20419/inventory/all/items');
        const data = await response.json();

        const itemDropdown = document.getElementById('itemDropdown');

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select an item';
        itemDropdown.appendChild(defaultOption);

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
async function addToCart() {
    const itemDropdown = document.getElementById('itemDropdown');
    const itemID = itemDropdown.value;
    const itemName = itemDropdown.options[itemDropdown.selectedIndex].text;
    const itemQty = document.getElementById('quantity').value;

    const itemPrice = await getItemPrice(itemID);

    //Checking if the quantity is less than 1
    if(itemQty < 1)
        {
            alert('Quantity cannot be less than 1!');
            return;
        }

    // Add selected item to the table
    const itemTableBody = document.getElementById('itemTableBody');

    const itemTable = document.getElementById('itemTable');
    for (var ii = 0, row; row = itemTable.rows[ii]; ii++) {
        if (row.cells[0].innerText == itemID) {
            row.cells[3].innerText = parseInt(row.cells[3].innerText) + parseInt(itemQty);
            const price = document.getElementById("total-price-value");
            const intPrice = parseInt(price.innerText);
            document.getElementById('total-price-value').innerText = parseInt(intPrice + (parseInt(itemPrice) * parseInt(itemQty)));
            return;
        }
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${itemID}</td>
        <td>${itemName}</td>
        <td>${itemPrice}</td>
        <td>${itemQty}</td>
    `;
    itemTableBody.appendChild(newRow);

    const price = document.getElementById("total-price-value");
    const intPrice = parseInt(price.innerText);
    document.getElementById('total-price-value').innerText = parseInt(intPrice + (parseInt(itemPrice) * parseInt(itemQty)));
}


async function getItemPrice(id) {
    try {
        const response = await fetch(`http://localhost:20419/inventory/price/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch item price');
        }
        const data = await response.json();
        return JSON.stringify(data.data.price);
    } catch (error) {
        console.error('Error fetching item price:', error.message);
    }
}


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


async function checkOut() {
    event.preventDefault();
    const itemTable = document.getElementById('itemTable');
    for (var ii = 0, row; row = itemTable.rows[ii]; ii++) {
        var itemID = row.cells[0].innerText;
        var quantityChange = row.cells[3].innerText;

        try {
            console.log('Trying to checkout');
            const response = await fetch(`http://localhost:20419/inventory/${itemID}/${quantityChange}/updateQuantity`,{
                method: 'PUT'
            });
            // if (!response.ok) {
            //     console.log(response);
            //     console.log(itemID);
            //     console.log(quantityChange);
            //     console.log('Response unokay');
            //     throw new Error('Failed to contact server');
            // }
            const data = await response.json();
            console.log("response is ", response.ok);
            console.log(data);
        } catch (error) {
            console.error('Cannot place order: ', error.message);
        }
    }
}

window.addEventListener(onload, fetchItems());


