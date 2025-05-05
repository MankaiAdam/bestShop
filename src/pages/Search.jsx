import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { ReactComponent as SearchIcon } from '../assets/svg/search-icon.svg';
import arrow from '../assets/svg/arrow2.svg';
import SearchResultItem from '../components/SearchResultItem';
import './Search.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};
  
const Search = () => {
    const query = useQuery().get("query");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState({
        stockage: false,
        ecran: false,
        carteGraphique: false,
        memoire: false,
    });
  
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
                        <div 
                            className='filter-label' 
                            onClick={() => setShowFilters({ ...showFilters, stockage: !showFilters.stockage })}
                        >
                            <h3>Stockage</h3>
                            <img src={arrow} alt="" className={showFilters.stockage ? "active" : ""}/>
                        </div>
                        {showFilters.stockage && (
                            <div className='filter-elements'>
                                <label className="container">
                                    <input type="checkbox"/>
                                    512 Go SSD
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    1To SSD
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    1To HDD
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className='filter-group'>
                        <div 
                            className='filter-label' 
                            onClick={() => setShowFilters({ ...showFilters, carteGraphique: !showFilters.carteGraphique })}
                        >
                            <h3>Carte Graphique</h3>
                            <img src={arrow} alt="" className={showFilters.carteGraphique ? "active" : ""}/>
                        </div>
                        {showFilters.carteGraphique && (
                            <div className='filter-elements'>
                                <label className="container">
                                    <input type="checkbox"/>
                                    Intel UHD Graphics
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    NVIDIA RTX 2050
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    NVIDIA RTX 3060
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    NVIDIA RTX 4050
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    NVIDIA RTX 4060
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className='filter-group'>
                        <div 
                            className='filter-label' 
                            onClick={() => setShowFilters({ ...showFilters, memoire: !showFilters.memoire })}
                        >
                            <h3>Mémoire</h3>
                            <img src={arrow} alt="" className={showFilters.memoire ? "active" : ""}/>
                        </div>
                        {showFilters.memoire && (
                            <div className='filter-elements'>
                                <label className="container">
                                    <input type="checkbox"/>
                                    16 Go DDR4
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    8 Go DDR5
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    16 Go DDR5
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    32 Go DDR5
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className='filter-group'>
                        <div 
                            className='filter-label' 
                            onClick={() => setShowFilters({ ...showFilters, ecran: !showFilters.ecran })}
                        >
                            <h3>Écran</h3>
                            <img src={arrow} alt="" className={showFilters.ecran ? "active" : ""}/>
                        </div>
                        {showFilters.ecran && (
                            <div className='filter-elements'>
                                <label className="container">
                                    <input type="checkbox"/>
                                    15 pouces
                                    <span className="checkmark"></span>
                                </label>
                                <label className="container">
                                    <input type="checkbox"/>
                                    17 pouces
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                        )}
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