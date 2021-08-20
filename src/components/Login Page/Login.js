import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import classes from "./Login.module.css";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email") {
          alert("Enter your email address");
        } else if (error.code === "auth/wrong-password") {
          alert("Enter your password");
        } else if (error.code === "auth/user-not-found") {
          alert("No user found. Please create an account");
          history.push("/signup");
        }
      });
    setEmail("");
    setPassword("");
  };

  return (
    <div className={classes["login"]}>
      <Link to="/">
        <img
          className={classes["login__logo"]}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className={classes["login__container"]}>
        <h1>Sign-in</h1>

        <form onSubmit={signIn}>
          <h5>Email</h5>
          <input
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            type="text"
          />
          <h5>Password</h5>
          <input
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            type="password"
          />
          <button className={classes["login__signInButton"]}>Sign In</button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
      </div>
      <p> or</p>
      <Link to="/signup">
        <button className={classes["login__registerButton"]}>
          Create your Amazon Account
        </button>
      </Link>
    </div>
  );
};

export default Login;
