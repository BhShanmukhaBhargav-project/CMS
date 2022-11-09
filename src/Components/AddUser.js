import React, { useState, useEffect } from 'react';
import './AddUser.css'
import { useNavigate } from 'react-router-dom';


function AddUser(props) {
    const navigate = useNavigate();

    const intialValues = { un: "", pass: "", name: "", phoneno: "", EmailId: "", Address: "", State: "", Country: "", dob: "" };
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    var flag = true;

    const handleChange = (e) => {
        //console.log(e.target);
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
        //console.log(formValues);
    };

    const validate = (values) => {
        const errors = {}
        const regexForUsername = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i;
        const regexForEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.EmailId) {
            errors.EmailId = "Email is required!"
            flag = false;
        } else if (!regexForEmail.test(values.EmailId)) {
            errors.EmailId = "This is not a valid Email format!"
            flag = false;
        }

        if (!values.un) {
            errors.un = "Username is required!"
            flag = false;
        } else if (!regexForUsername.test(values.un)) {
            errors.un = "This is not a valid username format!"
            flag = false;
        }

        if (!values.pass) {
            errors.pass = "Password is required!"
            flag = false;
        }
        else if (values.pass.length < 4) {
            errors.pass = "Password must be more than 4 characters!"
            flag = false;
        }
        else if (values.pass.length > 10) {
            errors.pass = "Password can't exceed more than 10 characters!"
            flag = false;
        }

        if (!values.name) {
            errors.name = "Name is required!"
            flag = false;
        }

        if (values.phoneno.length !== 10) {
            errors.phoneno = "Phone number should contain 10 digits only!"
            flag = false;
        }

        // console.warn(errors);
        return errors;
    };

    // useEffect(() => {
    //     //console.warn(formErrors);
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //         //console.warn(formValues);
    //     }
    // }, [formErrors])



    var registerUser = async (event) => {
        event.preventDefault();

        setFormErrors(validate(formValues));
        console.log(formErrors)
        setIsSubmit(true);

        var user = {
            Name: formValues.name,
            phoneno: formValues.phoneno,
            EmailId: formValues.EmailId,
            Address: formValues.Address,
            DateOfBirth: formValues.dob,
            username: formValues.un,
            password: formValues.pass,
            state: formValues.State,
            Country: formValues.Country,
            role: '',
            status: 'active'
        };
        //console.log(isSubmit)

        if (flag) {

            // console.log(user)
            var response = await fetch('http://localhost:4094/api/Member/Register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
                mode: 'cors'
            });
            if (response.status === 200) {
                alert("Registered")
                navigate('/')
            }
            else {
                alert("Invalid credentials")
            }

            // console.log(data);
        }

        else {
            // console.log(Object.keys(formErrors))
            alert("Please enter all fields correctly")
        }

    }
    return (

        <div className='userdiv'>
            <h1>Register</h1>
            <form onSubmit={registerUser} className = 'add-form'>
                <label className='form-control1'>Name</label>
                <input className='form-control' name='name' placeholder='Enter Name' value={formValues.name} onChange={handleChange} type="text" required />
                <p style={{ color: 'red' }}>{formErrors.name}</p>
                <label className='form-control1'>Phoneno</label>
                <input className='form-control' name='phoneno' placeholder='Enter Phone' value={formValues.phoneno} onChange={handleChange} type="text" required />
                <p style={{ color: 'red' }}>{formErrors.phoneno}</p>
                <label className='form-control1'>EmailId</label>
                <input className='form-control' name='EmailId' placeholder='Enter Email' value={formValues.EmailId} onChange={handleChange} type="text" required />
                <p style={{ color: 'red' }}>{formErrors.EmailId}</p>
                <label className='form-control1'>Address</label>
                <input className='form-control' name='Address' placeholder='Enter Address' value={formValues.Address} onChange={handleChange} type="text" required />
                <p style={{ color: 'red' }}>{formErrors.Address}</p>
                <label className='form-control1'>State</label>
                <input className='form-control' name='State' placeholder='Enter State' value={formValues.State} onChange={handleChange} type="text" required />
                <p style={{ color: 'red' }}>{formErrors.State}</p>
                <label className='form-control1'>Country</label>
                <input className='form-control' name='Country' placeholder='Enter Country' value={formValues.Country} onChange={handleChange} type="text" required />
                <p style={{ color: 'red' }}>{formErrors.Country}</p>
                <label className='form-control1'>Date Of Birth</label>
                <input className='form-control' name='dob' placeholder='Enter Date of Birth' value={formValues.dob} onChange={handleChange} type="date" required />
                <p style={{ color: 'red' }}>{formErrors.dob}</p>
                <label className='form-control1'>Username</label>
                <input className='form-control' name='un' placeholder='Enter Username' value={formValues.un} onChange={handleChange} type="text" required />
                <p style={{ color: 'red' }}>{formErrors.un}</p>
                <label className='form-control1'>Password</label>
                <input className='form-control' name='pass' placeholder='Enter Password' value={formValues.pass} type="password" onChange={handleChange} required />
                <p style={{ color: 'red' }}>{formErrors.pass}</p>
                <button className='btn btn-success15'>Register</button>
                <a href='/' className = 'btn2'>Already a User? Login</a>
            </form>


        </div>
    );
}

export default AddUser;