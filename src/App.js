import React, {Component} from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList'; 
import { BrowserRouter as BrowserRouter, Route, Switch } from "react-router-dom"; 
import Navigation from './layouts/Navigation';
import"bootstrap/dist/css/bootstrap.min.css";
import EventCalendar from './components/EventCalendar';
import HomePage from './components/HomePage';
import PasswordChange from './components/PasswordChange';
import PasswordForget from './components/PasswordForget';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp'; 
import {withFirebase} from '../src/authentication'; 
import SignOutButton from '../src/components/SignOut'; 


class App extends Component {
  constructor(props) {
    super(props);
//using local state to store user's session
    this.state = {
      authUser: null,
    }; 
  }
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.setState({authUser}) : this.setState({authUser: null}); 
    },
    ); 
  }
  componentWillUnmount() {
    this.listener(); 
  }

  render() {
    return (
      <div className="App">
        <header id= 'content' className="App-header">
        <p id='main'>Personal Training App  </p>
        <span> <SignOutButton/> </span>
       </header> 
    <BrowserRouter>
      <div>
        <Navigation authUser={this.state.authUser}/>
  
        <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/customers" component={CustomerList} />
        <Route path="/training" component={TrainingList} />
        <Route path="/calendar" component={EventCalendar} />
        <Route path="/passwordchange" component={PasswordChange} />
        <Route path="/passwordforget" component={PasswordForget} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signout" component={SignOut} />
        <Route path="/signup" component={SignUp} />
        <Route render={() => <h1>Page not found</h1>} />
        </Switch>
        
      </div>
    </BrowserRouter>
    </div>
    );
  }
  }
  

export default withFirebase(App);
