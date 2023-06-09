import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import useStyles from './LoginPageStyles';
import { LoginFormProps } from '../types/ITypes';
import { useSelector } from 'react-redux';


type userForm = {
  username: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, message }) => {
  const succeed = useSelector((state: any) => state.AuthSlice.message);
  const { handleSubmit, register,reset, formState: { errors } } = useForm<userForm>();
  const classes = useStyles();
  const navigate = useNavigate();

  const onFormSubmit = (data:userForm) => {
    onSubmit(data.username, data.password);
  };
  useEffect(() => {
    if (succeed === 'registered' || succeed === 'Login successful') {
      reset();
      navigate('/')
    }
  }, [succeed, reset]);


  return (
    <form className={classes.form} onSubmit={handleSubmit(onFormSubmit)}>
      <input
        className={classes.input}
        type="text"
        placeholder="Username"
        {...register('username', { required: 'Username is required' })}
      />
      {errors.username && <p className={classes.error}>{errors.username.message}</p>}

      <input
        className={classes.input}
        type="password"
        placeholder="Password"
        {...register('password', { required: 'Password is required' })}
      />
      {errors.password && <p className={classes.error}>{errors.password.message}</p>}

      <Button
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        fullWidth
      >
        {loading ? (
          <CircularProgress className={classes.progress} size={24} color="inherit" />
        ) : (
          'Log In'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
