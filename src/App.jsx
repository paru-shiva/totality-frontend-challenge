import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import Notfound from "./components/Notfound";
import "./App.css";
import Cart from "./components/Cart";
import Dashboard from "./components/Dashboard";
import PropertyDetails from "./components/PropertyDetails";
import CartContext from "./context/CartContext";
import { useState } from "react";

function App() {
  const [cartItems, ChangeCartItems] = useState([]);

  const addToCartItems = (newItem) => {
    ChangeCartItems([...cartItems, newItem]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCartItems }}>
      <div className="appComponent">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route exact path="/" Component={Home} />
            <Route exact path="/cart" Component={Cart} />
            <Route exact path="/dashboard" Component={Dashboard} />
            <Route exact path="/properties/:id" Component={PropertyDetails} />
          </Route>
          <Route exact path="/not-found" element={<Notfound />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </CartContext.Provider>
  );
}

export default App;
