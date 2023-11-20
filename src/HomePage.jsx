import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import gifImage from './images/hpbg.gif';
import DrawerAppBar from './component/Appbar'; 
import './style/HomePage.css';
import { useNavigate } from 'react-router-dom';
import CustomButton from './component/Button';

const HomePage = () => {
  const navigate = useNavigate();
  const gifStyle = {
    backgroundImage: `url(${gifImage})`,
    backgroundSize: 'fix',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
  };

  const buttonStyle = {
    margin: '20px',
  };

  const navItems = [
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
     <div className='glass-bg'>
    <DrawerAppBar navItems={navItems} title="Event Management System" />
    <div style={gifStyle}>
   
      <Container>
        {/* <Typography variant="h3" component="h1" gutterBottom className="custom-heading">
          Event Management System
        </Typography> */}
        <Typography variant="body1">
        <CustomButton label={'Login'} variant="contained" color="primary" style={buttonStyle} onClick={() => navigate('/login')}/>
        {/* implement register */ }
        <CustomButton label={'Register'} variant="contained" color="secondary" style={buttonStyle} onClick={() => navigate('/register')}/>
        </Typography>
      </Container>
    </div>
    </div>
    </>
  );
};

export default HomePage;
