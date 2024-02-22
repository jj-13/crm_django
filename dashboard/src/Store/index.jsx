import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Auth'
import authorBlogPagesReducer from './Blog'
import categoryReducer from './CategoriesSlice'
import blogDetailReducer from './BlogsDetailSlice'

const store = configureStore({
    reducer:{
        auth: authReducer,        
        category: categoryReducer,
        author_blog: authorBlogPagesReducer,
        blogs_detail: blogDetailReducer, 
    }
})

export default store