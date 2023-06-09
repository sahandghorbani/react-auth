import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth:'40rem',
    margin:' 0 auto' ,
    padding:'1rem' ,
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
  error: {
    color: 'red',
    alignSelf: 'flex-start',
    marginTop: 0,
  },
  'input': {
    display: 'block',
    padding: '10px',
    width:'100%',
    background: 'transparent',
    color:'black',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '10px',
  },
}));

export default useStyles;
