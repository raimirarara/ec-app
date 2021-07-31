import { IconButton, Table, TableBody, TableCell, TableContainer, TableRow} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { ShoppingCart } from "@material-ui/icons"
import { FavoriteBorder } from "@material-ui/icons"

const useStyles = makeStyles({
    iconCell: {
        padding: 0,
        height: 48,
        width: 48,
    }
})

const SizeTable = (props) => {

    const classes = useStyles()

    const sizes = props.sizes

    return(
        <TableContainer>
            <Table>
                <TableBody>
                    {sizes.length > 0 && (
                        sizes.map(size => (
                            <TableRow key={size.size}>
                                <TableCell component='th' scope='row' >
                                    {size.size}
                                </TableCell>
                                <TableCell>
                                    残り {size.quentity} 点
                                </TableCell>
                                <TableCell className={classes.iconCell} >
                                    {size.quentity > 0 ? (
                                        <IconButton onClick={() => props.addProduct(size.size, true)} >
                                            <ShoppingCart />
                                        </IconButton>   
                                    ) : (
                                      <div>売切</div>  
                                    )}
                                </TableCell>
                                <TableCell className={classes.iconCell} >
                                    <IconButton onClick={() => props.addProduct(size.size, false)}>
                                        <FavoriteBorder />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
export default SizeTable