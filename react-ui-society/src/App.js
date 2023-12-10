import { Route, Routes } from 'react-router';
import './App.css';

import AdminDashboard from './components/Admin/dashboard';
import LoginComponent from './components/auth/login';
import UserComponent from './components/Admin/components/adduser';
import AddNotice from './components/Admin/components/notices';
import AddEvent from './components/Admin/components/notices';
import Profile from './components/Admin/components/profile';
//import Home from './components/auth/home';
import UserDashboard from './components/resident/dashboard';
import BillComponent from './components/resident/components/bill';
import Signup from './components/auth/signup';
import HelpDeskForm from './components/resident/components/helpdesk';
import About from './components/auth/about';
import Contact from './components/auth/contact';
//import HomeComponent from './components/auth/home';
import Home from './components/auth/home';
import GatekeeperDashboard from './components/gatekeeper/dashboard';
import GateUpdates from './components/resident/components/gateupdates';
//import GateUpdates from './components/gatekeeper/components/gateupdates';
import PostBill from './components/Admin/components/postbills';
import GetBill from './components/Admin/components/getbills';
import PendingBills from './components/Admin/components/pendingbills';
import DeleteUser from './components/Admin/components/deleteuser';
import UpdateUser from './components/Admin/components/updateuser';
import UpdateTicket from './components/Admin/components/updateticket';
import ResidentProfile from './components/resident/components/profile';
import VisitorLogs from './components/resident/components/visitorlog';

import AddVisitorLogs from './components/gatekeeper/components/addvisitorlog';
import CourierLogs from './components/resident/components/courierlog';
import AddCourierLogs from './components/gatekeeper/components/courierlog';
import Updatebill from './components/Admin/components/updatebills';
import AddGateUpdates from './components/gatekeeper/components/gateupdates';
import GetVisistorLogs from './components/gatekeeper/components/getvisitorlogs';
import GetVisitorLogs from './components/gatekeeper/components/getvisitorlogs';
import Visitorentry from './components/gatekeeper/components/visitorentry';
import VisitorExit from './components/gatekeeper/components/visitorexit';
import GetCourierLogs from './components/gatekeeper/components/getcourierlogs';
import GetTicket from './components/resident/components/viewresponse';
import CourierExit from './components/gatekeeper/components/courierexit';
import HelpDeskComponent from './components/Admin/components/redux/HelpDeskComponent';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
       {/* <Route path="/" element={<HelpDeskComponent />} />*/}
        <Route path="/home" element={<Home />} />
        <Route path="/postbills" element={<PostBill />} />
        <Route path="/bill" element={<GetBill/>} />
        <Route path="/user" element={<UserComponent />} />
        <Route path="/addnotice" element={<AddNotice />} />
        <Route path="/addevent" element={<AddEvent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/gatekeeper/dashboard" element={<GatekeeperDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile" element={<ResidentProfile />} />
        <Route path="/helpdesk" element={<HelpDeskForm />} />
        <Route path="/gateupdates" element={<GateUpdates/>} />
        <Route path="/gateupdates" element={<AddGateUpdates/>} />
        <Route path="/postbills" element={<PostBill />} />
        <Route path="/getbills" element={<GetBill />} />
        <Route path="/pendingbills" element={<PendingBills />} />
        <Route path="/deleteuser" element={<DeleteUser />} />
        <Route path="/updateuser" element={<UpdateUser />} />
        <Route path="/updateticket" element={<UpdateTicket />} />
        <Route path="/visitorlog" element={<VisitorLogs />} />
        <Route path="/courierlog" element={<CourierLogs />} />
        <Route path="/courierlog" element={<AddCourierLogs />} />
        <Route path="/getcourierlogs" element={<GetCourierLogs />} />
        <Route path="/addvisitorlog" element={<AddVisitorLogs/>} />
        <Route path="/updatebills" element={<Updatebill/>} />
        <Route path="/addvisitorlog" element={<AddVisitorLogs/>}/>
        <Route path="/getvisitorlogs" element={<GetVisitorLogs/>}/>
        <Route path="/visitorentry" element={<Visitorentry/>}/>
        <Route path="/visitorexit" element={<VisitorExit/>}/>
        <Route path="/courierexit" element={<CourierExit/>}/>
        <Route path="/gateupdates" element={<AddGateUpdates/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/viewresponse" element={<GetTicket />} />
       
      </Routes>
    </div>
  );
}

export default App;