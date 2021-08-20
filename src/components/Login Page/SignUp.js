import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import classes from "./Login.module.css";

const SignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const register = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          if (userName.trim().length === 0) {
            alert("Enter a valid user name");
            return;
          }
          auth.user
            .updateProfile({
              displayName: userName,
              photoURL: "https://example.com/jane-q-user/profile.jpg",
            })
            .then((res) => {
              console.log("successful", res);
              history.push("/");
            })
            .catch((error) => {
              alert(error.message);
            });
        }
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          alert("Enter valid details");
        } else if (error.code === "auth/wrong-password") {
          alert("Enter your password");
        } else if (error.code === "auth/invalid-user-name") {
          alert("Enter a valid username");
        } else if (error.code === "auth/user-not-found") {
          alert("No user found. Please create an account");
          history.push("/signup");
        } else if (error.code) {
          alert(error.message);
        }
        console.log(error);
      });
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
        <h1>Create account</h1>

        <form onSubmit={register}>
          <label></label>
          <h5>User-Name</h5>
          <input
            onChange={(event) => setUserName(event.target.value)}
            value={userName}
            type="text"
          />

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
          <button className={classes["login__signInButton"]}>Sign up</button>
        </form>
        <p>
          By signing-up you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
      </div>
      <p>
        <span>or</span>
        <span>Already have an account ?</span>
      </p>
      <Link to="/login">
        <button className={classes["login__registerButton"]}>Sign In</button>
      </Link>
    </div>
  );
};

export default SignUp;
