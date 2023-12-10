import { useSearchParams } from "react-router-dom";
import GatekeeperNavbar from "./components/navbar";

import Visitorentry from "./components/visitorentry";
import Visitorexit from "./components/visitorexit";
import AddVisitorLogs from "./components/addvisitorlog";
import AddGateUpdates from "./components/gateupdates";
import GetVisistorLogs from "./components/getvisitorlogs";

import AddCourierLogs from "./components/courierlog";
import CourierExit from "./components/courierexit";

function GatekeeperDashboard(){
    const [param] = useSearchParams();
    const process = () => {
        if (!param.get('page')) {
          return (
            <div>
              <h1>Gatekeeper Dashboard</h1>
            </div>
          );
        }
    
        if (param.get('page') === 'visitorentry') {
          return (
            <div>
              <Visitorentry />
            </div>
          );
        }
        if (param.get('page') === 'addvisitorlog') {
          return (
            <div>
              <AddVisitorLogs />
            </div>
          );
        }
        if (param.get('page') === 'gateupdates') {
          return (
            <div>
              <AddGateUpdates />
            </div>
          );
        }
        if (param.get('page') === 'getvisitorlogs') {
          return (
            <div>
              <GetVisistorLogs />
            </div>
          );
        }
        if (param.get('page') === 'visitorexit') {
          return (
            <div>
              <Visitorexit />
            </div>
          );
        }
    
        if (param.get('page') === 'courierlog') {
          return (
            <div>
              <AddCourierLogs />
            </div>
          );
        }
        if (param.get('page') === 'courierexit') {
          return (
            <div>
              <CourierExit />
            </div>
          );
        }
    };
        return (
            <div>
              <GatekeeperNavbar />
              {process()}
            </div>
          );
    
}
export default GatekeeperDashboard;