import React, { useState } from "react";
import ComposeMail from "../components/ComposeMail";
import styles from "./HomePage.module.css";
import { Button } from "react-bootstrap";
import Inbox from "../components/Inbox";
import SentMails from "../components/SentMails";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
function HomePage() {
  const [composeMail, setComposeMail] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [sentMailOpen, setSentMailOpen] = useState(false);
  const dispatch = useDispatch()

  function composeHandler() {
    setComposeMail(true);
    setSentMailOpen(false);
    setInboxOpen(false);
  }

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
  function logoutHandler(){
    dispatch(authActions.logout())
  }
  return (
    <div className={styles["full-size"]}>
      <div className={styles["left-part"]}>
        <div>
          <div className={styles["sections"]}>
            <Button variant="outline-primary" onClick={composeHandler}>
              + Compose
            </Button>
          </div>
          <div className={styles["sections"]}>
            <button
              className={inboxOpen ? styles.selected : styles["borderless-button"]}
              onClick={inboxHandler}
            >
              Inbox
            </button>
          </div>
          <div className={styles["sections"]}>
            <button
              className={sentMailOpen ? styles.selected : styles["borderless-button"]}
              onClick={sentMailsHandler}
            >
              Sent mails
            </button>
          </div>
        </div>
        <div className={styles.sections}>
          <button className='btn btn-outline-secondary' onClick={logoutHandler}>
            Logout
          </button>
        </div>
      </div>
      <div className={`container ${styles["right-part"]}`}>
        {composeMail && <ComposeMail />}
        {inboxOpen && <Inbox />}
        {sentMailOpen && <SentMails />}
      </div>
    </div>
  );
}

export default HomePage;
