import React, { useEffect, useState } from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";



export default function UserList() {
  
  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet()
  }, [])
  
  const UsersGet = () => {
    fetch("https://www.mecallapi.com/api/users")
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result)
        }
      )
  }

  const UpdateUser = id => {
    window.location = '/update/'+id
  }

  const UserDelete = id => {
    var data = {
      'id': id
    }
    fetch('https://www.mecallapi.com/api/users/delete', {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          UsersGet();
        }
      }
    )
  }

  return (
    <div >
      <Container  maxWidth="lg">    
        <Paper >
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Usuarios
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  Nuevo Usuario
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="right">Id</TableCell>
                <TableCell align="left">Nombre</TableCell>
                <TableCell align="left">Apellido</TableCell>
                <TableCell align="left">E-mail</TableCell>
                <TableCell align="center">Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="right">{user.id}</TableCell>
                  <TableCell align="left">{user.fname}</TableCell>
                  <TableCell align="left">{user.lname}</TableCell>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary">
                      <Button onClick={() => UpdateUser(user.id)}>Editar</Button>
                      <Button onClick={() => UserDelete(user.id)}>Eliminar</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    
  );
}