import React, { useState, useEffect, useCallback } from 'react';
import { useTable } from 'react-table';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import CustomButton from '../../component/Button';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../apis/GetData';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deleteData } from '../../apis/Deletedata';

const TicketManagement = () => {
const navigate = useNavigate();
const [tickets, setTickets] = useState([]);

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('api/Ticket');
        if(response) {
        setTickets(response.tickets);
        console.log(response.tickets);
        }
      } catch (error) {
        console.error('API GET request failed:', error);
      }
    };
    fetchData();
  }, []);

  

const handleDelete = useCallback(async (row) => {
  const ticketId = row.original.id;
  const newdata = tickets.filter(t => t.id !== Number(ticketId));
  setTickets(newdata);
  const res = await deleteData(`api/Ticket/${ticketId}`);
  console.log(res);
}, [tickets]);

const handleEdit = useCallback((row) => {
    const ticketId = row.original.id;
    navigate(`/admin/tickets/${ticketId}`);
  }, [navigate]);

const handleCreate = () => {
    navigate('/admin/ticket/create-ticket'); 
  };

const columns = React.useMemo(
    () => [
      {
        Header: 'User Id',
        accessor: 'userId',
      },
      {
        Header: 'Event Id',
        accessor: 'eventId',
      },
    //   {
    //     Header: 'Events',
    //     accessor: 'Event', 
    //     Cell: ({ value }) => (
    //       <div>
    //         {value.map((event) => (
    //           <div key={event.Id}>{event.Title}</div>
    //         ))}
    //       </div>
    //     ),
    //   },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: ({ row }) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <CustomButton label='Edit' onClick={() => handleEdit(row)} style={{ backgroundColor: 'lightblue', color: 'white' }} />
            <CustomButton label='Delete' onClick={() => handleDelete(row)} style={{ backgroundColor: 'Red', color: 'white' }} />
          </div>
        ),
      },
    ],
    [handleEdit, handleDelete]
  );

  const data = React.useMemo(() => tickets, [tickets]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  console.log(data);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <div className="ticket-management-table" >
      <Typography variant="h4" gutterBottom>
        Tickets
      </Typography>
      <Button variant="contained" onClick={handleCreate} style={{ backgroundColor: 'green', color: 'white', marginBottom: '20px' }}>
        Create Ticket
      </Button>
      <TableContainer>
        <Table {...getTableProps()} style={{ background: 'black', color: 'black'}}>
          <TableHead>
            {headerGroups.map((headerGroup, headerIndex) => (
              <TableRow {...headerGroup.getHeaderGroupProps()} key={headerIndex}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <TableCell key={columnIndex}>{column.render('Header')}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()} key={rowIndex}>
                  {row.cells.map((cell, cellIndex) => {
                    return (
                      <TableCell key={cellIndex}>{cell.render('Cell')}</TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </ThemeProvider>
  );
};

export default TicketManagement;
