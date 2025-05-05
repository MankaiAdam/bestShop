import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

import {ReactComponent as Heart} from '../assets/svg/heart.svg';
import cartIcon from "../assets/cart.png";
import deleteIcon from "../assets/svg/delete-icon.svg";

import "./Cart.css";

const Cart = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const { user, cart, setCart, setCartCount, updateQuantity} = useContext(AuthContext);

    const columns = [
        { headerName: 'Produit', width: "400px" , align: "start"},
        { headerName: 'Prix', width: '180px', align: "center"},
        { headerName: 'Quantité', width: "180px", align: "center"},
        { headerName: 'Boutique', width: "180px" , align: "center"},
        { headerName: 'Status',options: {0: '#48BB78',1: '#5c99df',2:'#d84e4e'}, width: '150px', align: "center"},
        { headerName: '', width: '80px', align: "center"},
    ];

    /*useEffect(() => {
        setLoading(user?.cart?.length > 0?true:false);
        const fetchcartItems = async () => {
            try {
                const fetched = await Promise.all(
                    user.cart.map(async (item) => {
                        const data = new FormData();
                        data.append('prd_id', item.PRD_ID);
                        data.append('shp_id', item.SHP_ID);
                        const response = await axios.post('http://localhost/cartItem.php', data );
                        console.log(response.data);
                        
                        const product = response.data?.[0];
                        return product ? { ...product, QUANTITY: parseInt(item.QUANTITY) } : null;
                    })
                );
                setcartItems(fetched.filter(Boolean));
            } catch (error) {
                console.error("Error fetching cart products:", error);
            }finally{
                setLoading(false);
            }
        };
        if(user?.cart?.length){
            fetchcartItems();
        }
        
    }, []);*/

    useEffect(() => {
        setLoading(user?true:false);
        const fetchCart = async () => {
            try {
                const data = new FormData();
                data.append('user_id', user.id);
                const response = await axios.post('http://localhost/fetchCart.php', data );
                //console.log(response.data);
                if(response.data.error){
                    console.log("Error fetching cart products:", response.data.message);
                }else{
                    console.log("success");
                    setCart(response.data);
                }
            } catch (error) {
                console.error("Error fetching cart products:", error);
            } finally {
                setLoading(false);
            }
        };
        if(!user){
            console.log("no user");
        }
        if(user){
            fetchCart();
        }
    }, []);

    const renderRow = (product) => {
        
        const deleteItem = async(prd_id, shp_id) => {
            const Data = new FormData();
            Data.append('prd_id', prd_id);
            Data.append('shp_id', shp_id);
            Data.append('user_id', user.id);

            try{
                const response = await axios.post('http://localhost/deleteFromCart.php', Data );
                console.log(response.data);

                const updatedItems = cart.filter(
                    item => !(item.PRD_ID === prd_id && item.SHP_ID === shp_id)
                );
                console.log("Updated cart items:", updatedItems);
                
                //setUser(updatedUser);
                setCart(updatedItems);
                setCartCount(updatedItems.length);
            } catch (error) {
                console.error("Error updating cart", error);
            } finally{
                console.log("deleted cart item");
            }
        };

        return (
            <div className="cart-row" key={product.PRD_ID} onClick={()=> navigate(`/product?ref=${product.PRD_ID}`)}>
                <div className="cart-cell" style={{ width: columns[0].width ,justifyContent: columns[0].align}}>
                    <img className="cart-prd-img" src={product.PRIMARY_IMAGE_URL} alt={product.PRD_NAME} width="100" />
                    <span>{product.PRD_NAME}</span>
                </div>
                <div className="cart-cell" style={{ width: columns[1].width ,justifyContent: columns[1].align }}>
                    <span>{product.PRICE} DT</span>
                </div>
                <div className="cart-cell" style={{ width: columns[2].width ,justifyContent: columns[2].align }}>
                    <div class="cart-number-input">
                        <button class="btn-down" onClick={(e)=> {
                            e.stopPropagation();
                            updateQuantity(product, product.QUANTITY - 1);}}>-</button>
                        <input
                            type="number"
                            value={product.QUANTITY}
                            className="cart-quantity-input"
                            onChange={(e)=>{
                                const val = parseInt(e.target.value);
                                updateQuantity(val);
                            }}/>
                        <button class="btn-up" onClick={(e)=>{
                            e.stopPropagation();
                            updateQuantity(product, parseInt(product.QUANTITY) + 1);}}>+</button>
                    </div>
                </div>
                <div className="cart-cell" style={{ width: columns[3].width ,justifyContent: columns[3].align}}>
                    <a href={product.PRICE_URL} target="_blank" onClick={(e)=>e.stopPropagation()}>
                        <img className="cart-shp-img" src={`./shop_imgs/${product.SHP_ID}.png`} alt={product.SHP_ID} />
                    </a>
                </div>
                <div className="cart-cell" style={{ width: columns[4].width ,justifyContent: columns[4].align }}>
                    <span className="cart-status" style={{ backgroundColor: columns[4].options[product.STOCK] }}>{product.STOCK === 2 ? "Hors Stock" :product.STOCK === 1 ? "En Arrivage":"En Stock"}</span>
                </div>
                <div className="cart-cell" style={{ width: columns[5].width ,justifyContent: columns[5].align}}>
                    <button className="cart-delete-button" >
                        <img src={deleteIcon} alt="Delete" onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(product.PRD_ID, product.SHP_ID);}}/>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            <div className='cart-container'>
                <div className='breadcrumbs'>
                    <span className='breadcrumb'>
                        <a href='/'>Acceuil</a>{' > '}
                    </span>
                    <span className='breadcrumb'>Panier</span>
                </div>
                <div className="cart-icon">
                    <img src= {cartIcon} alt="" className="cart-image"/>
                </div>
                <h2>Panier</h2>
                <div className="cart">
                    <div className="cart-header">
                        {columns.map((column) => (
                            <div
                                className="cart-header-cell"
                                style={{ width: column.width ,justifyContent: column.align}}
                                key={column.field}
                            >
                                <span>{column.headerName}</span>
                            </div>
                        ))}
                    </div>
                    <div className="cart-rows-wrapper">
                        {
                        !loading?
                        cart.length? cart.map((item) => renderRow(item))
                        :user? <div className="cart-empty">Aucun produit dans votre panier.</div>
                        : <div className="cart-empty">Veuillez vous connecter pour voir vos produits.</div>
                        : <div className="cart-empty">Loading...</div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;