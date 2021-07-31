import * as Actions from './actions'
import initialState from '../store/initialState'


// 第一引数のstate = initialState.usersは現在のstateの状態で、それがなかったら初期状態
export const ProductsReducer = (state = initialState.products, action) => {
    switch(action.type){
        case Actions.FETCH_PRODUCTS:
            return{
                ...state,
                list: [...action.payload]
            }
        case Actions.DELETE_PRODUCTS:
            return{
                ...state,
                list: [...action.payload]
            }
        default:
            return state
    }
}