// este es el equivalente a favorites.slice
import { createSlice } from "@reduxjs/toolkit";
import {setIsLoading} from './isLoading.slice';
import axios from "axios";
import getConfig from   '../../utils/getConfig';


export const carSlice = createSlice({
    name: 'car',
    initialState: [],
    reducers: {
        setCar : (state, action) => {
            return action.payload
        }
    }

})

export const getCarThunk = () => dispatch => {
    dispatch (setIsLoading(true))
    axios
    .get(`https://e-commerce-api.academlo.tech/api/v1/cart`, getConfig())
    .then(resp => {
        console.log(resp)
         dispatch(setCar(resp.data.data))
        })
    .catch(error => console.error(error) )
    .finally(() => dispatch(setIsLoading(false)))
}

export const createCarThunk = (product) => (dispatch) => {
    dispatch(setIsLoading(true));
    axios.post("https://e-commerce-api.academlo.tech/api/v1/cart", product, getConfig())
    .then((resp) =>dispatch(getCarThunk()))
    .finally(() => dispatch(setIsLoading(false)));
    
}

export const { setCar } = carSlice.actions;

export default carSlice.reducer;