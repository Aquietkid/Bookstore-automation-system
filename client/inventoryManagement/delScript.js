async function deleteItem(event) {
    event.preventDefault(); // Prevent default form submission
    const selectedItem = document.getElementById('itemDropdown').value; // Make sure to use the correct ID for the dropdown
    if (!selectedItem) {
        alert('Please select an item to delete.');
        return;
    }
    try {
        const response = await fetch(`http://localhost:20419/inventory/delete/${selectedItem}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete item.');
        }
        const data = await response.json();
        alert(data.message); // Show an alert with the server's response message
        console.log(data.message); // Log the server's response message
        await fetchItems(); // Refresh the items list after deletion
    } catch (error) {
        console.error('Error deleting item:', error);
        alert('Error deleting item: ' + error.message); // Show an alert with the error message
    }
}






// Function to fetch items from the database and populate the dropdown menu
async function fetchItems() {
    try {
        const response = await fetch('http://localhost:20419/inventory/all/items');
        const data = await response.json();

        const itemDropdown = document.getElementById('itemDropdown');
        // Clear existing options
        itemDropdown.innerHTML = '';

        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Select an item';
        itemDropdown.appendChild(defaultOption);

        // Add new options from fetched data
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


window.addEventListener(onload, fetchItems());
