import { IconButton } from "@material-ui/core"
import { Badge } from "@material-ui/core"
import { ShoppingCart } from "@material-ui/icons"
import { FavoriteBorder } from "@material-ui/icons"
import { Menu } from "@material-ui/icons"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getProductsInCart } from "../../reducks/users/selectors"
import { db } from "../../firebase"
import { getUserId } from "../../reducks/users/selectors"
import { fetchProductsInCart } from "../../reducks/users/operations"
import { push } from "connected-react-router"

const HeaderMenus = (props) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const userId = getUserId(selector);
    let productsInCart = getProductsInCart(selector);

    // Listen products in user's cart
    useEffect(() => {
        const unsubscribe = db.collection('users').doc(userId).collection('cart')
            .onSnapshot(snapshots => {

                snapshots.docChanges().forEach(change => {
                    const product = change.doc.data();
                    const changeType = change.type

                    switch (changeType) {
                        case 'added':
                            productsInCart.push(product);
                            break;
                        case 'modified':
                            const index = productsInCart.findIndex(product => product.cartId === change.doc.id)
                            productsInCart[index] = product;
                            break;
                        case 'removed':
                            productsInCart = productsInCart.filter(product => product.cartId !== change.doc.id);
                            break;
                        default:
                            break;
                    }
                });

                dispatch(fetchProductsInCart(productsInCart)) /*firebaseから受け取った状態をreducxのstoreで管理しているstateに反映させる？ */
            });

        return () => unsubscribe()
    },[]);

    return (
        <>
            <IconButton onClick={() => dispatch(push('/cart'))} >
                <Badge badgeContent={productsInCart.length} color="secondary">
                    <ShoppingCart />
                </Badge>
            </IconButton>
            <IconButton>
                <FavoriteBorder />
            </IconButton>
            <IconButton onClick={(event) => props.handleDrawerToggle(event)} >
                <Menu />
            </IconButton>
        </>
    )
}
export default HeaderMenus