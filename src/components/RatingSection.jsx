import React, { useState, useEffect } from "react";
import axios from 'axios';
import RatingStar from "./RatingStar";
import "./RatingSection.css";

  
const RatingSection = ({results}) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const generateStars = (nb) => {

        let stars = [];
        for (let i = 0; i < nb; i++) {
          stars.push(<RatingStar offset={1.0}/>);
        }

        return stars;
    };

    const generateStars1 = (rating) => {
        const fullStars = Math.floor(rating); 
        const emptyStars = 5 - Math.ceil(rating);
    
        let stars = [];
        for (let i = 0; i < fullStars; i++) {
          stars.push(<RatingStar offset={1.0}/>);
        }
    
        for (let i = 0; i < emptyStars; i++) {
          stars.push(<RatingStar offset={0.0}/>);
        }
    
        return stars;
    };

    const destributionItems = (ratingCounts) => {
        let maxCount = 0; 
        //console.log(ratingCounts);

        for (let i = 1; i <=5; i++) {
            if (ratingCounts[i] > maxCount) {
                maxCount = ratingCounts[i];
            }
        }
        //console.log(`maxCount: ${maxCount}`);
        let destributionItems = [];
        for (let i = 5; i >= 1; i--) {
            //console.log(`ratingCounts[${i}]: ${ratingCounts[i]}`);
            
            const percentage = 7 + (ratingCounts[i] / maxCount) * 93;
            destributionItems.push(
                <span className="rating-distribution-item" onClick={() => searchReviews(i)} key={i}>
                    <span className="rating-distribution-item-stars">
                        {generateStars(i)}
                    </span>
                    <div className="rating-distribution-item-bar">
                        <div  style={{width: `${percentage}%`}}></div>
                    </div>
                    <span className="rating-distribution-item-count">{ratingCounts[i]}</span>
                </span>
            );
        }

        return destributionItems;
    };

    const generateReviews = (Reviews) => {
        let reviews = [];
        
        for (let i = 0; i < Reviews.length; i++) {
            const dateStr = Reviews[i].RATE_DATE;
            const formattedDate = new Date(dateStr).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
            });
            reviews.push(
                <div className="review">
                    <span className="review-writer">{Reviews[i].USR_FIRST} {Reviews[i].USR_LAST}</span>
                    <div className="review-info">
                        <span className="review-stars">
                            {generateStars1(Reviews[i].RATING)}
                        </span>
                        <span className="review-date">{formattedDate}</span>
                    </div>
                    <p className="review-body">{Reviews[i].COMMENT}</p>
                </div>
            );
        }
        return reviews;
    };

    const searchReviews = async (stars) => {
        setLoading(true);

        const ReviewsData = new FormData();
        ReviewsData.append('id', results.details.PRD_ID);
        ReviewsData.append('stars', stars);

        try {
            const response = await axios.post('http://localhost/reviews.php', ReviewsData);
            
            if (response.data.error) {
                console.log(response.data.error);
                setReviews([]);
            } else if (response.data) {
                console.log(response.data);
                setReviews(response.data);
            } else {
                console.log("Unexpected Response:", response.data);
                setReviews([]);
            }
        } catch (error) {
            console.error("Review Search failed:", error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        searchReviews(null);
    },[results]);

    useEffect(() => {
        searchReviews(null);
    }, []);

    return (
        <>
            <div className="rating-container">
                <div className="rating-general-info-container">
                    <span className="rating-general-info-title">Avis&Evaluations</span>
                    <div className="rating-general-info">
                        <div className="global-rating">
                            <span className="global-rating-value">{parseFloat(results.ratings.ratingDetails.avg_rating).toFixed(1)}</span>
                            <span className="global-rating-nb" onClick={() => searchReviews(null)}>{results.ratings.ratingDetails.nb_rating} avis</span>
                        </div>
                        <div className="rating-distribution">
                            {destributionItems(results.ratings.ratingCounts)}
                        </div>
                    </div>
                </div>
                <div className="reviews-container">
                    <div className="review-title">{reviews.length} Evaluations</div>
                    <div className="reviews-scroll">
                        {generateReviews(reviews)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RatingSection;