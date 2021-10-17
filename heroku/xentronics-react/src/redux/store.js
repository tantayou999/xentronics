import api from '../services/api'
import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit'

//Hardcoded User ID
const USER_ID = 1

export const getCategory = createAsyncThunk('category/getCategory', async () => {  
    const response = await api.get('products/categories') 
    return response.data
}
)

export const getCart = createAsyncThunk(`cart/getCart`, async () => {  
    const response = await api.get(`users/${USER_ID}/cart`) 
    return response.data
}
)

export const addToCart = createAsyncThunk(`cart/addToCart`, async ({product_id, qty}) => {  
    await api.post(`users/${USER_ID}/cart`, {
        product_id, qty
    }) 

    const response = await api.get(`users/${USER_ID}/cart`) 
    return response.data
}
)

export const deleteFromCart = createAsyncThunk(`cart/deleteFromCart`, async ({product_id}) => {  
    await api.delete(`users/${USER_ID}/cart/${product_id}`) 
    const response = await api.get(`users/${USER_ID}/cart`) 
    return response.data
}
)

export const checkout = createAsyncThunk(`cart/checkout`, async () => {  
    await api.get(`users/${USER_ID}/cart/checkout`) 
    const response = await api.get(`users/${USER_ID}/cart`) 
    return response.data
}
)

const categorySlice = createSlice({  
    name: 'category',  
    initialState: {    
        value: []
    },  
    reducers: {    
    },
    extraReducers(builder) {
      builder
        .addCase(getCategory.fulfilled, (state, action) => {
          state.value = action.payload
        })
    },
})
    

const cartSlice = createSlice({  
    name: 'cart',  
    initialState: {    
        value: []
    },  
    reducers: {    
    },
    extraReducers(builder) {
      builder
        .addCase(getCart.fulfilled, (state, action) => {
          state.value = action.payload
        })
        .addCase(addToCart.fulfilled, (state, action) => {
          state.value = action.payload
        })
        .addCase(deleteFromCart.fulfilled, (state, action) => {
          state.value = action.payload
        })
        .addCase(checkout.fulfilled, (state, action) => {
          state.value = action.payload
        })
    },
})

export default configureStore({  
    reducer: {
        category: categorySlice.reducer,
        cart: cartSlice.reducer
    },
})