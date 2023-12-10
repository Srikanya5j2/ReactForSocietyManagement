import React from 'react';
import { useSearchParams } from 'react-router-dom';

import Bills from './components/bill';
import Events from './components/event';
import Helpdesk from './components/helpdesk';
import Notices from './components/notice';

import Profile from './components/profile';

import Service from './components/homeservice';
import UserNavbar from './components/navbar';
import GetTicket from './components/viewresponse';

function UserDashboard() {
  const [param] = useSearchParams();

  const process = () => {
    if (!param.get('page')) {
      return (
        <div>
          <h1>User Dashboard</h1>
        </div>
      );
    }

    if (param.get('page') === 'bills') {
      return (
        <div>
          <Bills />
        </div>
      );
    }

    if (param.get('page') === 'events') {
      return (
        <div>
          <Events />
        </div>
      );
    }

    if (param.get('page') === 'helpdesk') {
      return (
        <div>
          <Helpdesk />
        </div>
      );
    }
    if (param.get('page') === 'viewresponse') {
      return (
        <div>
          <GetTicket />
        </div>
      );
    }

    if (param.get('page') === 'notices') {
      return (
        <div>
          <Notices />
        </div>
      );
    }


    if (param.get('page') === 'profile') {
      return (
        <div>
          <Profile />
        </div>
      );
    }
    if (param.get('page') === 'service') {
      return (
        <div>
          <Service />
        </div>
      );
    }

   
  };

  return (
    <div>
      <UserNavbar/>
      {process()}
    </div>
  );
  
}

export default UserDashboard;
