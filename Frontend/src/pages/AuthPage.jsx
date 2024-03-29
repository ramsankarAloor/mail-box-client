import { Button, Card } from "react-bootstrap";
import { useRef, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from "./AuthPage.module.css";

const baseurl = BASE_URL;
const signupUrl = `${baseurl}/auth/signup`;
const loginUrl = `${baseurl}/auth/login`;

const AuthPage = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const conPassRef = useRef();
  const [login, setLogin] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [passmatch, setPassmatch] = useState(true);
  const [wrongPass, setWrongpass] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  function switchAuth() {
    setLogin((prevState) => !prevState);
  }

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

    if (!validateEmail(email)) {
      setValidEmail(validateEmail(email));
      return;
    }

    if (login) {
      const reqBody = { email, password };
      try {
        const response = await axios.post(loginUrl, reqBody);
        localStorage.setItem("token", response.data.token);
        dispatch({token : response.data.token})
        history.replace('/home')
      } catch (error) {
        if(error.response.status===401){
          setWrongpass(true)
        }else{
          alert(error.response.data.error)
          setWrongpass(false)
        }
      }
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
        if(error.response.status===403){
          alert(error.response.data.error)
        }
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
            className={`form-control ${wrongPass && login ? styles.error : ""}`}
            type="password"
            required
            placeholder="password"
            id="password"
            ref={passRef}
          ></input>
          <label htmlFor="password">Password</label>
          {(login && wrongPass) && (
            <span className={styles["error-text"]}>*Wrong password</span>
          )}
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
