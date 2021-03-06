import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import NoImage from '../../assets/img/src/no_image.png'
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import { IconButton, Menu, MenuItem} from '@material-ui/core';
import MOreVertIcon from '@material-ui/icons/MoreVert'; /*oが大文字に注意*/
import { useState } from 'react';
import { deleteProduct } from '../../reducks/products/operations';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            margin: 8,
            width: 'calc(50% - 16px)'
        },
        [theme.breakpoints.up('sm')]: {
            margin: 16,
            width: 'calc(33.333% - 32px)'
        }
    },
    content: {
        display: 'flex',
        padding: '16px 8px',
        textAlign: 'left',
        '&:last-child': {
            paddingBottom: 16
        }
    },
    media: {
        height: 0,
        paddingTop: '100%'
    },
    price: {
        color: theme.palette.secondary.main,
        fontSize: 16
    },
    iconButton: {
        margin: '0 0 0 auto'
    }
}))

const ProductCard = (props) => {

    const dispatch = useDispatch()

    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const images = (props.images.length > 0) ? props.images : [{path: NoImage}]
    const price = props.price.toLocaleString()　/*3桁区切りで,を入れてくれる*/

    return(
        <Card className={classes.root} >
            <CardMedia
                className={classes.media}
                image={images[0].path}
                title=''
                onClick={() => dispatch(push('/product/' + props.id))}
            />
            <CardContent className={classes.content} >
                <div onClick={() => dispatch(push('/product/' + props.id))} >
                    <Typography color={'textSecondary'} component='p' >
                        {props.name}
                    </Typography>
                    <Typography className={classes.price} component='p'>
                        ¥{price}
                    </Typography>
                </div>
                <IconButton className={classes.iconButton} onClick={handleClick}>
                    <MOreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem 
                        onClick={() => {dispatch(push('/product/edit/' + props.id))
                                        handleClose()
                        }}
                        
                    >
                        編集する
                    </MenuItem>
                    <MenuItem onClick={() => {dispatch(deleteProduct(props.id))
                                        handleClose()
                        }} >
                        削除する
                    </MenuItem>
                </Menu>
            </CardContent>
        </Card>
    )
}
export default ProductCard