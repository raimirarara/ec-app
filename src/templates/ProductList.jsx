import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ProductCard } from "../components/Products"
import { fetchProducts } from "../reducks/products/operations"
import {getProducts} from '../reducks/products/selectors'
import { PrimaryButton } from "../components/UIkit"
import PageNavigate from "../components/Footer/PageNavigate"
import { PinDropSharp } from "@material-ui/icons"

const ProductList = () => {

    const dispatch = useDispatch()
    const selector = useSelector( (state) => state )
    const products = getProducts(selector)

    const query = selector.router.location.search
    const search = /^\?search=/.test(query) ? query.split('?search=')[1] : ''
    const gender = /^\?gender=/.test(query) ? query.split('?gender=')[1] : ''
    const category = /^\?category=/.test(query) ? query.split('?category=')[1] : ''



    useEffect( () => {
        dispatch(fetchProducts( search, gender, category))
    }, [query])

  
    return(
        <div>
            <section className='c-section-wrapin' >
                <div className='p-grid__row' >
                    {products.length > 0 && (
                        products.map(product => (
                            <ProductCard 
                                key={product.id} id={product.id} name={product.name}
                                images={product.images} price={product.price}
                            />
                        ))
                    )}
                </div>
            </section>
            <div className='module-spacer--medium' />
            <div className='module-spacer--medium' />
            <PageNavigate products={products} />
        </div>
    )
}
export default ProductList
