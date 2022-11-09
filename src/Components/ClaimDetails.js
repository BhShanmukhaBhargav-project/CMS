import axios from 'axios';
import React, { useState } from 'react';
import './ClaimDetails.css';
import { useNavigate } from 'react-router-dom';



function ClaimDetails() {
    function Approval() {
        alert("Approved!!")
    }
    function Denied() {
        alert("Denied!!")
    }
    const navigate = useNavigate();
    const [claim, setclaim] = useState([])
    const getclaim = () => {
        axios.get("http://localhost:4094/api/Claim").then(
            (response) => {
                console.log(response);
                setclaim(response.data)
            }
        )
    }
    return (
        <div ><h1>Claim Details</h1>{
            claim.map(value => {
                return (
                    <div className='inner1'>
                        <ul className='myUL1'>
                            <li><label>ClaimId</label>:<span>{value.cId}</span></li>
                            <li><label>Claim Amount</label>:<span>{value.amount}</span></li>
                            <li><label>ClaimDate</label>:<span>{value.claimDate}</span></li>
                            <div className='Align'>
                                <button onClick={Approval} className='btn btn-success16'>Approve</button>
                                <button onClick={Denied} className='btn btn-success17'>Deny</button>
                            </div>
                        </ul>
                    </div>
                )
            })
        }
            <div className='logout'>
                <button onClick={() => navigate('/')} className='btn btn-success3'>Logout</button>
            </div>
            <button className='btn btn-success4' onClick={getclaim}> GetAllClaims</button>
        </div >
    );
}

export default ClaimDetails;