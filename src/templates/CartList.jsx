import { List } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { CartListItem } from "../components/Products"
import { PrimaryButton } from "../components/UIkit"
import { getProductsInCart } from "../reducks/users/selectors"
import { GreyButton } from "../components/UIkit"
import { useCallback } from "react"
import { push } from "connected-react-router"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        maxWidth: 512,
        width: '100%'
    }
})

const CartList = () => {
    const dispatch = useDispatch()
    const selector = useSelector( (state) => state)
    const productsInCart = getProductsInCart(selector)

    const classes = useStyles()

    const goToOrder = useCallback(() => {
        dispatch(push('/order/confirm'))
    },[])

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    },[])


    return (
        <section className='c-section-warpin' >
            <h2 className='u-text__headline u-text-center' >
                ショッピングカート
            </h2>
            <List className={classes.root} >
                {productsInCart.length > 0 && (
                    productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
                )}
            </List>
            <div className='module-spacer--medium' />
            <div className='p-grid__column' >
                    <PrimaryButton label={'レジへ進む'} onClick={goToOrder} />
                    <div className='module-spacer--extra-extra-small' />
                    <GreyButton label={'ショッピングを続ける'} onClick={backToHome} />
            </div>
        </section>
    )
}
export default CartList
