import React,{useEffect} from 'react';
import Axios from 'axios'
import Layout from './Layout';
const HomePage = () => {
    const getUserData=async()=>{
        try{
            await Axios.post(
                '/api/v1/user/getUserData',
                {},
                {headers:{
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }
                
            )
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getUserData()
    },[])
    return(
        <Layout>
            <h1>Home Page</h1>
        </Layout>
    )
};

export default HomePage;