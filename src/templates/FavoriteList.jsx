import { List } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { FavoriteListItem } from "../components/Products"
import { PrimaryButton } from "../components/UIkit"
import { getProductsInFavorites } from "../reducks/users/selectors"
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

const FavoriteList = () => {
    const dispatch = useDispatch()
    const selector = useSelector( (state) => state)
    const productsInFavorites = getProductsInFavorites(selector)

    const classes = useStyles()

    const goToCart = useCallback(() => {
        dispatch(push('/cart'))
    },[])

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    },[])

    console.log(productsInFavorites)


    return (
        <section className='c-section-warpin' >
            <h2 className='u-text__headline u-text-center' >
                お気に入り
            </h2>
            <List className={classes.root} >
                {productsInFavorites.length > 0 && (
                    productsInFavorites.map(product => <FavoriteListItem key={product.favoriteId} product={product} />)
                )}
            </List>
            <div className='module-spacer--medium' />
            <div className='p-grid__column' >
                    <PrimaryButton label={'カートの中身を見る'} onClick={goToCart} />
                    <div className='module-spacer--extra-extra-small' />
                    <GreyButton label={'ショッピングを続ける'} onClick={backToHome} />
            </div>
        </section>
    )
}
export default FavoriteList
