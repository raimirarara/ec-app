import { IconButton } from "@material-ui/core"
import { NavigateNext, NavigateBefore } from "@material-ui/icons"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { fetchProducts,fetchNextPageProducts, fetchPrevPageProducts } from "../../reducks/products/operations"
import { PrimaryButton } from "../UIkit"


const PageNavigate = (props) => {

    const dispatch = useDispatch()

    const products = props.products

    const last = products[products.length - 1]
    const first = products[0]

    const backToHome = useCallback(() => {
        dispatch(fetchProducts('','',''))
    })

    return (
        <footer className='center' >
            {products.length > 0 ? (
                <div>
                    <IconButton onClick={() => {dispatch(fetchPrevPageProducts(first))}} >
                        <NavigateBefore />
                        Back
                    </IconButton>
                    <IconButton onClick={() => {dispatch(fetchNextPageProducts(last))}}>
                        Next
                        <NavigateNext />
                    </IconButton>
                </div>
            ) : (
                <div className='u-text__headline u-text-center'>
                            これ以上商品が存在しません。
                            <br></br>
                            <PrimaryButton label={'Go To Home'} onClick={backToHome} />
                </div>
            )}
        </footer>
    )
}
export default PageNavigate