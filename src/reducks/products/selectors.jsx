import { createSelector } from "reselect";

const ProductSelector = (state) => state.products

export const getProducts = createSelector(
    [ProductSelector],
    state => state.list
)