import React, { useState } from "react";
import ComposeMail from "../components/ComposeMail";
import styles from "./HomePage.module.css";
import { Button } from "react-bootstrap";
import Inbox from "../components/Inbox";
function HomePage() {
  const [composeMail, setComposeMail] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(false);
  const [sentMailOpen, setSentMailOpen] = useState(false)

  function composeHandler(){
    setComposeMail(true);
    setSentMailOpen(false)
    setInboxOpen(false);
  }

  function inboxHandler() {
    setComposeMail(false);
    setSentMailOpen(false)
    setInboxOpen(true);
  }
  function sentMailsHandler(){
    setComposeMail(false);
    setSentMailOpen(true)
    setInboxOpen(false);
  }
  return (
    <div className={styles["full-size"]}>
      <div className={styles["left-part"]}>
        <div className={styles["sections"]}>
          <Button
            variant="outline-primary"
            onClick={composeHandler}
          >
            + Compose
          </Button>
        </div>
        <div className={styles["sections"]}>
          <button
            variant="outline-secondary"
            className={styles["borderless-button"]}
            onClick={inboxHandler}
          >
            Inbox
          </button>
        </div>
        <div className={styles["sections"]}>
        <button
            variant="outline-secondary"
            className={styles["borderless-button"]}
            onClick={sentMailsHandler}
          >
            Sent mails
          </button>
        </div>
      </div>
      <div className={`container ${styles["right-part"]}`}>
        {composeMail && <ComposeMail />}
        {inboxOpen && <Inbox />}
      </div>
    </div>
  );
}

export default HomePage;
