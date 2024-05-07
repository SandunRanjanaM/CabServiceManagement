import React from "react";
import { Form,message } from "antd";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate import
import '../styles/RegisterStyles.module.css';
import axios from 'axios'; // Added axios import
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../features/alertSlice";

const Register = () => {
    const { handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onfinishHandler = async (values) => {
        try {
            dispatch(showLoading());
            const res = await axios.post(`/api/v1/user/register`, values)
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(`Register Successfully`)
               navigate("/login");
            } else {

                message.error(res.data.message);
            }

        } catch (error) {
            dispatch(hideLoading());
            console.log(error)
            message.error(`Something went wrong`)
        }
    };

    return (
        <>
            <div className="form-container card">
                <h1>Register Form</h1>
                <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
                    <Form.Item label="Name" name="name">
                        <input type="text" required />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <input type="email" required />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <input type="password" required />
                    </Form.Item>
                    <Link to="/login" className="ms-2">Already User login here</Link>
                    <button type="primary" onClick={handleSubmit}>Register</button>

                </Form>
            </div>
        </>
    );
};


export default Register;