

async function deleteItem() {
    console.log("deleteItem function called");
    event.preventDefault(); // Prevent default form submission
    const selectedItem = document.getElementById('ItemID').value;
    try {
        const response = await fetch(`http://localhost:20419/inventory/delete/${selectedItem}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete item.');
        }
        const data = await response.json();
        console.log(data.message); // Assuming the server returns a JSON object with a 'message' field
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}
