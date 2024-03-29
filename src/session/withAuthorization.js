import React from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose'; 

import AuthUserContext from './context'; 
import {withFirebase} from '../authentication';
import { tsConstructSignatureDeclaration } from '@babel/types';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!condition(authUser)) {
                        this.props.history.push('/signin/');
                    }
                },
            );
        }
        componentWillUnmount() {
            this.listener(); 
        }
        render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser =>
                    tsConstructSignatureDeclaration(authUser) ? <Component {...this.props} /> : null
                    }
                </AuthUserContext.Consumer>
            ); 
        }
        }
        return compose(
            withRouter,
            withFirebase,
        )(WithAuthorization); 
    };
    export default withAuthorization;
