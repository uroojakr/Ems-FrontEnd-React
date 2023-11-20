import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTextField from './component/Input';
import CustomButton from './component/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import axios from './apis/ApiSetup';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  customPaper: {
    background: '#12121252', 
    
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    height: '260px',
    width: '400px',
    borderRadius: '10px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    color: '#062a2e', 
  },
  formGroup: {
    marginBottom: '16px',
  },
  formTitle: {
    marginBottom: '16px',
    color: 'white'
  },
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',

    background:'linear-gradient(to bottom, rgba(116, 52, 52, 0.7), rgba(255, 255, 255, 0.3));',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  
  
}));

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log('button clicked');
    e.preventDefault();

    const loginData = {
      username: formData.username,
      password: formData.password,
    };
    axios 
      .post('Auth/login', loginData)
      .then((response) => {
        if(response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/admin');
      }
      else
      {
        throw new Error('Authentication failed');
      }
      })
      .catch((error) => {
        console.error('Login Failed',error);
      })
  };

  return (
    <div className={classes.centerContainer}>
      <Paper elevation={3} className={`${classes.loginForm} ${classes.customPaper}`}>
        <Typography variant="h4" className={classes.formTitle}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Username TextField */}
          <div className={classes.formGroup}>
            <CustomTextField
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>
          {/* Password TextField */}
          <div className={classes.formGroup}>
            <CustomTextField
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              name="password"
              type="password"
            />
          </div>
          {/* forgot link */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <div style={{ flex: 1 }}>
              {/* Empty div to push the link to the right */}
            </div>
            <div>
              <Link to="/forgot-password" style={{ textDecoration: 'none', color: 'white' }}>
                Forgot Password?
              </Link>
            </div>
          </div>
          
          {/* Login Button */}
          <div className={classes.buttonContainer} style={{ marginTop: '10px' }}>
            <CustomButton label={'Login'} variant="contained" type="submit" color="secondary" style={{ color: 'white' }}  />
          </div>
        </form>
      </Paper>
    </div>
  );
}

export default LoginForm;