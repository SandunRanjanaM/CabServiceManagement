import React from "react";
import { Redirect } from "react-router-dom";

export default function PublicRoute({children}){
    if(localStorage.getItem("token")){
        return <Redirect to="/homepage" />
    }else{
        return children
    }
}