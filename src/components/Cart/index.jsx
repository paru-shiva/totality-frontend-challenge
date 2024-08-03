import "./index.css";
import Header from "../Header";
import { useContext, useState } from "react";
import CartContext from "../../context/CartContext";

const Cart = () => {
  const { cartItems, increaseCartItem, decreaseCartItem } =
    useContext(CartContext);

  let totalValue = 0;

  cartItems.forEach((ci) => {
    totalValue += ci.count * ci.price;
  });

  const [cardNumber, changeCardNumber] = useState("");
  const [cvv, changeCvv] = useState("");
  const [address, changeAddress] = useState("");
  const [validStatus, changeValidStatus] = useState("");
  const [orderStatus, changeOrderStatus] = useState(false);

  const onCardnumberChange = (e) => {
    changeCardNumber(e.target.value);
  };

  const onCvvChange = (e) => {
    changeCvv(e.target.value);
  };

  const onAddressEntry = (e) => {
    changeAddress(e.target.value);
  };

  const onSubmitClick = () => {
    if (cardNumber === "" || cvv === "" || address === "") {
      changeValidStatus("*Enter Details Properly");
    } else {
      changeValidStatus(
        "*Order Placed Successfully! We will get back to you Soon"
      );
      changeAddress("");
      changeCardNumber("");
      changeCvv("");
      changeOrderStatus(true);
    }
  };

  console.log(cartItems);

  const renderDetailsForm = () => {
    return (
      <div className="cusDetails">
        <h2 className="cartHeading">Enter your Details to place the Order</h2>

        <div className="mb-3 mt-5">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Card Number & CVV
          </label>
          <div className="cnandcvv">
            <input
              onChange={onCardnumberChange}
              value={cardNumber}
              type="text"
              className="form-control cardNum"
              id="exampleFormControlInput1"
              placeholder="CARD NUMBER"
            />
            <input
              onChange={onCvvChange}
              value={cvv}
              type="text"
              className="form-control cvv"
              id="exampleFormControlInput1"
              placeholder="CVV"
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Enter Your Full Address
          </label>
          <textarea
            onChange={onAddressEntry}
            value={address}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button onClick={onSubmitClick} className="btn btn-outline-dark">
          Submit
        </button>
        <p className="validStatus">{validStatus}</p>
      </div>
    );
  };

  return (
    <div className="cartComponent">
      <Header />
      {orderStatus === false ? (
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
          {cartItems.length > 0 && renderDetailsForm()}
        </div>
      ) : (
        <h2 className="successHeading">
          The Order Placed Successufully. We will get back to you Soon.
        </h2>
      )}
    </div>
  );
};

export default Cart;
