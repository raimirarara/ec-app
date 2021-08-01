import { push } from "connected-react-router"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { PrimaryButton } from "../components/UIkit"


const OrderComplete = (props) => {

    const dispatch = useDispatch()

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    })

    return (
        <section className='center' >
            <div className='u-text__headline u-text-center'>
                注文が完了いたしました。
                <br></br>
                お買い上げありがとうございます。

                <div className='module-spacer--small' />
                <PrimaryButton label={'Go To Home'} onClick={backToHome} />
            </div>
        </section>
    )
}
export default OrderComplete