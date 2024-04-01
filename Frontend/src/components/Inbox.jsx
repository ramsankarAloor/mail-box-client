import { useEffect } from "react";
import classes from "./Inbox.module.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { mailsActions } from "../store/mails";
import {
  useHistory,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { openMailActions } from "../store/openMail";

const baseurl = BASE_URL;
const getMailsUrl = `${baseurl}/mail/get-mails`;

function Inbox() {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mails.mails);
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    async function getMails() {
      const token = localStorage.getItem("token");
      const response = await axios.get(getMailsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      dispatch(mailsActions.getMails(response.data));
    }
    getMails();
  }, []);

  const mailsList = mails.map((mail, index) => {
    function openMail() {
      dispatch(openMailActions.openMail(mail))
      history.push(`${match.url}/${mail.id}`);
    }
    return (
      <div key={index} className={classes["table-row"]} onClick={openMail}>
          <div className={classes.w30}>
            <div className={classes["text-wrapper"]}>
              <span className={classes["blue-dot"]}></span>
              <strong>{mail.from.email}</strong>
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

  return <div className={classes["table-wrapper"]}>{mailsList}</div>;
}
export default Inbox;
