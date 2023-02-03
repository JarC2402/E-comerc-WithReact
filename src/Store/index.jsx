import { configureStore } from "@reduxjs/toolkit";
import isLoadingSlice from "./Slices/isLoading.slice";
import productSlice from "./Slices/Products.slice";
import carSlice from "./Slices/Car.slice";
import cartSlice from "./Slices/cart.slice";

export default configureStore({
    reducer: {
        isLoading : isLoadingSlice,
        Products : productSlice,
        car : carSlice,
        cart: cartSlice
    }
})