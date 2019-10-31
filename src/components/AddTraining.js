import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";


export default function AddTraining(props) {
    const [open, setOpen] = useState(false); 
    const [training, setTraining] = useState(
        {date: '', duration: '', activity: '', customer: ''}
    )
    const handleClickOpen = () => {
        setOpen(true);
        setTraining({date:'', duration:'', activity: '', customer: props.link});
        //try to find link of the customer, can use: props.clickedCustomer._original.links[0].href
        //in which "link" or "clickedCustomer" are passed from Cell in table in CustomerList
        console.log(props.clickedCustomer);
      };
    const handleClose = () => {
        setOpen(false);
      };
    const handleInputChange = (event) => {
        setTraining({...training, [event.target.name]: event.target.value});
      };
    const addTraining = () => {
        const newTraining = 
        {date: new Date(training.date),
        duration: training.duration,
        activity: training.activity,
        customer: training.customer
        }
        props.saveTraining(newTraining);
        handleClose(); 
      }

    return (
        <div style={{margin:10}}>
        <div>
         <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Training
         </Button>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill training information here
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            name="date"
            value= {training.date}
            onChange={e => handleInputChange(e)} 
            label="Date"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="duration"
            value= {training.duration}
            onChange={e => handleInputChange(e)} 
            label="Duration"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="activity"
            value= {training.activity}
            onChange={e => handleInputChange(e)} 
            label="Activity"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="customer"
            value= {training.customer}
            onChange={e => handleInputChange(e)} 
            label="Customer"
            fullWidth
          />
           </DialogContent>

         <DialogActions>
        <Button onClick={handleClose} color="primary"> Cancel</Button>
        <Button onClick={addTraining} color="primary">Save</Button>
        </DialogActions>
     </Dialog>
        </div>
        </div>
    )

}
