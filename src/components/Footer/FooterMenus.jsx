
import { IconButton } from "@material-ui/core"
import { NavigateNext, NavigateBefore } from "@material-ui/icons"
import { fetchNextPageProducts, fetchPrevPageProducts } from "../../reducks/products/operations"
import { getProducts } from "../../reducks/products/selectors"
import { PrimaryButton } from "../UIkit"
import { ProductList } from "../../templates"
import { useCallback } from "react"

const FooterMenus = () => {
    
    const dispatch = useDispatch()
    const selector = useSelector((state) => state)
    const products = getProducts(selector)

    const last = products[products.length - 1]
    const first = products[0]

    const backToHome = useCallback(() => {
        dispatch(push('/'))
    })



    if (products.length === 0){
        return (
            <PrimaryButton label={'ホームに戻る'} onClick={backToHome} />
        )
    }else{
        return (
            <>
                <IconButton onClick={() => {dispatch(fetchPrevPageProducts(first))}} >
                    <NavigateBefore />
                </IconButton>
                <IconButton onClick={() => {dispatch(fetchNextPageProducts(last))}}>
                    <NavigateNext />
                </IconButton>
            </>
        )
    }
}
export default FooterMenus
