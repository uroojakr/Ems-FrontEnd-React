import React, { useEffect, useState } from 'react';
import DrawerAppBar from '../component/Appbar';
import '../style/AdminDashboard.css';
import CustomButton from '../component/Button';

const AdminDashboard = () => {
  const navItems = [
    { name: 'Users', path: '/admin/users' },
    { name: 'Tickets', path: '/admin/tickets' },
    { name: 'Events', path: '/admin/events' },
    { name: 'Settings', path: '/admin/settings' },
  ];
  
  const [eventCount, setEventCount] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);
  const [organizerCount, setOrganizerCount] = useState(0);

  // Simulating fetching data for events, tickets, and organizers
  useEffect(() => {
    const fetchEventCount = () => {
      const count = 10;
      setEventCount(count);
    };
    const fetchTicketCount = () => {
      const count = 50;
      setTicketCount(count);
    };
    const fetchOrganizerCount = () => {
      const count = 5;
      setOrganizerCount(count);
    };
    fetchEventCount();
    fetchTicketCount();
    fetchOrganizerCount();
  }, []);

  const title = 'Admin Dashboard';

  return (
    <>
      <div>
        <DrawerAppBar navItems={navItems} title={title} />
      </div>

      <div className="dashboard-tiles">
        <div className="dashboard-tile">
          <h3>Events</h3>
          <p>Total: {eventCount}</p>
          <p>Event Name: Event 1</p>
          <p>Tickets Sold: 100</p>
          <p>Organizer ID: 123</p>
          <CustomButton variant="contained" label='View' href="/admin/events"/>
        </div>

        <div className="dashboard-tile">
          <h3>Tickets</h3>
          <p>Total: {ticketCount}</p>
          <CustomButton variant="contained" label='View' href="/admin/tickets"/>
        </div>

        <div className="dashboard-tile">
          <h3>Organizers</h3>
          <p>Total: {organizerCount}</p>
          <CustomButton variant="contained" label='View' href="/admin/organizers"/>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
