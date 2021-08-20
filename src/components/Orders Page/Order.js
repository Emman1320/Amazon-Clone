import classes from "./Order.module.css";
import moment from "moment";
import CartItem from "../Checkout Page/CartItem";
import NumberFormat from "react-number-format";

const Order = ({ order }) => {
  return (
    <div className={classes.order}>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mm a")}</p>
      <p className={classes.order__id}>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CartItem
          id={item.id}
          key={item.key}
          title={item.title}
          quantity={item.quantity}
          image={item.image}
          price={item.price}
          rating={item.rating}
          inOrdersPage={true}
        />
      ))}
      <NumberFormat
        renderText={(value) => (
          <>
            <h3 className="order__total">Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount / 100}
        displayType={"text"}
        thousandSeparator={true}
        thousandsGroupStyle="lakh"
        prefix={"₹"}
      />
    </div>
  );
};

export default Order;
