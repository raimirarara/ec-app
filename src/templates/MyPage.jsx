import { makeStyles } from "@material-ui/styles"
import { useSelector } from "react-redux"
import { getUserId, getUserName } from "../reducks/users/selectors"

const useStyles = makeStyles({
    body: {
        background: '#fff',
        width: 500,
        height: 500,
        borderColor: '#80CCD0',
        margin: '0 auto',
    },
    text: {
        color: '#80CCD0',
        fontSize: '18px',
    },
    row:{
        display: 'flex'
    }
})

const MyPage = () => {

    const selector = useSelector((state) => state)
    const uid = getUserId(selector)
    const username = getUserName(selector)
    const classes = useStyles()

    return (
        <div className={classes.body}>
            <h2 className='u-text__headline'>
                プロフィール
            </h2>
            <div className='module-spacer--extra-small' />
            <div className={classes.row}>
                <p className={classes.text}>ユーザーID</p><span>:　</span><h4>{uid}</h4>
            </div>
            <div className={classes.row}>
                <p className={classes.text}>ユーザー名</p><span>:　</span><h4>{username}</h4>
            </div>
        </div>
    )
}
export default MyPage
