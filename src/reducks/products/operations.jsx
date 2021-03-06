import {db, FirebaseTimestamp} from '../../firebase'
import { push } from 'connected-react-router'
import { deleteProductAction,fetchProductsAction} from './actions'


const productsRef = db.collection('products')
const perpage = 2

export const orderProduct = (productsInCart, amount) => {
    return async (dispatch, getState) => {
        const uid = getState().users.uid
        const userRef = db.collection('users').doc(uid)
        const timestamp =FirebaseTimestamp.now()

        let products = [],
            soldOutProducts = [];

        const batch = db.batch()

        for (const product of productsInCart){
            const snapshot = await productsRef.doc(product.productId).get()
            const sizes = snapshot.data().sizes

            const updateSizes = sizes.map(size => {
                if(size.size === product.size){
                    if(size.quentity === 0){
                        soldOutProducts.push(product.name)
                        return size
                    }
                    return {
                        size: size.size,
                        quentity: size.quentity - 1
                    }
                }else{
                    return size
                }
            })

            products.push({
                id: product.productId,
                images: product.images,
                name: product.name,
                price: product.price,
                size: product.size
            })

            batch.update(
                productsRef.doc(product.productId),
                {sizes: updateSizes}
            )

            batch.delete(
                userRef.collection('cart').doc(product.cartId)
            )
    }
    console.log(soldOutProducts)

    if(soldOutProducts.length > 0){
        const errorMessage = (soldOutProducts.length > 1 )? 
                                soldOutProducts.join('と'):
                                soldOutProducts[0]
            
        alert('大変申し訳ありません。' + errorMessage + 'が在庫切れとなったため、注文処理を中断しました。')
        return false
    }else{
        batch.commit()
            .then(() => {
                const orderRef = userRef.collection('orders').doc()
                const date = timestamp.toDate()
                const shippingDate = FirebaseTimestamp.fromDate(new Date(date.setDate(date.getDate() + 3)))

                const history = {
                    amount: amount,
                    created_at: timestamp,
                    id: orderRef.id,
                    products: products,
                    shipping_date: shippingDate,
                    updated_at: timestamp
                }

                orderRef.set(history)

                dispatch(push('/order/complete'))

            }).catch(() => {
                alert('注文処理に失敗しました。通信環境ご確認のうえ、もう一度お試しください。')
                return false
            })
        }
    }
}       

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        productsRef.doc(id).delete()
                .then(() => {
                    const prevProducts = getState().products.list
                    const newProducts = prevProducts.filter( product => product.id !== id)
                    dispatch(deleteProductAction(newProducts))
                })
    }
}

export const fetchNextPageProducts = (last) => {
    return async (dispatch) => {
        let query = productsRef.orderBy('updated_at', 'desc')
        try{
            let docSnapshot = await productsRef.doc(last.id).get() /* await でPromiseが完了した値を返す */
            
            let next = query.startAfter(docSnapshot).limit(perpage)
            next
            .get()
            .then( snapshots => {
                const ProductList = []
                snapshots.forEach( snapshot => {
                    const product = snapshot.data()
                    ProductList.push(product)
                
                })
                dispatch(fetchProductsAction(ProductList))
            })
        }
        catch(error){
            // dispatch(push('/')) これが反応しない!!!
            alert('データが存在していません。')
        }

}}

export const fetchPrevPageProducts = (first) => {
    return async (dispatch) => {
        let query = productsRef.orderBy('updated_at', 'desc')
        try{
            let docSnapshot = await productsRef.doc(first.id).get() /* await でPromiseが完了した値を返す */

            let next = query.endBefore(docSnapshot).limitToLast(perpage)
            next
            .get()
            .then( snapshots => {
                const ProductList = []
                snapshots.forEach( snapshot => {
                    const product = snapshot.data()
                    ProductList.push(product)
                
                })
                dispatch(fetchProductsAction(ProductList))
            })
        }
        catch(error){
            alert('データが存在していません。')
        }
}}

export const fetchProducts = (search, gender, category) => {
    return async (dispatch) => {

        let query = productsRef.orderBy('updated_at', 'desc')
        
        query = (search !== '') ? productsRef.orderBy('name').startAt(search).endAt(search + '\uf8ff') : query /* '\uf8ff'はほとんどのutf-8コードより後ろになるため、前方一致検索になるらしい */
        query = (gender !== '') ? query.where('gender', '==', gender) : query
        query = (category !== '') ? query.where('category', '==', category) : query


        query.limit(perpage)
            .get()
            .then( snapshots => {
                const ProductList = []
                snapshots.forEach( snapshot => {
                    const product = snapshot.data()
                    ProductList.push(product)
                
                })
        
                dispatch(fetchProductsAction(ProductList))

            })
    }   
}

export const saveProduct = (id, name, description, category, gender, price, images, sizes) => {
    return async (dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            category: category,
            description: description,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price, 10), /* priceはString型なのでそれをint型に変換 10は10進数の意味*/
            sizes: sizes,
            updated_at: timestamp
        }

        if(id === ''){
            const ref = productsRef.doc()
            id = ref.id
            data.id = id
            data.created_at = timestamp
        }

        return productsRef.doc(id).set(data, {merge: true})
            .then(() => {
                alert('商品を保存しました')
                dispatch(push('/'))
            })
            .catch((error) => {
                throw new Error(error)
            })

    }
}