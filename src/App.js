import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Checkout from "./components/Checkout Page/Checkout";
import Header from "./components/Layout/Header";
import Home from "./components/Home Page/Home";
import Login from "./components/Login Page/Login";
import SignUp from "./components/Login Page/SignUp";
import Payment from "./components/Payment Page/Payment";
import { auth } from "./firebase";
import { useStateValue } from "./store/StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./components/Orders Page/Orders";

const promise = loadStripe(
  "pk_test_51JPqwMSCpDbJSRKiM6YjYgS4MMozN7lxHtVkKrYBX3oTXjbljBhb23diPbNLTopxd9zGui8efYQGZsOixQt050Er00R81d9zQW"
);

function App() {
  const dispatch = useStateValue()[1];

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>

          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/payment">
            <Elements stripe={promise}>
              <Header />
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
