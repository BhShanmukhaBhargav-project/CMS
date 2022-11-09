import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MemberPlans.css';



function MemberPlans() {
    const navigate = useNavigate();
    const [plans, setplans] = useState([])
    const [setmemberplans] = useState([])
    var Id;
    const getplans = () => {
        var ss = sessionStorage.getItem("key")
        console.log(ss)
        if (ss === "Krantdarshi") {
            navigate("/ClaimDetails")
        }
        axios.get(`http://localhost:4094/api/Member/GetAllPlansByMember?username=${ss}`).then(
            (response) => {
                console.log(response);
                setplans(response.data)
                setmemberplans(response.data.memberPlans)
            }
        )
    }
    return (
        <div className='outer1'>{
            plans.map(value => {
                Id=value.id;
                console.log(Id)
                sessionStorage.setItem("ID",Id)
                return (
                    <div className='inner2'>
                        <button onClick={() => navigate('/Plans')} className='btn btn-success6'>All plans</button>
                        {value.memberPlans.map(value2 =>
                            <ul className='myUL2'>
                                <li><label>Member Id</label>        : <span>{value.id}</span></li>
                                <li><label>Member UserName</label>  : <span>{value.userName}</span></li>
                                <li><label>Member plan Id</label>   : <span>{value2.pId}</span></li>
                                <li><label>Member plan Name</label> : <span>{value2.plan.pName}</span></li>
                                <button onClick={() => navigate('/Claims')} className='btn btn-success7'>Submit claim</button>
                            </ul>
                        )}
                    </div>
                )
            })
        }
           <div className='logout'>
                <button onClick={() => navigate('/')} className='btn btn-success8'>Logout</button>
            </div>
            <button className='btn btn-success9' onClick={getplans}>MyPlans</button> 
        </div>
    );
}

export default MemberPlans;