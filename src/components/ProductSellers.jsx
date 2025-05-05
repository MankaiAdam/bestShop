import React from "react";
import "./ProductSellers.css";

const Item = ({seller}) => {
  return (
    <>
      <div className="seller">
        <div className="sellerInfo PublicSans">
          <img src={`shop_imgs/${seller.SHP_ID}.png`} alt="seller Logo" className="sellerLogo" />
          <div className="divider" />
          <h4 className="price">{seller.PRICE}DT</h4>
          <h4 className="stock" style={{ color: seller.STOCK === 0 ? "#22C55E" : seller.STOCK === 1 ? "#5c99df" : "#d84e4e" }}>
            {seller.STOCK === 0? "EN STOCK": seller.STOCK === 1? "EN ARRIVAGE": "HORS STOCK"}
          </h4>
        </div>
          <a className="button PublicSans" href={seller.PRICE_URL} target="_blank">
            <button ><span>+</span> Panier</button>
          </a>
      </div>
    </>
  );
};

const ProductSellers = ({results}) => {
  
  return (
    <>
      <div className="sellersFrame">
        <div className="sellersContainer">
          {results.sellers.length === 0? (
              <div>No Shops Found.</div>
          ):(
              <>
                  {results.sellers.map((seller, index) => (
                      <>
                          <Item key={index} seller={seller}/>
                      </>
                  ))}
              </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductSellers;
