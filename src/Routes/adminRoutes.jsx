import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../admin/AdminDashboard';
import UserManagement from '../admin/UserManagement/UserManagement';
import TicketManagement from '../admin/TicketManagement/TicketManagement';
import EventManagement from '../admin/EventManagement/EventManagement';
import Settings from '../admin/Settings';
import EditForm from '../admin/UserManagement/EditForm';
import TicketEditForm from '../admin/TicketManagement/TicketEditForm';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const AdminRoutes = () => {
  return (
    <ThemeProvider theme={darkTheme}>
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/users" element={<UserManagement />} />
      <Route path="/users/:id" element={<EditForm />} />
      <Route path="/user/create-user" element={<EditForm/>} />
      {/* <Route path="/create-user" element={<EditForm/>} /> */}
      <Route path="/tickets" element={<TicketManagement />} />
      <Route path="/tickets/:id" element={<TicketEditForm />} />
      <Route path="/ticket/create-ticket" element={<TicketEditForm/>} />

      <Route path="/settings" element={<Settings />} />
      <Route path="/events" element={<EventManagement />} />
    </Routes>
    </ThemeProvider>
  );
};

export default AdminRoutes;
