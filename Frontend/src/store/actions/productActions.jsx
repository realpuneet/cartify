import axios from "../../api/config";
import { loadproducts } from "../reducers/productSlice"; // <-- fixed import

export const asyncloadproducts = () => async (dispatch, getState) => {
    try {
        // You should fetch all products, not limit by state length
        const { data } = await axios.get("/products?limit=100");
        dispatch(loadproducts(data)); // <-- fixed function name
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

export const asynccreateproduct = (product) => async (dispatch, getState) => {
    try {
        await axios.post("/products", product);
        dispatch(asyncloadproducts());
        console.log("Product Created!");
    } catch (error) {
        console.log(error);
    }
};

export const asyncupdateproduct =
    (id, product) => async (dispatch, getState) => {
        try {
            await axios.patch(`/products/${id}`, product);
            dispatch(asyncloadproducts());
            console.log("Product Updated!");
        } catch (error) {
            console.log(error);
        }
    };

export const asyncdeleteproduct = (id) => async (dispatch, getState) => {
    try {
        await axios.delete("/products/" + id);
        dispatch(asyncloadproducts());
        console.log("Product Deleted!");
    } catch (error) {
        console.log(error);
    }
};