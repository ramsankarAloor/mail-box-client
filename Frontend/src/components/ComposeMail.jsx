import { EditorState } from "draft-js";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../config";
import classes from './ComposeMail.module.css'
const baseurl = BASE_URL;
const postMailUrl = `${baseurl}/mail/send-mail`;

export default function ComposeMail() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // const user = useSelector((state) => state.user.user);

  const toEmail = useRef();
  const subject = useRef();

  async function sendHandler() {
    const mail = {
      toEmail: toEmail.current.value,
      subject: subject.current.value,
      content: editorState.getCurrentContent().getPlainText(),
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(postMailUrl, mail, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.error);
    }

    toEmail.current.value = ''
    subject.current.value =  ''
    setEditorState(EditorState.createEmpty())
  }

  return (
    <div>
      <input
        type="email"
        placeholder="To"
        className="form-control"
        ref={toEmail}
        style={{ margin: "5pt 0" }}
      />
      <input
        type="text"
        placeholder="Subject"
        className="form-control"
        ref={subject}
        style={{ margin: "5pt 0" }}
      />
      <Editor editorState={editorState} onEditorStateChange={setEditorState} />
      <div className={classes['button-div']}>
        <Button className={classes['send-button']} variant="outline-primary" onClick={sendHandler}>Send</Button>
      </div>
    </div>
  );
}
