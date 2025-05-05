import React, { useRef } from 'react';
import { Carousel } from '../components/Carousel';
import { ProductCard } from '../components/ProductCard';
import { ReactComponent as Arrow } from '../assets/svg/arrow.svg';
import slides from "../assets/json/CarouselSlides.json";
import smartphones from "../assets/json/Smartphones.json";
import promos from "../assets/json/Promos.json";
import './Home.css';

const Home = () => {
    const containerRef = useRef(null);

    const handleMouseDown = (e) => {
        const container = containerRef.current;
        container.isDown = true;
        container.startX = e.pageX - container.offsetLeft;
        container.scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        const container = containerRef.current;
        container.isDown = false;
    };

    const handleMouseUp = () => {
        const container = containerRef.current;
        container.isDown = false;
        container.style.cursor = 'default';
    };

    const handleMouseMove = (e) => {
        const container = containerRef.current;
        if (!container.isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - container.startX);
        container.startX= x;
        container.scrollLeft = container.scrollLeft - walk;
        
    };

    const ArrowClick = (direction) => {
        const container = containerRef.current;
        const scrollAmount = 260 + 28/2;
        container.scrollLeft += direction ? scrollAmount : -scrollAmount;
    };
    
    return (
        <div className="Home">
            <Carousel data={slides.slides}/>
            <br/>
            <div className="preview-section">
                <h1>Nos Smartphones</h1>
                <div
                    className="promo-cards-container"
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {smartphones.Smartphones.map((SF, index) => {
                        return <ProductCard key={index} data={SF}/>
                    })}
                    <button
                        className='cards-container-arrow cards-container-left-arrow'
                        onClick={() => ArrowClick(0)}
                    >
                        <Arrow className="arrow-icon"/>
                    </button>
                    <button
                        className='cards-container-arrow cards-container-right-arrow'
                        onClick={() => ArrowClick(1)}
                    >
                        <Arrow className="arrow-icon"/>
                    </button>
                </div>
            </div>
            {/*<div className="preview-section">
                <h1>Promos Flash</h1>
                <div
                    className="promo-cards-container"
                    ref={containerRef}
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    {promos.PromoProducts.map((promo, index) => {
                        return <ProductCard key={index} data={promo}/>
                    })}
                    <button
                        className='cards-container-arrow cards-container-left-arrow'
                        onClick={() => ArrowClick(0)}
                    >
                        <Arrow className="arrow-icon"/>
                    </button>
                    <button
                        className='cards-container-arrow cards-container-right-arrow'
                        onClick={() => ArrowClick(1)}
                    >
                        <Arrow className="arrow-icon"/>
                    </button>
                </div>
            </div>*/}
            <br/>
        </div>
    );
};

export default Home;