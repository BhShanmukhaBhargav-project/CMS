import axios from 'axios';
import React, { useState } from 'react';
import './PlanDetails.css';
import { useNavigate } from 'react-router-dom';



function PlanDetails() {

    const navigate = useNavigate();
    const [plan, setplan] = useState([])
    const getplan = () => {
        axios.get("http://localhost:4094/api/Plan").then(
            (response) => {
                console.log(response);
                setplan(response.data)
            }
        )
    }
    return (
        <div className = 'outer2'><h1>Plan Details</h1>{
            plan.map(value => {
                return (
                    <div className='inner3'>
                        <ul className='myUL4'>
                            <li><label>Plan Id</label>:<span>{value.pId}</span></li>
                            <li><label>Plan Name</label>:<span>{value.pName}</span></li>
                            <li><label>plan Amount</label>:<span>{value.amount}</span></li>
                            <li><label>Plan Duration</label>:<span>{value.duration}</span></li>
                            <button onClick={() => navigate('/Addplan')} className='btn btn-success10'>Select</button>
                        </ul>
                    </div>
                )
            })
        }
            <div className='logout'>
                <button onClick={() => navigate('/')} className='btn btn-success11'>Logout</button>
            </div>
            <button className='btn btn-success12' onClick={getplan}>GetAllPlans</button>
        </div >
    );
}

export default PlanDetails;