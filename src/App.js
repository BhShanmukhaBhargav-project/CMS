import './App.css';

import AddUser from './Components/AddUser';


import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import React from 'react';

import LoginUser from './Components/LoginUser';
import PlanDetails from './Components/PlanDetails';
import MemberPlans from './Components/MemberPlans';
import SubmitClaims from './Components/SubmitClaims';
import ClaimDetails from './Components/ClaimDetails';
import AddPlan from './Components/AddPlan';



export const UserContext = React.createContext();

function App() {



  return (

    <div className="App">

      {/* <AddUser />
        <LoginUser/> 
        <PlanDetails/> */}

      <Router>
        <Routes>
          <Route exact path="/" element={<LoginUser />}></Route>
          <Route exact path="/Register" element={<AddUser />}></Route>
          <Route exact path="/Plans" element={<PlanDetails />}></Route>
          <Route exact path="/MemberPlans" element={<MemberPlans />}></Route>
          <Route exact path="/Claims" element={<SubmitClaims />}></Route>
          <Route exact path="/ClaimDetails" element={<ClaimDetails />}></Route>
          <Route exact path="/Addplan" element={<AddPlan />}></Route>
        </Routes>
      </Router>


    </div>

  );
}



export default App;
