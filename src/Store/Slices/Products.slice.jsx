import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const productSlice = createSlice ({
    name: "Products",
    initialState: [],
    reducers: {
        setProducts : (state, action) => {
            return action.payload
        }
    }
})


export const getProductsThunk = () => dispatch => {
    dispatch(setIsLoading(true)) // este dispach es para que mientras trae la info de la appi aparezca la animacion de cargando
    axios
    .get ("https://e-commerce-api.academlo.tech/api/v1/products")
    .then (resp => dispatch(setProducts(resp.data.data.products)))
    .catch(error => console.log(error))
    .finally(() => dispatch(setIsLoading(false)))
}

export const categoryThunk = (id) => (dispatch) => {
    dispatch(setIsLoading(true)) // este dispach es para que mientras trae la info de la appi aparezca la animacion de cargando
    axios
    .get (`https://e-commerce-api.academlo.tech/api/v1/products?category=${id}`)//${id}
    .then ((resp) => dispatch(setProducts(resp.data.data.products)))
    .catch(error => console.log(error))
    .finally(() => dispatch(setIsLoading(false)))

    
}

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;