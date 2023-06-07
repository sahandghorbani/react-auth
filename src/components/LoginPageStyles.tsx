import { makeStyles } from '@material-ui/core/styles';

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

export default useStyles;
