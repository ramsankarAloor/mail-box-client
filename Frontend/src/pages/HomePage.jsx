import React, { useState } from "react";
import ComposeMail from "../components/ComposeMail";
import styles from "./HomePage.module.css";
import { Button } from "react-bootstrap";
import Inbox from "../components/Inbox";
import SentMails from "../components/SentMails";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import { Route } from "react-router-dom";
import { NavLink, Redirect, Switch, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import OpenedMail from "../components/OpenedMail";

function HomePage() {
  const dispatch = useDispatch();
  const match = useRouteMatch()

  function logoutHandler() {
    dispatch(authActions.logout());
    localStorage.removeItem('token')
  }
  return (
    <div className={styles["full-size"]}>
      <div className={styles["left-part"]}>
        <div>
          <div className={styles["sections"]}>
            <NavLink to={`${match.path}/compose`}>
              <Button variant="outline-primary">+ Compose</Button>
            </NavLink>
          </div>
          <div className={styles["sections"]}>
            <NavLink to={`${match.path}/inbox`} className={styles["for-nav-link"]} activeClassName={styles.selected}>
              Inbox
            </NavLink>
          </div>
          <div className={styles["sections"]}>
            <NavLink to={`${match.path}/sent`} className={styles["for-nav-link"]} activeClassName={styles.selected}>
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
          <Route exact path={`${match.path}/`}>
            <Redirect to={`${match.path}/inbox`} />
          </Route>
          <Route path={`${match.path}/compose`}>
            <ComposeMail />
          </Route>
          <Route path={`${match.path}/inbox/:id`}>
            <OpenedMail />
          </Route>
          <Route path={`${match.path}/inbox`}>
            <Inbox />
          </Route>
          <Route path={`${match.path}/sent`}>
            <SentMails />
          </Route>
          <Route path='*'>
            <Redirect to='/404' />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default HomePage;
