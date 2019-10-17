import React from 'react';
import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList'; 
import { BrowserRouter as BrowserRouter, Route, Switch } from "react-router-dom"; 
import Navigator from './layouts/Navigator';
import"bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">Personal Training App</header>
  <BrowserRouter>
    <div>
      <Navigator />

      <Switch>
      <Route path="/" exact component={CustomerList} />
      <Route path="/training" component={TrainingList} />
      <Route render={() => <h1>Page not found</h1>} />
      </Switch>
      
    </div>
  </BrowserRouter>
  </div>
  );
}

export default App;
