import { Divider } from "@material-ui/core"
import { ListItem } from "@material-ui/core"
import { ListItemText } from "@material-ui/core"
import { ListItemAvatar } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import { IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useSelector } from "react-redux"
import { db } from "../../firebase"
import { getUserId } from "../../reducks/users/selectors"

const useStyles = makeStyles({
        list: {
            height: 128
        },
        image: {
            objectFit: 'cover',
            margin: 16,
            height: 96,
            width: 96
        },
        text: {
            width: '100%'
        },
        icon: {
            margin: '0 0 0 auto'
        }
})

const FavoriteListItem = (props) => {
   const classes = useStyles()
   const selector = useSelector((state) => state)
   const uid = getUserId(selector)

   const image = props.product.images[0].path
   const price = props.product.price.toLocaleString()
   const name = props.product.name
   const size = props.product.size

   const removeProductFromCart = (id) => {
        return db.collection('users').doc(uid).collection('cart').doc(id)
                .delete()
   }

   return (
       <>
        <ListItem className={classes.list} >
            <ListItemAvatar>
                <img className={classes.image} src={image} alt='商品画像' />
            </ListItemAvatar>
            <div>
                <ListItemText primary={name} secondary={'サイズ: ' + size}/>
                <ListItemText primary={'¥' + price} />
            </div>
            <IconButton onClick={() => removeProductFromCart(props.product.cartId)} className={classes.icon}  >
                <Delete />
            </IconButton>
        </ListItem>
        <Divider />
       </>
   )

}
export default FavoriteListItem