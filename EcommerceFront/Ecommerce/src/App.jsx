import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home">

      <h1 className='title'>Welcome to Our Ecommerce Store</h1>

      <button onClick={() => navigate("/products")}>
        All Products
      </button>

      <button onClick={() => navigate("/add-product")}>
        Add Product
      </button>

    </div>
  );
}

function App() {

  return (
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
  );
}

export default App;