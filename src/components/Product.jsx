import React, {useContext, useState, useEffect } from "react";
import { AuthContext } from '../contexts/AuthContext';
import RatingStar from "./RatingStar";
import {ReactComponent as Heart} from '../assets/svg/heart.svg';
import "./Product.css";

const FilledCircle = ({ size, color}) => {
  return (
    <div
      className={"circle"}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        borderRadius: "50%",
      }}
    ></div>
  );
};

const Product = ({productInfo}) => {
  const {handleAddToCartButton, handleAddToWishlistButton} = useContext(AuthContext);
  const [mainImage, setMainImage] = useState(productInfo.details.PRIMARY_IMAGE_URL);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMainImage(productInfo.details.PRIMARY_IMAGE_URL);
  }, [productInfo.details.PRIMARY_IMAGE_URL]);
  
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubImageClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    let stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<RatingStar offset={1.0}/>);
    }

    if (hasHalfStar) {
      stars.push(<RatingStar offset={rating-fullStars}/>);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<RatingStar offset={0.0}/>);
    }

    return stars;
  };

  return (
    <div className="Product">
      <div className="product-imgs-container">
        <img className="product-main-img" src={mainImage || 'product_imgs/default-item.svg'} />
        <div className="product-sub-img-container">
          {productInfo.images.map((image, index) => (
            <img 
              key={index} 
              className={`product-sub-img ${mainImage === image.IMG_URL ? 'active' : ''}`} 
              src={image.IMG_URL}
              onClick={() => handleSubImageClick(image.IMG_URL)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </div>
      <div className="ProductDescription PublicSans">
        <h1>{productInfo.details.PRD_NAME}</h1>
        <div className="product-general-info">
          <img src={productInfo.details.PRD_BRAND?`brand_logos/${productInfo.details.PRD_BRAND}.png`:'whitelabel.png'} className="product-brand-label"/>

          {/*<h2>{productInfo.details.PRD_BRAND}</h2>*/}
          <div className="StarContainer">
            {generateStars(productInfo.ratings.ratingDetails.avg_rating)}
          </div>
          <h4 fon>({productInfo.ratings.ratingDetails.nb_rating} avis)</h4>
        </div>

        <hr className="DashedLine"/>

        <div className="product-availability">
          <span className="price-range">{productInfo.details.MIN_PRICE} DT</span>
          <span className="stock" style={{ color: productInfo.details.STOCK === 0 ? "#22C55E" : productInfo.details.STOCK === 1 ? "#5c99df" : "#d84e4e"}}>
            {productInfo.details.STOCK === 0? "EN STOCK":productInfo.details.STOCK === 1? "EN ARRIVAGE": "HORS STOCK"}
          </span>
        </div>
        <div className="product-buttons">
          <button className="add-to-cart-btn" onClick={() => handleAddToCartButton(productInfo.details)}><span>+</span>Ajouter au panier</button>
          <button className="wishlist-btn" onClick={() => handleAddToWishlistButton(productInfo.details)}><Heart className='wishlist-heart' stroke="#fff" />Wishlist</button>
        </div>
        <div className="product-option">
          <h4>Couleur </h4>
          <span>
            <FilledCircle size={20} color="black"/>   
            <FilledCircle size={20} color="#848884"/>   
            <FilledCircle size={20} color="#AAAAAA"/>   
          </span>
        </div>
        
        <h3>Details produit </h3>

        <div className="product-detail">
          <h4>Couleur </h4>
          <h4>Noir</h4>
        </div>
        <div className="product-detail">
          <h4>Pays d'origine </h4>
          <h4>Chine</h4>
        </div>
        <hr className="DashedLine"/>
        
        <h3>À propos de cet article </h3>

        <p className={`${isExpanded ? '' : 'truncated'}`}>{productInfo.details.PRD_DESCRIPTION}</p>
        <span className="toggle" onClick={toggleText}>
          {isExpanded ? 'Show less' : 'Show more'}
        </span>

      </div>
    </div>
  );
};

export default Product;
