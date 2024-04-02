import { useEffect } from "react";
import classes from "./Inbox.module.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { sentMailsActions } from "../store/sentMails";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import { openMailActions } from "../store/openMail";
import useGet from "../hooks/useGet";

const baseurl = BASE_URL;
const getSentMailsUrl = `${baseurl}/mail/sent-mails`;

function SentMails() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sentMails = useSelector((state) => state.sentMails.sentMails);
  const match = useRouteMatch()

  const data = useGet(getSentMailsUrl)
  
  // Check if data is not undefined before dispatching the action
  if (data) {
    dispatch(sentMailsActions.getSentMails(data));
  }

  const sentMailsList = sentMails.map((mail, index) => {
    function openMail(){
      dispatch(openMailActions.openMail(mail))
      history.push(`${match.url}/${mail.id}`);
    }
    return (
      <div key={index} className={classes["table-row"]} onClick={openMail}>
        <div className={classes.w30}>
          <div className={classes["text-wrapper"]}>
            <strong>{mail.to.email}</strong>
          </div>
        </div>
        <div className={classes.w70}>
          <div className={classes["text-wrapper"]}>
            <strong>{mail.subject}</strong> - {mail.content}
          </div>
        </div>
      </div>
    );
  });

  return <div className={classes["table-wrapper"]}>{sentMailsList}</div>;
}

export default SentMails;
