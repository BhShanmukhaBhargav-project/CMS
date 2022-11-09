import { useNavigate } from 'react-router-dom';
import './AddPlan.css'
import React, { useState } from 'react';

function AddPlan(props) {
    const navigate = useNavigate();
    var [pid, setpid] = useState('');
    var mid = sessionStorage.getItem("ID")
    var changeplanid = (event) => {
        setpid(event.target.value);
    }
    var Addplan = async (event) => {
        event.preventDefault();

        var plan = {
            mid: mid,
            pid: pid
        };
        console.log(plan)
        var response = await fetch('http://localhost:4094/api/MemberPlan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(plan),
            mode: 'cors'
        });
        if (response.status === 200) {
            alert("Plan Registered")
            navigate('/')
        }
        else {
            alert("Plan Not registered")
        }
        var data = await response

        console.log(data);
    }
    return (

        <div className='plandiv'>
            <form onSubmit={Addplan} className="plan-form">
                <label className='form-control1'>PlanId</label>
                <input className='form-control' onChange={changeplanid} type="text" required />
                <br />
                <button className='btn btn-success1'>Enter</button>
            </form>
            <div className='logout'>
                <button onClick={() => navigate('/')} className='btn btn-success2'>Logout</button>
            </div>
        </div>

    );



}

export default AddPlan;