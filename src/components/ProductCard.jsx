import React from 'react'
import {ReactComponent as Heart} from '../assets/svg/heart.svg'
import './ProductCard.css'

const images = require.context('../assets/', false, /\.(png|jpe?g|svg)$/);

export const ProductCard = ({data}) => {
  const imageSrc = data.src;
  return (
    <div className='card'>
        <div className='card-image-background'>
            <img src={imageSrc} alt="Product" className='card-image'/>

            <button className='card-favorite-button'>
              <Heart className="heart-icon"/>
            </button>
        </div>
        <p className='card-title'>{data.title}</p>
        <span className='card-price-container'>
            <p className='card-price'>{data.price}DT</p>
            <p className='card-old-price'>{data.old_price?data.old_price+'DT':''}</p>
        </span>
    </div>
  )
}