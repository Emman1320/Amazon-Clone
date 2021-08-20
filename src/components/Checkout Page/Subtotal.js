import classes from "./Subtotal.module.css";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router";

const Subtotal = ({ basket, isSignedIn }) => {
  let price = 0,
    amount = 0;
  const history = useHistory();

  if (basket.length !== 0) {
    basket.map((item) => {
      price = price + item.price * item.quantity;
      amount = amount + item.quantity;
      return 0;
    });
  }

  return (
    <div className={classes["subtotal"]}>
      <NumberFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({amount} items):&nbsp;
              <strong>{value}</strong>
            </p>
            <small className={classes["subtotal__gift"]}>
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={price}
        displayType={"text"}
        thousandSeparator={true}
        thousandsGroupStyle="lakh"
        prefix={"₹"}
      />
      <button
        disabled={basket.length === 0}
        onClick={(event) =>
          history.push(`${isSignedIn ? "/payment" : "/login"}`)
        }
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
