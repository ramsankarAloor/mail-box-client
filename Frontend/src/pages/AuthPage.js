import { Button, Card } from "react-bootstrap";
import styles from "./AuthPage.module.css";
import { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const baseurl = BASE_URL;
const signupUrl = `${baseurl}/auth/signup`;

const AuthPage = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();
  const [login, setLogin] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [passmatch, setPassmatch] = useState(true);

  function switchAuth() {
    setLogin((prevState) => !prevState);
  }

  function forgotPasswordHandler() {}

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  async function sendAuthApi() {
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (email.trim() === "" || password.trim() === "") {
      alert("Fill up all the fields!!");
      return;
    }

    setValidEmail(validateEmail(email));

    if (login) {
    } else {
      const confirmPassword = conPassRef.current.value;
      if (confirmPassword.trim() === "") {
        alert("Fill up all the fields!!");
        return;
      }
      if (password !== confirmPassword) {
        setPassmatch(false);
        conPassRef.current.value = "";
        return;
      } else {
        setPassmatch(true);
      }
      const reqBody = { email, password };
      try {
        const response = await axios.post(signupUrl, reqBody);
        alert(response.data.message);
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
  }

  return (
    <div className={styles["for-container"]}>
      <Card className={styles["for-card"]}>
        {login ? <h3>Login</h3> : <h3>Signup</h3>}
        <div className="form-floating">
          <input
            className={`form-control ${validEmail ? "" : styles.error}`}
            type="email"
            required
            placeholder="email"
            id="email"
            ref={emailRef}
          ></input>
          <label htmlFor="email">Email</label>
          {!validEmail && (
            <span className={styles["error-text"]}>*Invalid email</span>
          )}
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            type="password"
            required
            placeholder="password"
            id="password"
            ref={passRef}
          ></input>
          <label htmlFor="password">Password</label>
        </div>
        {!login && (
          <div className="form-floating">
            <input
              className="form-control"
              type="password"
              required
              placeholder="password"
              id="confirm-password"
              ref={conPassRef}
            ></input>
            <label htmlFor="confirm-password">Confirm password</label>
            {!passmatch && (
              <span className={styles["error-text"]}>
                *Repeat the same password
              </span>
            )}
          </div>
        )}
        {login && (
          <button
            className={styles["blue-link"]}
            onClick={forgotPasswordHandler}
          >
            Forgot password?
          </button>
        )}
        <Button className={styles["s-button"]} onClick={sendAuthApi}>
          {login ? "Login" : "Signup"}
        </Button>
        <button className={styles.switch} onClick={switchAuth}>
          {login ? "Don't have an account? Signup" : "Have an account ? Login"}
        </button>
      </Card>
    </div>
  );
};

export default AuthPage;
