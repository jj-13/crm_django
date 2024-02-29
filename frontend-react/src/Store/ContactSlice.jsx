import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postContact } from '../api/contact.api'

export const contact = createAsyncThunk(
    'contact',
    async (body) => {
        //console.log(userCredentials)   
        const response_api = await postContact(body)
        return response_api
    }
)

const categorySlice = createSlice({
    name: 'contact',
    initialState:{ 
        rows:[]
    },
    extraReducers:(builder)=>{
        builder
        //list
        .addCase(contact.pending, (state)=>{
            console.log('contact entro pending')
            //state.token = null
        })
        .addCase(contact.fulfilled, (state, action)=>{
            console.log('contact entro fulfilled')
        })
        .addCase(contact.rejected, (state, action)=>{
            console.log('contact entro rejected')
            console.log(action.error.message)
            if(action.error.message === 'Request failed with status code 401'){
                state.error = 'Access denied! invalid credentials'
            }
            else{
                console.log('contact entro 400 backend')
                state.error = action.error.message
            }
        })               
    }
})

export default categorySlice.reducer