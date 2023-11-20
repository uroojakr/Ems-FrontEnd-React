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
    background: '#000000', 
    
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
          <div className={classes.formGroup}>
            <CustomTextField
              label="Username"
              value={formData.username}
              onChange={handleInputChange}
              name="username"
            />
          </div>

          <div className={classes.formGroup}>
            <CustomTextField
              label="Password"
              value={formData.password}
              onChange={handleInputChange}
              name="password"
              type="password"
            />
          </div>
          <div className={classes.buttonContainer}>
            <CustomButton label={'Login'} variant="contained" type="submit" />
          </div>
          <Link to="/Home" style={{ marginRight: '50px' }}>
        Go Back
      </Link>
      <Link to="/Reset-Password">Forgot Password?</Link>
        </form>
      </Paper>
    </div>
  );
}

export default LoginForm;

// import React from 'react';
// import { Paper, Typography, TextField, Button, makeStyles } from '@mui/material';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', // Gradient background
//     height: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   formContainer: {
//     background: 'rgba(255, 255, 255, 0.6)', // Glass background
//     padding: theme.spacing(2),
//     borderRadius: '8px',
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   input: {
//     marginBottom: theme.spacing(2),
//   },
//   button: {
//     backgroundColor: '#2196F3',
//     color: 'white',
//   },
// }));

// function LoginForm() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Paper elevation={3} className={classes.formContainer}>
//         <Typography variant="h4" gutterBottom>
//           Login
//         </Typography>
//         <form className={classes.form}>
//           <TextField
//             label="Username"
//             variant="outlined"
//             className={classes.input}
//           />
//           <TextField
//             label="Password"
//             variant="outlined"
//             type="password"
//             className={classes.input}
//           />
//           <Button variant="contained" className={classes.button}>
//             Login
//           </Button>
//         </form>
//       </Paper>
//     </div>
//   );
// }

// export default LoginForm;

