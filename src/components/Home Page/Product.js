import { useStateValue } from "../../store/StateProvider";
import classes from "./Product.module.css";
import NumberFormat from "react-number-format";
const Product = ({ id, title, image, price, rating }) => {
  const dispatch = useStateValue()[1];

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id,
        title,
        image,
        price,
        rating,
        quantity: 1,
      },
    });
  };
  return (
    <div className={classes["product"]}>
      <div className={classes["product_info"]}>
        <p>{title}</p>
        <p className={classes["product__price"]}>
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
        </p>
        <div className={classes["product__rating"]}>
          {Array(rating)
            .fill()
            .map(() => (
              <p key={Math.random()}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
