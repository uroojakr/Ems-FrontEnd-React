import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../apis/GetData';
import { postData } from '../../apis/Postdata';
import { putData } from '../../apis/Updatedata';
import CustomTextField from '../../component/Input';
import CustomButton from '../../component/Button';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';


const theme = createTheme({
    palette: {
      mode: 'dark',
      background: {
        default: 'black'
      }
    },
  });

const EditForm = () => {
    const { id } = useParams();

    const [userExists, setUserExists] = useState(true);
    const [formData, setFormData] = useState({
        userName: '',
        email: '',
        password: '',
        userType: 0
    });

    const isEdit = !!id;

    const getUserbyId = useCallback(async (userId) => {
        try {
            const res = await getData(`api/User/${userId}`);
            if (!res || res.status === 404) {
                console.log('User not found, navigate to creating a new user.');
                setUserExists(false);
            } else {
                setUserExists(true);
                setFormData({
                    userName: res.userName,
                    email: res.email,
                    password: res.password,
                    userType: res.userType
                });
            }
        } catch (error) {
            console.error('API GET request failed:', error);
            console.log('User not found, navigate to creating a new user.');
            setUserExists(false);
        }
    }, [setFormData]);

    const createUser = async () => {
        try {
            const res = await postData('api/User', formData);
            console.log('User Created:', res);
            // navigate('/admin/users');
        } catch (error) {
            console.error('API POST request failed:', error);
        }
    };

    const updateUser = async () => {
        try {
            await putData(`api/User/${id}`, formData);
            console.log('User Updated');
        } catch (error) {
            console.error('API PUT request failed:', error);
        }
    };

    useEffect(() => {
        if (isEdit && id) {
            getUserbyId(id);
        }
    }, [getUserbyId, id, isEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userType') {
            setFormData({ ...formData, userType: Number(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await updateUser();
            } else {
                await createUser();
            }
        } catch (error) {
            console.error('API request failed in submit:', error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <Box
    className="container"
    sx={{
        background: '#b66d92',
        padding: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
        width: '20%',
        margin: 'auto',
        marginTop: '50px',
    }}
>
                <h1 style={{'color':'white', 'fontFamily':'monospace'}}>{isEdit ? 'Update' : 'Create'} User</h1>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                <CustomTextField
                    label="User Name"
                    value={formData.userName}
                    onChange={handleInputChange}
                    name="userName"
                    sx={{ marginBottom: '10px' }}
                />
                <CustomTextField
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    name="email"
                    sx={{ marginBottom: '10px' }}
                />
                <CustomTextField
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    name="password"
                    sx={{ marginBottom: '10px' }}
                />
                <CustomTextField
                    label="User Type"
                    value={formData.userType}
                    onChange={handleInputChange}
                    name="userType"
                    sx={{ marginBottom: '10px' }}
                />
                <CustomButton
                    style={{ background: '#444', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}
                    onClick={handleSubmit}
                    label={userExists ? 'Save' : 'Create'}
                />
                </div>
                </Box>
                </ThemeProvider>
    );
};

export default EditForm;
