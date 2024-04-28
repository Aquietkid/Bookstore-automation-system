// POS.js

import React, { useEffect, useState } from 'react';
import './posstyle.css'; // Import CSS file

const POS = () => {
    // State to store fetched items
    const [items, setItems] = useState([]);

    // Function to fetch data from the database
    const fetchData = async () => {
        try {
            // Make a fetch request to your API endpoint
            const response = await fetch('your_database_endpoint');
            const data = await response.json();
            // Assuming data is an array of items
            setItems(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <header>
                <nav className="navbar">
                    <div className="container">
                        <div className="logo">
                            <a href="Home.html">
                                <img src="logo.png" alt="Logo" />
                            </a>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="container">
                <div className="item-catalog">
                    <h2>Item Catalog</h2>
                    {/* Render items dynamically */}
                    <ul>
                        {items.map((item, index) => (
                            <li key={index}>{item.name}</li> {/* Adjust this based on your item structure */}
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default POS;
