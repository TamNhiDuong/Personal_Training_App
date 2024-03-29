import React from 'react';

import AuthUserContext from './context'; 
import {withFirebase} from '../authentication'; 
const withAuthencication = Component => {
    class WithAuthencication extends React.Component {
        constructor(props) {
            super(props);
        //using local state to store user's session
            this.state = {
              authUser: null,
            }; 
          }

          componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
              authUser ? this.setState({authUser}) : this.setState({authUser: null}); 
            },
            ); 
          }

          componentWillUnmount() {
            this.listener(); 
          }
        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                         <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }
    return withFirebase(WithAuthencication); 
}; 
export default withAuthencication; 