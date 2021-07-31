
import { Divider } from "@material-ui/core"
import { TextDetail } from "../UIkit"
import { OrderedProduct } from "."

const dateTimeToString = (date) => {
    return date.getFullYear() + '-' 
    + ('00' + (date.getMonth()+1)).slice(-2) + '-' 
    + ('00' + date.getDate()).slice(-2)+ ' ' 
    + ('00' + date.getHours()).slice(-2)+ ':' 
    + ('00' + date.getMinutes()).slice(-2)+ ':' 
    + ('00' + date.getSeconds()).slice(-2)
}

const dateToStirng = (date) => {
    return date.getFullYear() + '-' 
    + ('00' + (date.getMonth()+1)).slice(-2) + '-' 
    + ('00' + date.getDate()).slice(-2)+ ' ' 
}

const OrderHistoryItem = (props) => {


    const order = props.order
    const price = '¥' + order.amount.toLocaleString()
    const orderDateTime = dateTimeToString(order.updated_at.toDate())
    const shippingDate = dateToStirng(order.shipping_date.toDate())


    return(
        <div>
            <div className='module-spacer--small' />
            <TextDetail label={'注文ID'} value={order.id} />
            <TextDetail label={'注文日時'} value={orderDateTime} />
            <TextDetail label={'発送予定日'} value={shippingDate} />
            <TextDetail label={'注文金額'} value={price} />
            {order.products.length > 0 && ( 
                <OrderedProduct products={order.products} />
            )}
            <div className='module-spacer--extra--extra-small' />
            <Divider />
        </div>
    )
}
export default OrderHistoryItem
