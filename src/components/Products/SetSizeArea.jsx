import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useCallback } from "react"
import { useState , useEffect} from "react"
import { TextInput } from "../UIkit"
import { Edit, Delete, CheckCircle} from "@material-ui/icons"

const useStyles = makeStyles({
    checkIcon: {
        float: 'right'
    },
    iconCell: {
        height: 48,
        width: 48
    }
})

const SetSizeArea = (props) => {

    const classes = useStyles()

    const [index, setIndex] = useState(0),
          [size, setSize] = useState(''),
          [quentity, setQuentity] = useState(0);



    const inputSize = useCallback((event)=>{
        setSize(event.target.value)
    },[setSize])

    const inputQuentity = useCallback((event)=>{
        setQuentity(event.target.value)
    },[setQuentity])

    const addSize = (index, size, quentity) => {
        if(size === '' || quentity === ''){
            // Required input is blank
            return false
        }else{
            if(index === props.sizes.length){
                props.setSizes(prevState => [...prevState, {size: size, quentity: quentity}])
                setIndex(index + 1)
                setSize('')
                setQuentity(0)
            }else{
                const newSizes = props.sizes
                newSizes[index] = {size: size, quentity: quentity}
                props.setSizes(newSizes)
                setIndex(newSizes.length)
                setSize('')
                setQuentity(0)
            }
        }
    }

    const editSize = (index, size, quentity) => {
        setIndex(index)
        setSize(size)
        setQuentity(quentity)
    }

    const deleteSize = (deleteIndex) => {
        const newSizes = props.sizes.filter((item, i) => i !== deleteIndex )
        props.setSizes(newSizes)
    }

    useEffect(() => {
        setIndex(props.sizes.length)
    },[props.sizes.length])

    return(
        <div>
            <TableContainer component={Paper} >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell className={classes.iconCell} />
                            <TableCell className={classes.iconCell} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.sizes.length > 0 && (
                            props.sizes.map((item, i) => (
                                <TableRow key={item.size} >
                                    <TableCell>{item.size}</TableCell>
                                    <TableCell>{item.quentity}</TableCell>
                                    <TableCell>
                                        <IconButton className={classes.iconCell} onClick={() => editSize(i, item.size, item.quentity)} >
                                            <Edit />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton className={classes.iconCell} onClick={() => deleteSize(i)} >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>

                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={'サイズ'} multiline={false} required={true}
                        rows={1} value={size} type={'text'} onChange={inputSize}
                    />
                    <TextInput
                        fullWidth={false} label={'数量'} multiline={false} required={true}
                        rows={1} value={quentity} type={'number'} onChange={inputQuentity}
                    />
                    <IconButton className={classes.checkIcon} onClick={() => addSize(index, size, quentity)} >
                        <CheckCircle/>
                    </IconButton>
                </div>
            </TableContainer>
        </div>
    )
}

export default SetSizeArea