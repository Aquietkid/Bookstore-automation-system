import React, { useState } from 'react';
import './homestyle.css';

function Home() {
    const [showModal, setShowModal] = useState(false);

    const handleLearnMore = () => {
        setShowModal(true);
        const modalMessage = document.getElementById("modalMessage");
        modalMessage.innerHTML = "We are a group of four members who are dedicated towards providing IT related solutions.";
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

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
                        <div className="menu">
                            <ul>
                                <li><a href="Quotation.html">Quotation</a></li>
                                <li><a href="IM.html">Inventory Management</a></li>
                                <li><a href="POS.html">POS</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <section className="hero">
                <div className="container">
                    <h1>We are Problem Solvers</h1>
                    <div className="buttons">
                        <button className="btn-outline" onClick={handleLearnMore}>Learn More</button>
                    </div>
                </div>
            </section>

            {showModal && (
                <div id="myModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <p id="modalMessage"></p>
                    </div>
                </div>
            )}

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2024 AEON Technology. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
