import { useState } from "react";
import { useStateValue } from "../../store/StateProvider";
import classes from "./CartItem.module.css";
import NumberFormat from "react-number-format";

const CartItem = ({
  image,
  title,
  price,
  rating,
  id,
  quantity,
  className,
  onClassChange,
  inOrdersPage,
}) => {
  const [quantityValue, setQuantityValue] = useState(quantity);
  const [cartItemClassName, setCartItemClassName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useStateValue()[1];
  const removeFromBasket = () => {
    onClassChange(id);
    setCartItemClassName("--fade-out");
    setTimeout(() => {
      dispatch({ type: "REMOVE_FROM_BASKET", id });
      onClassChange(null);
    }, 400);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        image,
        title,
        price,
        rating,
        id,
        quantity: quantityValue - quantity,
      },
    });
    setIsEditing(false);
    setQuantityValue(+quantityValue);
  };
  const quantityValueChangeHandler = (event) => {
    setIsEditing(true);
    let value = event.target.value;
    setQuantityValue(+value);
  };
  return (
    <div className={`${classes.cartItem} ${classes[`${cartItemClassName}`]} ${classes[`${className}`]}`}>
      <div className={classes["cartItem__image"]}>
        <img src={image} alt="" />
      </div>
      <div className={classes["cartItem__container"]}>
        <h2 className={classes["cartItem__title"]}>{title}</h2>
        <div className={classes["cartItem__info"]}>
          <div>
            <div className={classes["cartItem__price"]}>
              <small>₹</small>
              <NumberFormat
                renderText={(value) => (
                  <>
                    <strong>{value}</strong>
                  </>
                )}
                decimalScale={2}
                value={price}
                displayType={"text"}
                thousandSeparator={true}
                thousandsGroupStyle="lakh"
                prefix={""}
              />
            </div>
            <div className={classes["cartItem__rating"]}>
              {Array(rating)
                .fill()
                .map(() => (
                  <p key={Math.random()}>⭐</p>
                ))}
            </div>
          </div>
          <div className={classes["cartItem__quantity"]}>
            <form onSubmit={submitHandler}>
              <div className={classes["cartItem__quantityBox1"]}>
                Quantity: x
                {inOrdersPage ? (
                  quantityValue
                ) : (
                  <input
                    type="number"
                    value={quantityValue}
                    min={1}
                    onChange={quantityValueChangeHandler}
                  />
                )}
                {"  "}
              </div>
              <div className={classes["cartItem__quantityBox2"]}>
                {isEditing && (
                  <button className={classes["cartItem__quantityButton"]}>confirm</button>
                )}
              </div>
            </form>
          </div>
        </div>
        {!inOrdersPage && (
          <button onClick={removeFromBasket} className={classes["cartItem__removeButton"]}>
            Remove from basket
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
