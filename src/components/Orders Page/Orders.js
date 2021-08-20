import { useStateValue } from "../../store/StateProvider";
import classes from "./Orders.module.css";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Order from "./Order";

const Orders = () => {
  const { user } = useStateValue()[0];
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapShot) =>
          setOrders(
            snapShot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <div className={classes.orders}>
      <h1>Your Orders</h1>

      <div className={classes.orders__order}>
        {orders?.map((order) => (
          <Order order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
