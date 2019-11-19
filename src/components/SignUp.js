import React, {Component} from 'react';
//Redirect user to authented page
import {Link, withRouter} from 'react-router-dom'; 
import {compose} from 'recompose'; 

import {withFirebase} from '../authentication'; 
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {SignInLink} from '../components/SignIn'; 


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

const SignUpPage = () => (
  <div>
    <SignUpForm/>
    <SignInLink/>
  </div>
);
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}
class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE}; 
  }

  onSubmit = event => {
    const {username, email, passwordOne} = this.state;
    this.props.firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
    //Create a user in Firebase realtime DB
    .then(authUser => {
      return this.props.firebase
      .user(authUser.user.uid)
      .set({
        username,
        email,
      }); 
    })
    .then(()=> {
      this.setState({...INITIAL_STATE});
      //Redirect to home
      this.props.history.push('/');
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
    
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;
    const isInvalid = passwordOne !== passwordTwo 
    || passwordOne === '' 
    || email === ''
    || username === ''; 

    
//using material UI template
    return (
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
                label="UserName"
                autoFocus
                name="username" value = {username} onChange = {this.onChange} type='text' placeholder = "Full name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                autoFocus
                name="email" value = {email} onChange = {this.onChange} type='text' placeholder = "Email"
              />
            </Grid>

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
    );
  }
}

const SignUpLink = () => (
  <p><Link className="nav-link" to="/signup/">Don't have an account? SignUp</Link> </p>
);

//Router package offer higher-order component=> router properties accessible in the props of component
//npm install recompose

const SignUpForm = compose (
  withRouter,
  withFirebase,
)(SignUpFormBase); 



export default SignUpPage;
export {SignUpForm, SignUpLink}; 