import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { dependencies, container } from "../inversify.config";
import { ISetDispatch , IGetState } from "../interface";

export type RootState = {
  AuthSlice: {
    loading: boolean;
  };
};
const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1),
    width: '300px',
  },
  button: {
    margin: theme.spacing(2, 0),
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loading } = useSelector((state: RootState) => state.AuthSlice);
  const classes = useStyles();
  const dispatcher = container.get<ISetDispatch>(dependencies.ISetDispatch);
  const getter = container.get<IGetState>(dependencies.IGetState);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatcher.setDispatch(username , password)
    setUsername('');
    setPassword('');
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        type="text"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        className={classes.textField}
        type="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
      >
        {loading ? (
          <CircularProgress className={classes.progress} size={24} color="inherit" />
        ) : (
          'Log In'
        )}
      </Button>
      <h2>{getter.getState('AuthSlice' , 'error')}</h2>
    </form>
  );
};

export default LoginPage;
