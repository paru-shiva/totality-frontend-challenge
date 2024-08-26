import "./index.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Header from "../Header";
import { Link } from "react-router-dom";
import CartContext from "../../context/CartContext";

const PropertyDetails = () => {
  const [propData, changePropData] = useState([]);

  const [count, changeCount] = useState(1);

  const [addedToCart, changeAddedToCard] = useState("");

  const cartContext = useContext(CartContext);

  const { cartItems, addToCartItems, ChangeCartItems } = cartContext;

  console.log(cartItems);

  const onCartAdd = () => {
    changeAddedToCard("Added to Cart");
    const found = cartItems.find((eo) => eo.id == propData[0].id);

    if (found === undefined) {
      addToCartItems({ ...propData[0], count: count });
    } else {
      const increasedCartList = cartItems.map((ei) => {
        if (ei.id == propData[0].id) {
          return { ...ei, count: ei.count + 1 };
        } else {
          return ei;
        }
      });
      console.log(increasedCartList);

      ChangeCartItems(increasedCartList);
    }
  };

  const increaseCount = () => {
    changeCount((pc) => pc + 1);
  };

  const decreaseCount = () => {
    if((count - 1) != 0){
    changeCount((pc) => pc - 1);}
  };

  const currentlocation = useLocation();
  const params = currentlocation.pathname.slice(12);

  useEffect(() => {
    const fetchPropsData = async () => {
      const response = await fetch(
        "https://totality-backend-hima.onrender.com/properties"
      );
      const result = await response.json();

      const requiredProp = result.filter((ep) => ep.id == params);
      changePropData(requiredProp);
    };
    fetchPropsData();
  }, []);

  const renderPropData = () => {
    if (propData.length !== 0) {
      const {
        title,
        id,
        amenities,
        bedrooms,
        imageurl,
        location,
        price,
        description,
      } = propData[0];
      return (
        <div className="propData">
          <h2>{title}</h2>
          <img className="propDetailsImg" src={imageurl} />
          <h5 className="locationH5">{`location: ${location}`}</h5>
          <p>{description}</p>
          <p>
            <b>{`No of Bedrooms: ${bedrooms}, Price: ${price}lakhs/-, Amenities: ${amenities}`}</b>
          </p>
          <div className="addingSection">
            <button onClick={decreaseCount} className="propDetailsBtns">
              {" "}
              -{" "}
            </button>
            {count}
            <button onClick={increaseCount} className="propDetailsBtns">
              {" "}
              +{" "}
            </button>
            <button
              onClick={onCartAdd}
              className="btn btn-dark propDetailsBtns"
            >
              Add to Cart
            </button>
          </div>
          <p>{addedToCart}</p>
          <Link to="/" className="backLinkBtn">
            <button className="btn btn-outline-dark">
              Go Back to Other Properties
            </button>
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="propertyDetailsComponent">
      <Header />
      <div className="propertyDetailsSection">{renderPropData()}</div>
    </div>
  );
};

export default PropertyDetails;
