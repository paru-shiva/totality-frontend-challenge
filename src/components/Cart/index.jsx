import "./index.css";
import Header from "../Header";
import { useContext } from "react";
import CartContext from "../../context/CartContext";

const Cart = () => {
  const { cartItems, increaseCartItem, decreaseCartItem } =
    useContext(CartContext);

  let totalValue = 0;

  cartItems.forEach((ci) => {
    totalValue += ci.count * ci.price;
  });

  console.log(cartItems);

  return (
    <div className="cartComponent">
      <Header />
      <div className="cartComponentBody">
        {cartItems.map((ei) => {
          const onIncreaseClick = () => {
            increaseCartItem(ei.id);
          };
          const onDecreaseClick = () => {
            decreaseCartItem(ei.id);
          };
          return (
            <div key={ei.id} className="cartItem">
              <img src={ei.imageurl} className="cartThumbnail" />
              <h4>{ei.title}</h4>
              <p className="cartPara">{`Price: ${ei.price}Lakhs`}</p>
              <b>
                <div className="decIncBtnsDiv">
                  <button onClick={onDecreaseClick} className="decIncBtns">
                    -
                  </button>
                  <p className="cartPara">{`Quantity: ${ei.count} Nos`}</p>
                  <button onClick={onIncreaseClick} className="decIncBtns">
                    +
                  </button>
                </div>
              </b>
            </div>
          );
        })}
        <div>
          <h4 className="totalPrice cartPara">{`Total Price: ${totalValue} Lakhs/-`}</h4>
        </div>
      </div>
    </div>
  );
};

export default Cart;
