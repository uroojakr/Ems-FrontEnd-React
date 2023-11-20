import React from 'react';
import Sidebar from '../component/Sidebar'; 
import AdminDashboard from '../admin/AdminDashboard'; 
const AdminPage = () => {
  const adminItems = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      link: '/admin/dashboard',
    },
    {
      label: 'Events',
      icon: 'event',
      link: '/admin/events',
    },
    {
      label: 'Users',
      icon: 'people',
      link: '/admin/users',
    },
  ];

  return (
    <div>
      <Sidebar title="Admin" items={adminItems} />
      <AdminDashboard title="Admin Dashboard">
      </AdminDashboard>
    </div>
  );
};

export default AdminPage;

