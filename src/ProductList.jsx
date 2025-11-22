import React, { useState } from 'react';
import './ProductList.css';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';     // ← Added
import { addItem } from './CartSlice';                       // ← Added

function ProductList({ onHomeClick }) {
    const [showCart, setShowCart] = useState(false);
    const [addedToCart, setAddedToCart] = useState({});

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);   // ← Get cart from Redux

    // Calculate total items in cart for the badge
    const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [ /* ... your full plantsArray stays unchanged ... */ ];

    // ... (style objects unchanged) ...

    const handleHomeClick = (e) => { e.preventDefault(); onHomeClick(); };
    const handleCartClick = (e) => { e.preventDefault(); setShowCart(true); };
    const handleContinueShopping = (e) => { e.preventDefault(); setShowCart(false); };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));                         // ← Redux dispatch
        setAddedToCart((prev) => ({ ...prev, [product.name]: true }));
    };

    return (
        <div>
            {/* Navbar – now with live cart count */}
            <div className="navbar" style={styleObj}>
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

                <div style={styleObjUl}>
                    <div>
                        <a href="#" onClick={(e) => { e.preventDefault(); }} style={styleA}>
                            Plants
                        </a>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <a href="#" onClick={handleCartClick} style={styleA}>
                            <h1 className='cart'>
                                <svg /* ...your svg... */ />
                                {/* Live cart badge */}
                                {totalCartQuantity > 0 && (
                                    <span className="cart-badge">
                                        {totalCartQuantity}
                                    </span>
                                )}
                            </h1>
                        </a>
                    </div>
                </div>
            </div>

            {/* Product Grid or Cart */}
            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h1><div>{category.category}</div></h1>
                            <div className="product-list">
                                {category.plants.map((plant, plantIndex) => (
                                    <div className="product-card" key={plantIndex}>
                                        <img className="product-image" src={plant.image} alt={plant.name} />
                                        <div className="product-title">{plant.name}</div>
                                        <div className="product-description">{plant.description}</div>
                                        <div className="product-cost">{plant.cost}</div>
                                        <button
                                            className="product-button"
                                            onClick={() => handleAddToCart(plant)}
                                            disabled={addedToCart[plant.name]}
                                        >
                                            {addedToCart[plant.name] ? 'Added' : 'Add to Cart'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <CartItem onContinueShopping={handleContinueShopping} />
            )}
        </div>
    );
}

export default ProductList;
