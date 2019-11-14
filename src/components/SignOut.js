import React from 'react';
import {withFirebase} from '../authentication';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const SignOutButton = ({firebase}) => (
  <Button 
onClick={firebase.doSignOut}
variant="contained"
color="secondary"
className={useStyles.button}
startIcon={<ExitToAppIcon />}
>Sign out
</Button>
);

export default withFirebase(SignOutButton);//put signout button to navigator