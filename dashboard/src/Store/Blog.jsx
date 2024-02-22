import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuthorBlogsPage } from '../api/auth.api'

export const authorBlogPages = createAsyncThunk(
    'author_blogs_pages',
    async (body) => {
        //console.log(userCredentials)   
        const response_api = await getAuthorBlogsPage(body)
        return response_api
    }
)

const authorBlogPagesSlice = createSlice({
    name: 'author_blogs_pages',
    initialState:{ 
        rows:[],
        next:'',
        previous:'',
        count:0
    },
    extraReducers:(builder)=>{
        builder
        //list
        .addCase(authorBlogPages.pending, (state)=>{
            console.log('authorBlogPages entro pending')
            //state.token = null
        })
        .addCase(authorBlogPages.fulfilled, (state, action)=>{
            console.log('authorBlogPages entro fulfilled')
            state.rows = [...action.payload.data]
            state.next =  action.payload.next
            state.previous =  action.payload.previous
            state.count =  action.payload.count
            state.error = null
        })
        .addCase(authorBlogPages.rejected, (state, action)=>{
            console.log('authorBlogPages entro rejected')
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

export default authorBlogPagesSlice.reducer