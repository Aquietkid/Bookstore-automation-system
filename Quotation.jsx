// GetQuotation.js

import React, { useState } from 'react';
import './qstyle.css'; // Import CSS file

const GetQuotation = () => {
    const [quotationResult, setQuotationResult] = useState(null); // State to store quotation result

    const fetchQuotation = () => {
        const selectedItem = document.getElementById('item').value;

        // Make a request to the API with the selected item ID
        // For demonstration purposes, we'll simulate the API response
        const mockApiResponse = {
            itemName: selectedItem === '1' ? 'Book' : 'Raw Material',
            price: selectedItem === '1' ? '$10' : '$20',
            deliveryTime: selectedItem === '1' ? '2 days' : '3 days'
        };

        // Update the quotation result state with the API response
        setQuotationResult(mockApiResponse);
    };

    return (
        <div className="container">
            <h1>Get Quotation</h1>
            <div className="form-group">
                <label htmlFor="item">Select an item:</label>
                <select id="item" className="select-item">
                    <option value="1">Book</option>
                    <option value="2">Raw Material</option>
                </select>
            </div>
            <button className="btn" onClick={fetchQuotation}>Get Quotation</button>
            {quotationResult && (
                <div className="quotation-result">
                    <h2>Quotation Details</h2>
                    <p><strong>Item:</strong> {quotationResult.itemName}</p>
                    <p><strong>Price:</strong> {quotationResult.price}</p>
                    <p><strong>Delivery Time:</strong> {quotationResult.deliveryTime}</p>
                </div>
            )}
        </div>
    );
};

export default GetQuotation;
