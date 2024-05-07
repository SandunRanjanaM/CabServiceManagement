import React, { useEffect, useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../features/alertSlice";
import Axios from "axios";
import { setUser } from "../features/userSlice";

export default function ProtectedRoute({ children }){
    const dispatch = useDispatch();
    const {user}=useSelector((state)=>state.user);

    const getUser = useCallback(async () => {
        try {
            dispatch(showLoading());
            const res = await Axios.post('api/v1/user/getUserData',
            {token :localStorage.getItem("token")},
            {
                headers:{
                    Authorization : `Bearer ${localStorage.getItem("token")}`
                }
            }
            )
            dispatch(hideLoading());
            if(res.data.success){
                dispatch(setUser(res.data.data))
            }else{
                <Navigate to="/login"/>
            }
                
        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
        }
    }, [dispatch]);

    useEffect(()=>{
        if(!user){
            getUser()
        }
    },[user, getUser])

    if(localStorage.getItem("token")){
        return children
    }else{
        return <Navigate to="/login"/>
    }
}