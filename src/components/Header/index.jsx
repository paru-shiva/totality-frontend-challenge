import "./index.css";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";
import { PiPackageLight } from "react-icons/pi";

import { Link } from "react-router-dom";

const Header = () => {
  let [userEmail, setUserEmail] = useState("");
  let token = Cookies.get("jwt_token");
  useEffect(() => {
    const getEmail = async () => {
      let options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        "https://totality-backend-hima.onrender.com/getemail",
        options
      );
      const { email } = await response.json();
      setUserEmail(email);
    };
    getEmail();
  }, []);

  const navigateTo = useNavigate();
  const onLogoutClick = () => {
    Cookies.remove("jwt_token");
    navigateTo("/login");
  };
  return (
    <div className="HeaderComponent">
      <div className="headerLeft">
        <Link to="/" className="headerLeft">
          <img className="headerImg" src="/totalityCorpImage.jpg" />
          <h4 className="headerTitle">Totality Corp</h4>
        </Link>
      </div>
      <div className="headerRight desktopHeader">
        <Link to="/cart" className="headerLinks">
          Cart {<GiShoppingCart />}
        </Link>

        <p className="headerLinks">{userEmail}</p>
        <button
          onClick={onLogoutClick}
          type="button"
          className="logoutBtn headerLinks"
          to="/cart"
        >
          Logout
        </button>
      </div>
      <div className="headerRight mobileHeader">
        <Link to="/cart" className="headerLinks">
          <GiShoppingCart />
        </Link>

        <p className="headerLinks">{userEmail}</p>
        <button
          onClick={onLogoutClick}
          type="button"
          className="logoutBtn headerLinks"
          to="/cart"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
