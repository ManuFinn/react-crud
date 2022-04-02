import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useParams } from 'react-router-dom';


export default function UserUpdate() {
  const { id } = useParams();
  useEffect(() => {
    fetch("https://www.mecallapi.com/api/users/"+id)
      .then(res => res.json())
      .then(
        (result) => {
          setFname(result.user.fname)
          setLname(result.user.lname)
          setUsername(result.user.username)
          setEmail(result.user.email)
          setAvatar(result.user.avatar)
        }
      )
  }, [id])

  const handleSubmit = event => {
    event.preventDefault();
    var data = {
      'id': id,
      'fname': fname,
      'lname': lname,
      'username': username,
      'email': email,
      'avatar': avatar,
    }
    fetch('https://www.mecallapi.com/api/users/update', {
      method: 'PUT',
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
          window.location.href = '/';
        }
      }
    )
  }

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  return (
    <Container maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Editar Usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="E-mail"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Editar
          </Button>
        </form>
      </div>
    </Container>
  );
}