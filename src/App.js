import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Footer from './components/Footer';


import ProductPage from './pages/ProductPage';
import Search from "./pages/Search";

import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import './App.css';

function App() {
  return (
    <>
    <Router>
      <div className="App">
        <header className="App-header">
          <AuthProvider>
            <TopBar />
            <NavBar />
            <div className='content'>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/product" element={<ProductPage/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/search" element={<Search/>} />
              </Routes>
            </div>
        </AuthProvider>
        <Footer/>
        </header>
       
      </div>
    </Router>
    </>
  );
}

export default App;
