import * as Actions from './actions'
import initialState from '../store/initialState'


// 第一引数のstate = initialState.usersは現在のstateの状態で、それがなかったら初期状態
export const UsersReducer = (state = initialState.users, action) => {
    switch(action.type){
        case Actions.FETCH_ORDERS_HISTORY:
            return{
                ...state,
                orders: [...action.payload]
                // スプレッド構文 重複しているキーの値は上書きされ、存在しなかったフィールドが維持される
            }
            case Actions.FETCH_PRODUCTS_IN_FAVORITES:
            return{
                ...state,
                cart: [...action.payload]
                // スプレッド構文 重複しているキーの値は上書きされ、存在しなかったフィールドが維持される
            }
        case Actions.FETCH_PRODUCTS_IN_CART:
            return{
                ...state,
                cart: [...action.payload]
                // スプレッド構文 重複しているキーの値は上書きされ、存在しなかったフィールドが維持される
            }
        case Actions.SIGN_IN:
            return{
                ...state,
                ...action.payload 
                // スプレッド構文 重複しているキーの値は上書きされ、存在しなかったフィールドが維持される
            }
        case Actions.SIGN_OUT:
            return{
                ...action.payload 
                // スプレッド構文 重複しているキーの値は上書きされ、存在しなかったフィールドが維持される
            }
        default:
            return state
    }
}