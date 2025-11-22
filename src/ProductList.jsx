import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { addItem } from './CartSlice';
import { useDispatch, useSelector } from 'react-redux';

function ProductList({ onHomeClick }) {
    const dispatch = useDispatch();
    
    // --- STATE VARIABLES ---
    const [showCart, setShowCart] = useState(false);
    const [showPlants, setShowPlants] = useState(false); // <-- USED BELOW
    const [addedToCart, setAddedToCart] = useState({}); // <-- USED BELOW

    // --- REDUX STORE ---
    const cartItems = useSelector(state => state.cart.items); // <-- USED BELOW

    // --- HELPER FUNCTIONS ---
    const calculateTotalQuantity = () => {                 // <-- USED BELOW
        return cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
    };

    const handleHomeClick = (e) => {
        e.preventDefault();
        onHomeClick();
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
    };

    const handlePlantsClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowCart(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(false); // optional: hide plants if returning home
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        setAddedToCart(prevState => ({
            ...prevState,
            [product.name]: true,
        }));
    };

    return (
        <div>
            {/* NAVBAR */}
            <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
                <div className="tag">
                    <div className="luxury">
                        <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" />
                        <a href="/" onClick={handleHomeClick}>
                            <div>
                                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '250px' }}>
                    <a href="#" onClick={handlePlantsClick} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>Plants</a>
                    <a href="#" onClick={handleCartClick} style={{ color: 'white', fontSize: '20px', textDecoration: 'none', position: 'relative' }}>
                        Cart ({calculateTotalQuantity()}) {/* <-- SHOW TOTAL QUANTITY */}
                    </a>
                </div>
            </div>

            {/* CONDITIONAL RENDERING */}
            {showCart ? (
                <CartItem onContinueShopping={handleContinueShopping} />
            ) : (
                <div>
                    {showPlants && (  // <-- SHOW PLANTS SECTION
                        <div className="product-grid">
                            {/* Example: Only render plants if showPlants is true */}
                            {/* Replace this with your plantsArray map */}
                            <h2>Our Plants</h2>
                            {/* Loop through categories and plants here */}
                        </div>
                    )}

                    {/* Product List */}
                    <div className="product-grid">
                        {/* Example for product cards */}
                        {/* Add your plantsArray.map here */}
                        <p>Total items added to cart: {calculateTotalQuantity()}</p> {/* Optional extra indicator */}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
