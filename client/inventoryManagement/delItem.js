function delItem() {
    const itemID = document.getElementById('ItemID').value;

    fetch(`http://localhost:20419/inventory/delete/item/${itemID}`)
    .then(response => {
        // Check if the response is successful (status code 200)
        if (!response.ok) {
            console.log('response not ok');
            throw new Error('Network response was not ok');
        }
        // Parse the JSON response
        console.log('response.json() returned');
        return response.json();
    })
    .then(data => {
        // Display the quotation result on the HTML page
        console.log(data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error('There was a problem with the fetch operation:', error);
        // Display an error message on the HTML page
    });
}


/// GPT ki bakwaas
// async function delItem() {
//     try {
//         const itemID = document.getElementById("ItemID").value;

//         const response = await fetch(`http://localhost:20419/supplier/${itemID}`);

//         // Check if the response is successful (status code 200)
//         if (!response.ok) {
//             console.log('response not ok');
//             throw new Error('Network response was not ok');
//         }

//         // Parse the JSON response
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         // Handle any errors that occurred during the fetch
//         console.error('There was a problem with the fetch operation:', error);
//         // Display an error message on the HTML page
//     }
// }
