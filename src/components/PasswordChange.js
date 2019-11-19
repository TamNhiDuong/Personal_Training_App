import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 

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

const PasswordChange = () => (
  <div>

  </div>
);

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
}
class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}; 
  }

  onSubmit = event => {
    const {passwordOne} = this.state;

    this.props.withFirebase
    .doPasswordUpdate(passwordOne)
    .then(() => {
      this.setState({...INITIAL_STATE});
    })
    .catch(error => {
      this.setState({error}); 
    });
    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value}); 
  }
  render(){
    const {passwordOne, passwordTwo, error} = this.state;
    const isInvalid = passwordOne !== passwordTwo || passwordOne === ''; 
    return (
      <div>
        <Container component="main" maxWidth="xs">
         <CssBaseline />
      <div className={useStyles.paper}>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <form className={useStyles.form} noValidate onSubmit={this.onSubmit}>
          <Grid container spacing={2}>

          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="password"
                autoFocus
                name="passwordOne" value = {passwordOne} onChange = {this.onChange} type='text' placeholder = "Password"
                />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="confirm Password"
                autoFocus
                name="passwordTwo" value = {passwordTwo} onChange = {this.onChange} type='text' placeholder = "Confirm password"
                />
            </Grid>

            <Button
            disable={isInvalid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
          >
            Sign Up
          </Button>

          {error && <p>{error.message}</p>}

          </Grid>
        </form>
        </div>
      </Container>

      </div>
    );
  }
}
const PasswordChangeLink = () => (
  <p><Link className="nav-link" to="/passwordChange/">Change password</Link> </p>
);

export {PasswordChangeLink};
export default withFirebase(PasswordChangeForm); 


