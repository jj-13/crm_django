import { combineReducers } from "@reduxjs/toolkit";
import categories from './categories';

export default combineReducers({
    reducer:{
        categories: categories,        
    }    
})