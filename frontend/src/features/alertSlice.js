import {createSlice} from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name:"alerts",
    initialState:{
        loading:false,
        alerts:[]
    }, 
    reducers:{
        showLoading:(state)=>{
            state.loading=false
       },
         hideLoading:(state)=>{
              state.loading=false
         },
    }
})
export const {showLoading,hideLoading}=alertSlice.actions