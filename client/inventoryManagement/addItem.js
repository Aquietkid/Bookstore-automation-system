
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
        })
        .catch(error => {
            console.error('Error:', error);
        });


    // fetch(`http://localhost:20419/inventory/add/item/${itemName}/${itemPrice}/${itemQty}`)
    //     .then(response => {
    //         // Check if the response is successful (status code 200)
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         // Parse the JSON response
    //         return response.json();
    //     })
    //     .then(data => {

    //         // Display the quotation result on the HTML page
    //         console.log(data);
    //     })
    //     .catch(error => {
    //         // Handle any errors that occurred during the fetch
    //         console.error('There was a problem with the fetch operation:', error);
    //         // Display an error message on the HTML page

    //     });

}