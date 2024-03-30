import { useEffect } from "react";
import classes from "./Inbox.module.css";
import axios from "axios";
import { BASE_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { mailsActions } from "../store/mails";

const baseurl = BASE_URL;
const getMailsUrl = `${baseurl}/mail/get-mails`;

function Inbox() {
  const dispatch = useDispatch();
  const mails = useSelector((state) => state.mails.mails);
  
  useEffect(() => {
    async function getMails() {
      const token = localStorage.getItem("token");
      const response = await axios.get(getMailsUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(mailsActions.getMails(response.data));
    }
    getMails();
  }, []);

  const mailsList = mails.map((mail, index) => {
    return (
      <tr key={index}>
        <td className={classes["w30"]}>
          <strong>{mail.from.email}</strong>
        </td>
        <td className={classes["w70"]}>
          <strong>{mail.subject}</strong> - {mail.content}
        </td>
      </tr>
    );
  });

  return (
    <table className="table">
      <tbody>
        {mailsList}
      </tbody>
    </table>
  );
}
export default Inbox;
