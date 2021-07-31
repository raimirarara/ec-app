import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { listenAuthState } from "./reducks/users/operations"
import { getIsSignedIn } from "./reducks/users/selectors"

const Auth = ({children}) => {
    const dispatch = useDispatch()
    const selecor = useSelector(state => state)
    const IsSignedIn = getIsSignedIn(selecor)

    useEffect( () => {
        if (!IsSignedIn){
            dispatch(listenAuthState())
        }
    },[])

    if(!IsSignedIn){
        return <></>
    }else{
        return children
    }
    
    
}
export default Auth