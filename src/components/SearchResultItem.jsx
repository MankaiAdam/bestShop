import React from 'react';
import { useNavigate } from "react-router-dom";
import {ReactComponent as Heart} from '../assets/svg/heart.svg';
import './SearchResultItem.css';

const SearchResultItem = ({product}) => {
  const navigate = useNavigate();
  const imageUrl = product.PRIMARY_IMAGE_URL || 'product_imgs/default-item.svg';
  return (
    <div className="search-item-container" onClick={() => navigate(`/product?ref=${product.PRD_ID}`)}>
      <div className="search-item-image-container">
        <img src={imageUrl} alt="prodImg" className="search-item-image" />
      </div>
      <div className="search-item-details">
        <p className="search-item-title">{product.PRD_NAME}</p>
        <p className="search-item-description">{product.PRD_DESCRIPTION}</p>
      </div>
      <div className="search-item-details2">
        <p className="search-item-price">{product.MIN_PRICE}DT</p>
        <div className='search-item-btns'>
          <button className="add-to-cart-btn"><span>+</span>Ajouter au panier</button>
          <button className="wishlist-btn"><Heart className='wishlist-heart' stroke="#fff" />Wishlist</button>
        </div>
        <p className="search-item-availability">{product.STOCK === 0? "EN STOCK":product.STOCK === 1? "EN ARRIVAGE": "HORS STOCK"}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;