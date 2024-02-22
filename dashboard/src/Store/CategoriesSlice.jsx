import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategories } from '../api/auth.api'

export const category = createAsyncThunk(
    'categories',
    async () => {
        //console.log(userCredentials)   
        const response_api = await getCategories()
        return response_api
    }
)

const categorySlice = createSlice({
    name: 'categories',
    initialState:{ 
        rows:[]
    },
    extraReducers:(builder)=>{
        builder
        //list
        .addCase(category.pending, (state)=>{
            console.log('category entro pending')
            //state.token = null
        })
        .addCase(category.fulfilled, (state, action)=>{
            console.log('category entro fulfilled')
            state.rows = [...action.payload.data]
        })
        .addCase(category.rejected, (state, action)=>{
            console.log('category entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'
            }
            else{
                console.log('user-checking entro 400 backend')
                state.error = action.error.message
            }
        })
               
    }
})

export default categorySlice.reducer