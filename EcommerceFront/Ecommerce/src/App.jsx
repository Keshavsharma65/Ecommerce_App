import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import '../src/components/NavBar.css';

import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';


function Home() {

  return (
    <div className="home">
    </div>
  );

}


function App() {

  return (
    <>

      <Navbar />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />


        {/* ALL PRODUCTS */}
        <Route
          path="/products"
          element={<Products />}
        />


        {/* PRODUCT DETAILS */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />


        {/* ADD PRODUCT */}
        <Route
          path="/add-product"
          element={<AddProduct />}
        />


        {/* UPDATE PRODUCT */}
        <Route
          path="/update-product/:id"
          element={<UpdateProduct />}
        />


        {/* CART */}
        <Route
          path="/cart"
          element={<Cart />}
        />


        {/* CHECKOUT */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />


        {/* ORDERS */}
        <Route
          path="/orders"
          element={<Orders />}
        />

      </Routes>

    </>
  );
}


export default App;