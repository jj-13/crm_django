import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './CategoriesSlice'
import blogReducer from './BlogSlice'
import blogsByCategoryReducer from './BlogByCategorySlice'
import blogsByCategoryPagesReducer from './BlogsByCategoryPageSlice'
import blogDetailReducer from './BlogsDetailSlice'
import blogSearchPagesReducer from './BlogsSearchPageSlice'

const store = configureStore({
    reducer:{
        categories: categoryReducer,
        blogs: blogReducer,
        blogs_by_categories: blogsByCategoryReducer,
        blogs_by_categories_pages: blogsByCategoryPagesReducer,        
        blogs_detail: blogDetailReducer,        
        blogs_search_pages: blogSearchPagesReducer,        
    }
})

export default store