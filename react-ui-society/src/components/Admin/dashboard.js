import React from 'react';
import { useSearchParams } from 'react-router-dom';
import NavbarComponent from './components/navbar';
import Bills from './components/bills';
import Events from './components/events';
import Helpdesk from './components/helpdesk';
import Notices from './components/notices';

import Profile from './components/profile';

import UserComponent from './components/adduser';

function AdminDashboard() {
  const [param] = useSearchParams();

  const process = () => {
    if (!param.get('page')) {
      return (
        <div>
          <h1>Admin Dashboard</h1>
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
    if (param.get('page') === 'adduser') {
      return (
        <div>
          <UserComponent />
        </div>
      );
    }

   
  };

  return (
    <div>
      <NavbarComponent />
      {process()}
    </div>
  );
}

export default AdminDashboard;
