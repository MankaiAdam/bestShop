import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Product from '../components/Product.jsx';
import ProductSellers from '../components/ProductSellers.jsx';
import ProductExtras from '../components/ProductExtra.jsx';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
  
const ProductPage = () => {
    const query = useQuery().get("ref");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get('http://localhost/product.php', { params: { query } });

                console.log(response);
                if (response.data.error) {
                    console.log(response.data.error);
                    setResults([]);
                } else if (response.data) {
                    console.log(response.data);
                    setResults(response.data);
                } else {
                    console.log("Unexpected response:", response.data);
                    setResults([]);
                }
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        };
        if (query) {
            fetchResults();
        }
    }, [query]);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className='breadcrumbs'>
                {results.category_chain.reverse().map((cat, index) => (
                    <span key={index} className='breadcrumb'>
                        <a href=''>{cat.CAT_NAME}</a>
                        {index < results.category_chain.length - 1 && ' > '}
                    </span>
                ))}
            </div>
            <Product productInfo={results}/>
            <ProductSellers results={results}/>
            <ProductExtras results={results}/>
            <br></br>
        </>
    );
};

export default ProductPage;