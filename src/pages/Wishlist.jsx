import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

import {ReactComponent as Heart} from '../assets/svg/heart.svg';
import deleteIcon from "../assets/svg/delete-icon.svg";

import "./Wishlist.css";

const Wishlist = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);   
    const { user, wishlist, setWishlist, setWishlistCount, handleAddToCartButton} = useContext(AuthContext);
    const columns = [
        { field: 'title', headerName: 'Produit', width: "400px" , align: "start"},
        { field: 'prix', headerName: 'Prix', width: '180px', align: "center"},
        { field: 'date', headerName: 'Ajouté à', width: "180px", align: "center"},
        { field: 'status', headerName: 'Status',options: {0: '#48BB78',1: '#5c99df',2:'#d84e4e'}, width: '150px', align: "center"},
        { field: 'addtocart', headerName: '', width: '200px', align: "center"},
        { field: 'delete', headerName: '', width: '80px', align: "center"},
    ];
    
    useEffect(() => {
        setLoading(user?true:false);
        const fetchwishlist = async () => {
            try {
                const data = new FormData();
                data.append('user_id', user.id);
                const response = await axios.post('http://localhost/fetchWishlist.php', data );
                console.log(response.data);
                if(response.data.error){
                    console.log("Error fetching wishlist products:", response.data.message);
                }else{
                    console.log("success");
                    setWishlist(response.data);
                }
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            }finally{
                setLoading(false);
            }
        };
        if(user){
            fetchwishlist();
        }
    }, []);

    const deleteItem = async(prd_id) => {
        const Data = new FormData();
        Data.append('prd_id', prd_id);
        Data.append('user_id', user.id);

        try{
            const response = await axios.post('http://localhost/deleteFromWishlist.php', Data );
            console.log(response.data);
            if(response.data.success){
                const updatedWishlist = wishlist.filter(
                    item => !(item.PRD_ID === prd_id)
                );
                console.log("Updated wishlist items:", updatedWishlist);

                setWishlist(updatedWishlist);
                setWishlistCount(updatedWishlist.length);
            }
        } catch (error) {
            console.error("Error updating wishlist", error);
        } finally{
            console.log("deleted wishlist item");
        }
    };

    const renderRow = (product) => {
        return (
            <div className="wishlist-row" key={product.PRD_ID} onClick={()=> navigate(`/product?ref=${product.PRD_ID}`)}>
                <div className="wishlist-cell" style={{ width: columns[0].width ,justifyContent: columns[0].align}}>
                    <img className="wishlist-prd-img"  src={product.PRIMARY_IMAGE_URL} alt={product.PRD_NAME} width="100" />
                    <span>{product.PRD_NAME}</span>
                </div>
                <div className="wishlist-cell" style={{ width: columns[1].width ,justifyContent: columns[1].align }}>
                    <span>{product.MIN_PRICE} DT</span>
                </div>
                <div className="wishlist-cell" style={{ width: columns[2].width ,justifyContent: columns[2].align }}>
                    <span>{product.WISH_DATE}</span>
                </div>
                <div className="wishlist-cell" style={{ width: columns[3].width ,justifyContent: columns[3].align }}>
                    <span className="wishlist-status" style={{ backgroundColor: columns[3].options[product.STOCK] }}>{product.STOCK === 2 ? "Hors Stock" :product.STOCK === 1 ? "En Arrivage":"En Stock"}</span>
                </div>
                <div className="wishlist-cell" style={{ width: columns[4].width ,justifyContent: columns[4].align}}>
                    <button className="wishlist-add-button" onClick={(e)=>{
                        e.stopPropagation();
                        handleAddToCartButton(product)
                        }}>AJOUTER AU PANIER</button>
                </div>
                <div className="wishlist-cell" style={{ width: columns[5].width ,justifyContent: columns[5].align}}>
                    <button className="cart-delete-button">
                        <img src={deleteIcon} alt="Delete" onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(product.PRD_ID);}}/>
                    </button>
                </div>
            </div>
        );
    };
    
    return (
        <>
            <div className='wishlist-container'>
                <div className='breadcrumbs'>
                    <span className='breadcrumb'>
                        <a href='/'>Acceuil</a>{' > '}
                    </span>
                    <span className='breadcrumb'>Liste de souhaits</span>
                </div>
                <div className="wishlist-heart">
                    <Heart stroke={"#000"}/>
                </div>
                <h2>Liste de souhaits</h2>
                <div className="wishlist">
                    <div className="wishlist-header">
                        {columns.map((column, index) => (
                            <div
                                className="wishlist-header-cell"
                                style={{ width: column.width ,justifyContent: column.align}}
                                key={column.field}
                            >
                                <span>{column.headerName}</span>
                            </div>
                        ))}
                    </div>
                    <div className="wishlist-rows-wrapper">
                        {
                        !loading?
                        wishlist.length? wishlist.map((item, index) => renderRow(item))
                        :user? <div className="wishlist-empty">Aucun produit dans votre liste de souhaits.</div>
                        : <div className="wishlist-empty">Veuillez vous connecter pour voir vos produits.</div>
                        : <div className="wishlist-empty">Loading...</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wishlist;