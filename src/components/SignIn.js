import React, { Component } from 'react';
import { compose } from 'recompose';

import { SignUpLink } from '../components/SignUp';
import { withFirebase } from '../authentication';

import Grid from '@material-ui/core/Grid';
import {Link, withRouter} from 'react-router-dom'; 
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {PasswordForgetLink} from '../components/PasswordForget'; 
import {PasswordChangeLink} from '../components/PasswordChange'; 



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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignInPage = () => (
  <div>
    <SignInForm />
    <SignUpLink />
    <PasswordForgetLink/>
    <PasswordChangeLink/>
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={useStyles.paper}>
       
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={useStyles.form} noValidate onSubmit={this.onSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoFocus
            name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            name="password" value={password} onChange={this.onChange} type="password" placeholder="Password"  
          />
           <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
           <Button
            disabled={isInvalid}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
          > Sign In
          </Button>
      

          {error && <p>{error.message}</p>}

        </form>
      </div>
      </Container>
    );
  }
}
const SignInLink = () => (
    <Link className="nav-link" to="/signin/">
      Already have an account? Sign in
    </Link>
)

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export { SignInForm, SignUpLink, SignInLink };