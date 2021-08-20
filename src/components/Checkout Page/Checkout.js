import { useState } from "react";
import { useStateValue } from "../../store/StateProvider";
import CartItem from "./CartItem";
import classes from "./Checkout.module.css";
import Subtotal from "./Subtotal";

const Checkout = () => {
  const { basket, user } = useStateValue()[0];
  const [cartItemId, setCartItemId] = useState(null);
  const classChangeHandler = (id) => {
    setCartItemId(id);
  };

  let isFound = false;
  const basketArray = basket.map((item) => {
    let className = "";
    if (cartItemId === item.id) {
      isFound = true;
    } else {
      if (isFound) {
        className = "--move-up";
      }
    }
    return (
      <CartItem
        className={className}
        onClassChange={classChangeHandler}
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        rating={item.rating}
        quantity={item.quantity}
        image={item.image}
      />
    );
  });
  return (
    <div className={classes["checkout"]}>
      <div className={classes["checkout__left"]}>
        <img
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
          className={classes["checkout__ad"]}
        />
        <div>
          <h2 className={classes["checkout__title"]}>
            {user ? `Hello, ${user.displayName}` : "Your shopping Basket"}
          </h2>
        </div>
        <div>{basketArray}</div>
      </div>
      <div className={classes["checkout__right"]}>
        <Subtotal basket={basket} isSignedIn={user ? true : false} />
      </div>
    </div>
  );
};

export default Checkout;
