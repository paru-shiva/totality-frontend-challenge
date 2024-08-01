import "./index.css";
import Header from "../Header";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  let totalValue = 0;

  cartItems.forEach((ci) => {
    totalValue += ci.count * ci.propData.price;
  });

  return (
    <div className="cartComponent">
      <Header />
      <div className="cartComponentBody">
        {cartItems.map((ei) => (
          <div key={ei.propData.id} className="cartItem">
            <img src={ei.propData.imageurl} className="cartThumbnail" />
            <h4>{ei.propData.title}</h4>
            <p className="cartPara">{`Price: ${ei.propData.price}Lakhs`}</p>
            <b>
              <p className="cartPara">{`Quantity: ${ei.count} Nos`}</p>
            </b>
          </div>
        ))}
        <div>
          <h4 className="totalPrice cartPara">{`Total Price: ${totalValue} Lakhs/-`}</h4>
        </div>
      </div>
    </div>
  );
};

export default Cart;
