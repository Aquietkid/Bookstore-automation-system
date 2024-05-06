// function addItem(event) {
//     event.preventDefault(); // Prevent the default form submission behavior
//     const itemName = document.getElementById('Name').value;
//     const itemPrice = document.getElementById('Price').value;
//     const itemQty = document.getElementById('Quantity').value;

//     const postData = {
//         itemName: itemName,
//         itemPrice: itemPrice,
//         itemQty: itemQty
//     };

//     // Configuration for the fetch request
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(postData)
//     };

//     fetch(`http://localhost:20419/inventory/add/item`, requestOptions)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Response from server:', data);
//             alert('Item added successfully!'); // Alert the user that the item was added
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Failed to add item: ' + error.message); // Alert the user about the error
//         });
// }
function addItem() {

    event.preventDefault();
    const itemName = document.getElementById('Name').value;
    const itemPrice = document.getElementById('Price').value;
    const itemQty = document.getElementById('Quantity').value;

    const postData = {
        itemName: itemName,
        itemPrice: itemPrice,
        itemQty: itemQty
    };

    // Configuration for the fetch request
    const requestOptions = {
        method: 'POST', // specify the HTTP method
        headers: {
            'Content-Type': 'application/json' // specify the content type
        },
        body: JSON.stringify(postData) // convert postData to JSON string
    };

    fetch(`http://localhost:20419/inventory/add/item/${itemName}/${itemPrice}/${itemQty}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data);
            alert('Item added successfully!'); // Alert the user that the item was added
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add item: ' + error.message); // Alert the user about the error
        });


}