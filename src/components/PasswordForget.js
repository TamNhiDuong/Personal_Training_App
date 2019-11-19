import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'; 

import {withFirebase} from '../authentication'; 
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const PasswordForget = () => (
  <div>
    <PasswordForgetForm/>
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
}

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}; 
  }

//send infor to API
  onSubmit = event => {
    const {email} = this.state;
    this.props.firebase
    .doPasswordReset(email)
    .then(() => {
      this.setState({...INITIAL_STATE});
    })
    .catch(error => {
      this.setState({error});
    });
    event.preventDefault();
  }; 

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value}); 
  };

  render() {
    const {email, error} = this.state;
    const isInvalid = email === '';
    return (
         <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={useStyles.paper}>

        <Typography component="h1" variant="h5">
          Forget password form 
        </Typography>

        <form className={useStyles.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address"
          />

          <Button
            disabled={isInvalid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
          > Reset my password
          </Button>
          </Grid>

          {error && <p>{error.message}</p>}
        </form>
        </div>
      </Container>
    )
  }
}
const PasswordForgetLink = () => (
  <p><Link className="nav-link" to="/passwordforget/">Forget password? Please fill form</Link> </p>
);

export default PasswordForget;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase); 
export {PasswordForgetForm, PasswordForgetLink}; 