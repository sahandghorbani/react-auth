import React, { useState } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import useStyles from './LoginPageStyles';
import { LoginFormProps } from '../types/ITypes';



const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, error }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
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
      <h2>{error}</h2>
    </form>
  );
};

export default LoginForm;
