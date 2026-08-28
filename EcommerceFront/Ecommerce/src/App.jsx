import './App.css';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import '../src/components/NavBar.css'
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';

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

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        <Route
          path="/update-product/:id"
          element={<UpdateProduct />}
        />

      </Routes>
    </>
  );
}

export default App;