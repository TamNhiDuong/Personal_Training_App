import React, {Component} from 'react';
import {withFirebase} from '../authentication';


class AdminPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            users: [],
        };
    }
    //Retrieve user from DB
    componentDidMount() {
        this.setState({ loading: true });
        // The on() method registers a continuous listener that triggers every time something has changed, 
        //the once() method registers a listener that would be called only once.
    
        this.props.firebase.users().on('value', snapshot => {
          const usersObject = snapshot.val();
          console.log(usersObject); 
    
          const usersList = Object.keys(usersObject).map(key => ({
            ...usersObject[key],
            uid: key,
          }));
    
          this.setState({
            users: usersList,
            loading: false,
          });
        });
      }
      
    componentWillUnmount() {
        this.props.firebase.users().off(); 
    }
    render(){
        const {users, loading} = this.state;
        return(
            <div>
                <h1>Retrieve user data from Firebase Realtime Database</h1>
                {loading && <div>Loading...</div>}
                <UserList users={users} /> 
            </div>
        );
    }
}
//render list of users to a child Component
const UserList = ({users}) => (
    <ul>
        {users.map(user => (
            <li key={user.uid}>
            <span>
                <strong> ID: </strong> {user.uid}
            </span>
            <span>
                <strong> Email: </strong> {user.email}
            </span>
            <span>
                <strong> Username: </strong> {user.username}
            </span>
            </li> 
        ))
        }

    </ul>
);


export default withFirebase(AdminPage); 
