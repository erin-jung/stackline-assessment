import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import mockSalesData from "../../assets/stackline_frontend_assessment_data_2021.json"
import { ProductInitialState, ProductDetails } from "./sales_interface";

export const fetchProductData = createAsyncThunk("sales/fetchProductData", async () => {
    //TODO: fetch data from actual URL here
    return mockSalesData;
});

const initialProductDetails: ProductDetails = {
    id: "",
    title: "",
    image: "",
    subtitle: "",
    brand: "",
    retailer: "",
    details: [],
    tags: [],
    sales: []
};

const initialState: ProductInitialState = {
    productDetails: initialProductDetails,
    loading: "idle",
    error: null,
};

const salesSlice = createSlice({
    name: "productDetail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductData.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(fetchProductData.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.productDetails = action.payload[0];
            })
            .addCase(fetchProductData.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.error.message || "Failed to fetch product data";
            });
    },
});

export default salesSlice.reducer;

