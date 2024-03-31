import React, { useState } from "react";
import ComposeMail from "../components/ComposeMail";
import styles from "./HomePage.module.css";
import { Button } from "react-bootstrap";
import Inbox from "../components/Inbox";
import SentMails from "../components/SentMails";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { Route } from "react-router-dom";
import { NavLink, Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";

function HomePage() {
  const [composeMail, setComposeMail] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [sentMailOpen, setSentMailOpen] = useState(false);
  const dispatch = useDispatch();

  function inboxHandler() {
    setComposeMail(false);
    setSentMailOpen(false);
    setInboxOpen(true);
  }
  function sentMailsHandler() {
    setComposeMail(false);
    setInboxOpen(false);
    setSentMailOpen(true);
  }
  function logoutHandler() {
    dispatch(authActions.logout());
  }
  return (
    <div className={styles["full-size"]}>
      <div className={styles["left-part"]}>
        <div>
          <div className={styles["sections"]}>
            <NavLink to="/compose">
              <Button variant="outline-primary">+ Compose</Button>
            </NavLink>
          </div>
          <div className={styles["sections"]}>
            <NavLink to="/inbox" className={styles["for-nav-link"]}>
              Inbox
            </NavLink>
          </div>
          <div className={styles["sections"]}>
            <NavLink to="/sent" className={styles["for-nav-link"]}>
              Sent
            </NavLink>
          </div>
        </div>
        <div className={styles.sections}>
          <button className="btn btn-outline-secondary" onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      <div className={`container ${styles["right-part"]}`}>
        <Switch>
          <Route path="/compose">
            <ComposeMail />
          </Route>
          <Route path="/inbox">
            <Inbox />
          </Route>
          <Route path="/sent">
            <SentMails />
          </Route>
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default HomePage;
