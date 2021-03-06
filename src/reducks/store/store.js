import { connectRouter, routerMiddleware } from 'connected-react-router'
import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux'

import { ProductsReducer } from '../products/reducers';
import { UsersReducer } from '../users/reducers';
import thunk from 'redux-thunk';

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers(
            {
                router: connectRouter(history),
                products: ProductsReducer,
                users: UsersReducer
            }
        ),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}