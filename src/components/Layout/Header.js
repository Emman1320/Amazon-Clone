import classes from "./Header.module.css";
import SearchIcon from "@material-ui/icons/Search";
import { ShoppingBasket } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useStateValue } from "../../store/StateProvider";
import { auth } from "../../firebase";

function Header() {
  const { basket, user } = useStateValue()[0];
  let amount = 0;
  // let className = "header__optionBasket";
  if (basket.length !== 0) {
    basket.map((item) => {
      amount = amount + item.quantity;
      return 0;
    });
  }
  // useEffect(() => {
  //   className = "header__optionBasket ";
  // }, []);

  const authenticationHandler = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className={classes["header"]}>
      <Link to="/">
        <img
          alt=""
          className={classes["header__logo"]}
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        />
      </Link>
      <div className={classes["header__search"]}>
        <input className={classes["header__searchInput"]} />
        <SearchIcon className={classes["header__searchIcon"]} />
      </div>
      <div className={classes["header__nav"]}>
        <Link to={!user ? "/login" : "/"}>
          <div
            onClick={authenticationHandler}
            className={classes["header__option"]}
          >
            <div className={classes["header__optionLineOne"]}>
              Hello {user ? user.email : "Guest"}
            </div>
            <div className={classes["header__optionLineTwo"]}>
              {user ? "Sign Out" : "Sign In"}
            </div>
          </div>
        </Link>
        <Link to={user ? "/orders" : "/"}>
          <div className={classes["header__option"]}>
            <div className={classes["header__optionLineOne"]}>Returns</div>
            <div className={classes["header__optionLineTwo"]}>& Orders</div>
          </div>
        </Link>
        <div className={classes["header__option"]}>
          <div className={classes["header__optionLineOne"]}>Your</div>
          <div className={classes["header__optionLineTwo"]}>Prime</div>
        </div>
        <Link to="/checkout">
          <div className={classes["header__optionBasket"]}>
            <ShoppingBasket />
            <div
              className={`${classes["header__optionLineTwo"]} 
                          ${classes["header__basketCount"]}`}
            >
              {amount}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
