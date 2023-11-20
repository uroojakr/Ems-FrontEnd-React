import React, { useState, useEffect, useCallback } from 'react';
import { useTable } from 'react-table';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Typography, Button } from '@mui/material';
import CustomButton from '../../component/Button';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../apis/GetData';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { deleteData } from '../../apis/Deletedata';

const UserManagementTable = () => {
const navigate = useNavigate();
const [users, setUsers] = useState([]);

const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData('api/User');
        setUsers(response);
      } catch (error) {
        console.error('API GET request failed:', error);
      }
    };
    fetchData();
  }, []);

const handleDelete = useCallback(async (row) => {
  const userId = row.original.id;
  const newdata = users.filter(u => u.id !== Number(userId));
  setUsers(newdata);
  const res = await deleteData(`api/User/${userId}`);
  console.log(res);
}, [users]);

const handleEdit = useCallback((row) => {
    const userId = row.original.id;
    navigate(`/admin/users/${userId}`);
  }, [navigate]);

const handleCreate = () => {
    navigate('/admin/user/create-user'); 
  };

const columns = React.useMemo(
    () => [
      {
        Header: 'User Name',
        accessor: 'userName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Password',
        accessor: 'password',
      },
      {
        Header: 'User Type',
        accessor: 'userType',
      },
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

const data = React.useMemo(() => users, [users]);
const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
    <div className="user-management-table" >
      <Typography variant="h4" gutterBottom>
        User Data
      </Typography>
      <Button variant="contained" onClick={handleCreate} style={{ backgroundColor: 'green', color: 'white', marginBottom: '20px' }}>
        Create User
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

export default UserManagementTable;
