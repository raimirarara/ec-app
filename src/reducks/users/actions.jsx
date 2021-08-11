


export const FETCH_ORDERS_HISTORY = 'FETCH_ORDERS_HISTORY'

export const fetchOrdersHistoryAction = (history) => {
    // Actiuonsは必ずプレーンなObjectを返す　なぜなら単にデータを記述したいから
    return{
        type: 'FETCH_ORDERS_HISTORY',
        payload: history
    }
}


export const FETCH_PRODUCTS_IN_FAVORITES = 'FETCH_PRODUCTS_IN_FAVORITES'

export const fetchProductsInFavoriteAction = (products) => {
    // Actiuonsは必ずプレーンなObjectを返す　なぜなら単にデータを記述したいから
    return{
        type: 'FETCH_PRODUCTS_IN_FAVORITES',
        payload: products
    }
}





export const FETCH_PRODUCTS_IN_CART = 'FETCH_PRODUCTS_IN_CART'

export const fetchProductsInCartAction = (products) => {
    // Actiuonsは必ずプレーンなObjectを返す　なぜなら単にデータを記述したいから
    return{
        type: 'FETCH_PRODUCTS_IN_CART',
        payload: products
    }
}




export const SIGN_IN = 'SIGN_IN'

export const signInAction = (userState) => {
    // Actiuonsは必ずプレーンなObjectを返す　なぜなら単にデータを記述したいから
    return{
        type: 'SIGN_IN',
        payload: {
            isSignedIn: true,
            role: userState.role,
            uid: userState.uid,
            username: userState.username
        }
    }
}


export const SIGN_OUT = 'SIGN_OUT'

export const signOutAction = () => {
    return{
        type: 'SIGN_OUT',
        payload: {
            isSignedIn: false,
            role: '',
            uid: '',
            username: '',
        }
    }
}