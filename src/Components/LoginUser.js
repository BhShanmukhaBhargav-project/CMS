import React, { useState, useEffect } from 'react';
import './LoginUser.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


LoginUser.propTypes = {

};



function LoginUser(props) {

    const intialValues = { un: "", pass: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        console.log(formValues);
    };

    const validate = (values) => {
        const errors = {}
        const regex = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i;
        if (!values.un) {
            errors.un = "Username is required!"
        } else if (!regex.test(values.un)) {
            errors.un = "This is not a valid username format!"
        }
        if (!values.pass) {
            errors.pass = "Password is required!"
        }
        else if (values.pass.length < 4) {
            errors.pass = "Password must include more than 4 characters!"
        }
        else if (values.pass.length > 10) {
            errors.pass = "Password cannot exceed more than 10 characters!"
        }
        return errors;
    };

    useEffect(() => {
        console.warn(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.warn(formValues);
        }
    }, [formErrors])

    const navigate = useNavigate();
    var Login = async (event) => {
        event.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);

        var user = {
            username: formValues.un,
            password: formValues.pass,
        };
        console.log(user)
        var response = await axios.post('http://localhost:4094/api/Member/Login', user
        ).catch(function (error) {
            if (error.response) {
                alert("Invalid credentials")
            }
        })
        console.log(response.status)
        if (response.status === 200) {
            sessionStorage.setItem("key", formValues.un)
            navigate("/MemberPlans")
        }

    }
    return (
        <div className='loginuserdiv'>
            <h1>Login</h1>
            <form className="login-form" onSubmit={Login}>
                <label className='form-control1'>Username</label>
                <input className='form-control' type="text" name='un' placeholder='Enter Username' value={formValues.un} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.un}</p>
                <label className='form-control1'>Password</label>
                <input className='form-control' type="password" name='pass' placeholder='Enter Password' value={formValues.pass} onChange={handleChange} />
                <p style={{ color: 'red' }}>{formErrors.pass}</p>
                <button onClick={() => Login()} className='btn btn-success5'>Login</button>
                <br />
                <a href='Register' className ='btn1'>New User? Register</a>
            </form>      
        </div>
    );
}

export default LoginUser;