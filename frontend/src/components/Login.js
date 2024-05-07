import React,{useState} from "react";
import "../styles/RegisterStyles.module.css";
import { Link,useNavigate } from "react-router-dom";
import { Form, Input,message } from "antd";
import {useDispatch} from "react-redux";
import{showLoading,hideLoading} from "../features/alertSlice";
import Axios from "axios";

const Login = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const [email, setEmail] = useState("");
  const[password,setPassword]=useState("");
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
};  
  const onSubmit = async(values)=>{
    try{
      dispatch(showLoading());
      const res=await Axios.post(`/api/v1/user/login`,values);
      dispatch(hideLoading());
      if(res.data.success){
        localStorage.getItem("token",res.data.token);
        message.success(`Login Successfully`);
        navigate("/alltrips");
      }
    }catch(error){
      dispatch(hideLoading());
      console.log(error);
      message.error(`Login Failed`);
    };
    navigate("/homepage");
  };
  return (
    <div className="form-container card">
      <h1>Login Form</h1>
      <Form layout="vertical" onFinish={onSubmit} className="login-form">
        <Form.Item 
        label="Email" 
        name="email"
        rules={[
            {required:true,message:"Please enter your email address"},
            {type:"email",message:"Please enter a valid email"}
        ]}
        >
          <Input type="email" value={email} onChange={handleEmailChange} required />
        </Form.Item>
        <Form.Item 
        label="Password" 
        name="password"
        rules={[
            {
                required:true,
                message:"Please enter your password"
            }
        ]}>
          <Input type="password" value={password} onChange={handlePasswordChange} required />
        </Form.Item>
        <Link to="/register" className="ms-2">Not a User? Register here</Link>
        <button htmltype="submit">Login</button>
      </Form>
    </div>
  );
};

export default Login;
