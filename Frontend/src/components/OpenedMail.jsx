import { Button } from 'react-bootstrap'
import classes from './OpenedMail.module.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useDispatch, useSelector } from 'react-redux'
import { openMailActions } from '../store/openMail'

function OpenedMail(props){
    const dispatch = useDispatch()
    const history = useHistory()
    const openedMail = useSelector(state => state.openMail.open)

    function backToInbox(){
        dispatch(openMailActions.closeMail())
        history.goBack()
    }

    return(
        <div className={classes['wrapper']}>
            <div className={classes['top-bar']}>
                <Button variant='outline-secondary' onClick={backToInbox}>&lt; back</Button>
            </div>
            <div className={classes['mail-display']}>
                <div className={classes['subject']}>
                    <h3>{openedMail.subject}</h3>
                </div>
                <div className={classes['content']}>
                    {openedMail.content}
                </div>
            </div>
        </div>
    )
}

export default OpenedMail