import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { ReactComponent as SearchIcon } from '../assets/svg/search-icon.svg';
import SearchResultItem from '../components/SearchResultItem';
import './Search.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
  
const Search = () => {
    const query = useQuery().get("query");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchResults = async () => {
        try {
            const response = await axios.get('http://localhost/search.php', { params: { query } });

            console.log(response);
            if (response.data.error) {
                console.log(response.data.error);
                setResults([]);
            } else if (response.data.message) {
                console.log(response.data.message);
                setResults(response.data.results);
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
            <div className='search-container'>

                {/*filers*/}
                <div className='filter-container'>
                    <h2>Filtrer</h2>
                    <div className='filter-divider'></div>
                    <div className='filter-group'>
                        <label className='filter-label'>
                            <input type="checkbox" />
                            <h3>Catégorie</h3>
                        </label>
                    </div>
                </div>

                {/*results*/}
                <div className='search-result-container'>
                    <div className='search-top-bar'>
                        <h2>Resultat de recherche</h2>
                        <div className='result-search-bar'>
                            <input type="text" placeholder='Recherche...'/>
                            <SearchIcon className='search-icon' fill='#999999'/>
                        </div>
                    </div>
                    {results.length === 0? (
                        <div>No search results found.</div>
                    ):(
                        <div className='search-result'>
                            {results.map((item, index) => (
                                <>
                                    <SearchResultItem key={index} product={item} />
                                    <div className='search-result-divider'></div>
                                </>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    );
};

export default Search;