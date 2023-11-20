import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from './AdminLogin';
import AdminRoutes from './Routes/adminRoutes';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import AdminLogin from './AdminLoginPage';
import Homepage from './HomePage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
 
const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
    </ThemeProvider>
  );
};

export default App;
