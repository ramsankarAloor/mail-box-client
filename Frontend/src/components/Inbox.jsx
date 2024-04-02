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
import DeleteIcon from "../icons/DeleteIcon";

const baseurl = BASE_URL;
const getMailsUrl = `${baseurl}/mail/get-mails`;

function Inbox() {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mails.mails);
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    const intervalId = setInterval(() => {
      async function getMails() {
        const token = localStorage.getItem("token");
        const response = await axios.get(getMailsUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(mailsActions.getMails(response.data));
        const unreadNum = response.data.reduce((acc, mail) => {
          if (!mail.read) {
            acc += 1;
          }
          return acc;
        }, 0);
        dispatch(mailsActions.setUnread(unreadNum));
      }
      getMails();
    }, 2000); // polling in every 2 seconds.

    // Clear the interval on component unmount to prevent memory leaks
    return () => clearInterval(intervalId);
  }, [dispatch]); // Dependency array should not include `mails` to prevent infinite loop

  const mailsList = mails.map((mail, index) => {
    async function openMail() {
      const token = localStorage.getItem("token");
      try {
        await axios.put(
          `${getMailsUrl}/${mail.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
      dispatch(openMailActions.openMail(mail));
      history.push(`${match.url}/${mail.id}`);
    }

    async function deleteMail() {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`${getMailsUrl}/${mail.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error(error);
      }

      dispatch(mailsActions.deleteMail(mail.id));
    }

    return (
      <div key={index} className={classes["table-row"]}>
        <div className={classes["text-body"]} onClick={openMail}>
          <div className={classes.w30}>
            <div className={classes["text-wrapper"]}>
              {!mail.read && <span className={classes["blue-dot"]}></span>}
              <strong>{mail.from.email}</strong>
            </div>
          </div>
          <div className={classes.w70}>
            <div className={classes["text-wrapper"]}>
              <strong>{mail.subject}</strong> - {mail.content}
            </div>
          </div>
        </div>

        <div className={classes.w10}>
          <button className={classes["delete-button"]} onClick={deleteMail}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    );
  });

  return <div className={classes["table-wrapper"]}>{mailsList}</div>;
}
export default Inbox;
