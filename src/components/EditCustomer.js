import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function EditCustomer(props) {
    const [open, setOpen] = useState(false); 
    const [customer, setCustomer] = useState(
        {firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''}
    )
    const handleClickOpen = () => {
        setOpen(true);
        setCustomer({
            firstname: props.clickedCustomer.firstname,
            lastname: props.clickedCustomer.lastname,
            streetaddress: props.clickedCustomer.streetaddress,
            postcode: props.clickedCustomer.postcode,
            city: props.clickedCustomer.city,
            email: props.clickedCustomer.email,
            phone: props.clickedCustomer.phone});
      };
    const handleInputChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
      };
    const editCustomer = () => {
        const newCustomer = {
            firstname: customer.firstname,
            lastname: customer.lastname,
            streetaddress: customer.streetaddress,
            postcode: customer.postcode,
            city: customer.city,
            email: customer.email,
            phone: customer.phone
        }
        props.editCustomer(props.link, newCustomer);
        handleClose(); 
    }
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
        <div style={{margin:10}}>
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
         Edit 
        </Button>
    
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit customer information here
            </DialogContentText>

            <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value= {customer.firstname}
            onChange={e => handleInputChange(e)} 
            label="Firstname"
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            name="lastname"
            value= {customer.lastname}
            onChange={e => handleInputChange(e)} 
            label="Lastname"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="streetaddress"
            value= {customer.streetaddress}
            onChange={e => handleInputChange(e)} 
            label="Street Address"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="postcode"
            value= {customer.postcode}
            onChange={e => handleInputChange(e)} 
            label="Postcode"
            type = "number"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="city"
            value= {customer.city}
            onChange={e => handleInputChange(e)} 
            label="City"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="email"
            value= {customer.email}
            onChange={e => handleInputChange(e)} 
            label="Email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="phone"
            value= {customer.phone}
            onChange={e => handleInputChange(e)} 
            label="Phone"
            fullWidth
          />

</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={editCustomer} color="primary">
          Save
        </Button>

      </DialogActions>
    </Dialog>
  </div>
  </div>
)
}
