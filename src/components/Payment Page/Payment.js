import { useStateValue } from "../../store/StateProvider";
import CartItem from "../Checkout Page/CartItem";
import { Link } from "react-router-dom";
import classes from "./Payment.module.css";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import instance from "../../axios";
import NumberFormat from "react-number-format";
import { db } from "../../firebase";

const Payment = () => {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  let price = 0;
  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  if (basket.length !== 0) {
    basket.map((item) => {
      price = price + item.price * item.quantity;
      return 0;
    });
  }

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await instance.post(
        // Stripe expects the total in a currencies subunits
        `/payments/create?total=${price * 100}`
      );
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    const paymentIntent = payload.paymentIntent;
    db.collection("users")
      .doc(user?.uid)
      .collection("orders")
      .doc(paymentIntent.id)
      .set({
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });

    // paymentIntent = payment confirmation
    if (payload?.error) {
      alert(payload?.error.message);
    }
    setSucceeded(true);
    setError(null);
    setProcessing(false);

    dispatch({ type: "EMPTY_BASKET" });
    history.replace("/orders");
  };

  const handleChange = (event) => {
    //Listen for changes in the CardElement
    //and display any errors as the customer types their card detials
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className={classes["payment"]}>
      <div className={classes["payment__container"]}>
        <h1>
          Checkout (<Link to="checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment Section - delivery address */}
        <div className={classes["payment__section"]}>
          <div className={classes["payment__title"]}>
            <h3>Delivery Address</h3>
          </div>
          <div className={classes["payment__address"]}>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment Section - Review Items */}
        <div className={classes["payment__section"]}>
          <div className={classes["payment__title"]}>
            <h3>Review items and delivery</h3>
          </div>
          <div className={classes["payment__items"]}>
            {basket.map((item) => (
              <CartItem
                id={item.id}
                key={item.id}
                quantity={item.quantity}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment Section - Payment method */}
        <div className={classes["payment__section"]}>
          <div className={classes["payment__title"]}>
            <h3>Payment Method</h3>
          </div>
          <div className={classes["payment__details"]}>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className={classes["payment__priceContainer"]}>
                <NumberFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={price}
                  displayType={"text"}
                  thousandSeparator={true}
                  thousandsGroupStyle="lakh"
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded || error}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
          <div className={classes["payment__description"]}>
            <p>Enter the 4242 4242 4242 4242 for Card Number</p>
            <p>04/24 for expiry date and 42424 for CVV</p>
            <p> (Developer testing values)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
