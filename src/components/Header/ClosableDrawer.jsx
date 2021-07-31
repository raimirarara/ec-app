import { Divider } from "@material-ui/core"
import { Drawer } from "@material-ui/core"
import { List } from "@material-ui/core"
import { ListItem } from "@material-ui/core"
import { ListItemIcon } from "@material-ui/core"
import { ListItemText } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { IconButton } from "@material-ui/core"
import { Search } from "@material-ui/icons"
import { AddCircle } from "@material-ui/icons"
import { History } from "@material-ui/icons"
import { Person } from "@material-ui/icons"
import { ExitToApp } from "@material-ui/icons"
import { push } from "connected-react-router"
import { useCallback } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { TextInput } from "../UIkit"
import { signOut } from "../../reducks/users/operations"
import { useEffect } from "react"
import { db } from "../../firebase"

const useStyles = makeStyles( (theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
            width: 256,
        }
    },
    toolBar: theme.mixins.toolbar,
    drawerPaper: {
        wieth: 256,
    },
    seachField: {
        alignItems: 'center',
        display: 'flex',
        marginLeft: 32
    }
}))

const ClosableDrawer = (props) => {
   
    const classes = useStyles()
    const {container} = props

    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState('')


    const selectMenu = (event, path) => {
        dispatch(push(path))
        props.onClose(event)
    }

    
    const inputKeyword = useCallback( (event) => {
        setKeyword(event.target.value)
    },[setKeyword])

    
    const search = (event, keyword) => {
        dispatch(push('/?search=' + keyword))
        props.onClose(event)
    }


    const [filters, setFilters] = useState([
        {func: selectMenu, label: 'すべて', id: 'all', value: '/'},
        {func: selectMenu, label: 'メンズ', id: 'male', value: '/?gender=male'},
        {func: selectMenu, label: 'レディース', id: 'female', value: '/?gender=female'},
    ])

    const menus = [
        {func: selectMenu, label: '商品登録', icon: <AddCircle />, id: 'register', value: '/product/edit'},
        {func: selectMenu, label: '注文履歴', icon: <History />, id: 'history', value: '/order/history'},
        {func: selectMenu, label: 'プロフィール', icon: <Person />, id: 'profile', value: '/user/mypage'}
    ]

    useEffect( () => {
        db.collection('categories')
            .orderBy('order', 'asc')
            .get()
            .then(snapshots =>{
                const list = []
                snapshots.forEach(snapshot => {
                    const category = snapshot.data()
                    list.push({
                        func: selectMenu, label: category.name, id: category.id, value: '/?category=' + category.id
                    })
                })
                setFilters(prevState => [...prevState, ...list])
            })
    }, [])

    return (
        <nav  className={classes.drawer}>
            <Drawer
                container={container}
                variant='temporary'
                anchor='right'
                open={props.open}
                onClose={(e) => props.onClose(e)}
                classes={{paper: classes.drawerPaper}}
                ModalProps={{keepMounted: true}}
            >
                <div
                    onClose={(e) => props.onClose(e)}
                    // onKeyDown={(e) => props.onClose(e)}
                >
                    <div className={classes.seachField}>
                        <TextInput
                            fullWidth={false} label={'キーワードを入力'} multiline={false}
                            onChange ={inputKeyword} value={keyword} required={false} rows={1} type={'text'}
                        />
                        <IconButton  onClick={(e) => search(e, keyword)} >
                            <Search />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {menus.map(menu => (
                            <ListItem button key={menu.id} onClick={(e) => menu.func(e, menu.value)}>
                                <ListItemIcon>
                                    {menu.icon}
                                </ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        ))}
                        <ListItem button key='logout' onClick={() => dispatch(signOut())}>
                            <ListItemIcon>
                                <ExitToApp />
                            </ListItemIcon>
                            <ListItemText primary={'Logout'} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {filters.map(filter => (
                            <ListItem button key={filter.id} onClick={(e) => filter.func(e, filter.value)} >
                                <ListItemText primary={filter.label} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </nav>
    )

}
export default ClosableDrawer