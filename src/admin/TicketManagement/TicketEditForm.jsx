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

const TicketEditForm = () => {
    const { id } = useParams();

    const [ticketExists, setTicketExists] = useState(true);
    const [formData, setFormData] = useState({
        userId: 0,
        eventId: 0
    });

    const isEdit = !!id;

    const getTicketbyId = useCallback(async (ticketId) => {
        try {
            const res = await getData(`api/Ticket/${ticketId}`);
            if (!res || res.status === 404) {
                console.log('Ticket not found, navigate to creating a new Ticket.');
                setTicketExists(false);
            } else {
                setTicketExists(true);
                setFormData({
                    userId: res.userId,
                    eventId: res.eventId,
                });
            }
        } catch (error) {
            console.error('API GET request failed:', error);
            console.log('Ticket not found, navigate to creating a new Ticket.');
            setTicketExists(false);
        }
    }, [setFormData]);

    const createTicket = async () => {
        try {
            const res = await postData('api/Ticket', formData);
            console.log('Ticket Created:', res);
            // navigate('/admin/users');
        } catch (error) {
            console.error('API POST request failed:', error);
        }
    };

    const updateTicket = async () => {
        try {
            await putData(`api/Ticket/${id}`, formData);
            console.log('Ticket Updated');
        } catch (error) {
            console.error('API PUT request failed:', error);
        }
    };

    useEffect(() => {
        if (isEdit && id) {
            getTicketbyId(id);
        }
    }, [getTicketbyId, id, isEdit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'userId' || name === 'eventId') {
            setFormData({ ...formData, [name]: Number(value) });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        try {
            if (isEdit) {
                await updateTicket();
            } else {
                await createTicket();
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
                    label="User Id"
                    value={formData.userId}
                    onChange={handleInputChange}
                    name="userId"
                    sx={{ marginBottom: '10px' }}
                />
                <CustomTextField
                    label="Event Id"
                    value={formData.eventId}
                    onChange={handleInputChange}
                    name="eventId"
                    sx={{ marginBottom: '10px' }}
                />
                <CustomButton
                    style={{ background: '#444', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px' }}
                    onClick={handleSubmit}
                    label={ticketExists ? 'Save' : 'Create'}
                />
                </div>
                </Box>
                </ThemeProvider>
    );
};

export default TicketEditForm;
