import { useEffect } from "react";
import classes from "./Inbox.module.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { sentMailsActions } from "../store/sentMails";
import { useDispatch, useSelector } from "react-redux";

const baseurl = BASE_URL;
const getSentMailsUrl = `${baseurl}/mail/sent-mails`;

function SentMails() {
  const dispatch = useDispatch();
  const sentMails = useSelector((state) => state.sentMails.sentMails);

  useEffect(() => {
    async function getSentMails() {
      const token = localStorage.getItem("token");
      const response = await axios.get(getSentMailsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(sentMailsActions.getSentMails(response.data));
    }
    getSentMails();
  }, []);

  const sentMailsList = sentMails.map((mail, index) => {
    return (
      <div key={index} className={classes["table-row"]}>
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
