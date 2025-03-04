import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../CartSlice";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState({});

  const plantsArray = [
    { category: "Indoor Plants", plants: [ { name: "Fiddle Leaf Fig", image: "https://via.placeholder.com/200", description: "A beautiful indoor plant.", cost: 50 }, { name: "Snake Plant", image: "https://via.placeholder.com/200", description: "Easy-to-care-for plant.", cost: 30 } ] },
    { category: "Outdoor Plants", plants: [ { name: "Rose Bush", image: "https://via.placeholder.com/200", description: "Bright roses for your garden.", cost: 40 } ] },
  ];

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
    setAddedToCart(prev => ({ ...prev, [product.name]: true }));
  };

  return (
    <div className="product-grid">
      {plantsArray.map((category, index) => (
        <div key={index}>
          <h1>{category.category}</h1>
          <div className="product-list">
            {category.plants.map((plant, plantIndex) => (
              <div className="product-card" key={plantIndex}>
                <img className="product-image" src={plant.image} alt={plant.name} />
                <div className="product-title">{plant.name}</div>
                <div className="product-description">{plant.description}</div>
                <div className="product-cost">${plant.cost}</div>
                <button
                  className={`product-button ${addedToCart[plant.name] ? "added-to-cart" : ""}`}
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedToCart[plant.name]}
                >
                  {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
