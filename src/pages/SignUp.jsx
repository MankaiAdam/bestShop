import React, { useState } from 'react';
import axios from 'axios';
import EyeShow from '../assets/svg/eye-show.svg';
import EyeHide from '../assets/svg/eye-hide.svg';
import './SignUp.css';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');

    const handleSignUp = async (e) => {
        console.log("Login function called");
        e.preventDefault();
        
        // Prepare the form data to be sent to the server
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('phone', phone);

        try {
            // Send POST request to the PHP script
            const response = await axios.post('http://localhost/signup.php', formData);
            
            // Check the response
            if (response.data.error) {
                console.log(response.data.error);
                setMessage(response.data.error);
            } else if (response.data.message) {
                console.log(response.data.message);
                setMessage(response.data.message);
            } else {
                console.log("Unexpected response:", response.data);
                setMessage('Unexpected response from server.');
            }
        } catch (error) {
            console.error("An error occurred during login:", error);
            setMessage('An error occurred during login.');
        }
    };
    return (
        <>
            <div className='signup-container'>
                <div className='form-container signup-form-container'>
                    <h1>Créer Un Compte</h1>
                    <p>Trouvez tous les articles disponibles en Tunisie, obtenez les meilleures offres. Faites vos achats plus facilement et économisez à chaque achat !</p>
                    <div className='signup-form-divider'></div>
                    <form action="" className='signup-form' onSubmit={handleSignUp}>
                        <div className='form-group'>
                        <select>
                            <option value="">Mr</option>
                            <option value="">Mdm</option>
                        </select>
                        <input 
                            type="text" 
                            placeholder='Nom' required
                            onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <input 
                            type="email" 
                            placeholder='Adresse E-mail' required
                            onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className='form-group'>
                            <div className='password-container'>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder='Mot de passe' required
                                    onChange={(e) => setPassword(e.target.value)}/>
                                <label className='show-password-container'>
                                    <input type="checkbox" onClick={() => setShowPassword(!showPassword)}/>
                                    <img src={showPassword ? EyeShow : EyeHide} alt="eye" className='eye-icon'/>
                                </label>
                            </div>
                            <input
                                type="number"
                                placeholder='Telephone'
                                onChange={(e) => setPhone(e.target.value)}/>
                        </div>
                        <span>
                            <label className="container">
                                <input type="checkbox" required/>
                                <span className="checkmark"></span>
                            </label>
                            J'accepte&nbsp;<a href="/login">les conditions générales d'utilisation</a>
                        </span>
                        <span>
                            <label className="container">
                                <input type="checkbox"/>
                                <span className="checkmark"></span>
                            </label>
                            Je souhaite recevoir la newsletter de BestShop ainsi que des notifications sur les promotions et les baisses de prix des articles.
                        </span>
                        <input type='submit' value="S'inscrire"/>
                    </form>
                    <span >Déjà un compte ?&nbsp;<a href="/login">Connectez-vous</a></span>
                </div>
            </div>
        </>
    );
};

export default SignUp;