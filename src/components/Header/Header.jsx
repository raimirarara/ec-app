import { makeStyles } from "@material-ui/styles"
import { AppBar } from "@material-ui/core"
import { Toolbar } from "@material-ui/core"
import logo from '../../assets/img/icons/netshop.PNG'
import { useDispatch, useSelector } from "react-redux"
import { getIsSignedIn } from "../../reducks/users/selectors"
import {push} from 'connected-react-router'
import { HeaderMenus } from "."
import { ClosableDrawer } from "."
import { useState } from "react"
import { useCallback } from "react"

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: '#80CCD0',
        color: '#444'   
    },
    toolBar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%',
    },
    iconButtons: {
        margin: '0 0 0 auto'
    }
})

const Header = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const isSignedIn = getIsSignedIn(selector)

    const [open, setOpen] = useState(false)

    const handleDrawerToggle = useCallback((event) => {
        if(event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return
        }
        setOpen(!open)
    },[setOpen, open])
    return (
        <div className={classes.root} >
            <AppBar position='fixed' className={classes.menuBar}>
                <Toolbar className={classes.toolBar} >
                    <img src={logo} slt='netshop logo' width='128px' onClick={() => dispatch(push('/'))} />
                    {isSignedIn && (
                        <div className={classes.iconButtons} >
                            <HeaderMenus handleDrawerToggle={handleDrawerToggle} />
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <ClosableDrawer open= {open} onClose={handleDrawerToggle} />
        </div>
    )

}
export default Header