import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import Button from "@material-ui/core/Button";
import AddTraining from './AddTraining';
import { Snackbar } from '@material-ui/core';

export default function CustomerList () {
    const[customers, setCustomers] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = useState(""); 

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content) )
        .catch(err => console.error(err))
    };
    const saveCustomer = (newCustomer) => {
        fetch("https://customerrest.herokuapp.com/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCustomer)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        .then(res => setMessage('Customer saved and added!'))
    };
    const saveTraining = (newTraining) => {
        fetch("https://customerrest.herokuapp.com/api/trainings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTraining)
        })
        .then(res => fetchData())
        .catch(err => console.error(err))
        .then(res => setMessage('Training saved and added!'))
    };
    const editCustomer = (link, editedCustomer) => {
        fetch(link, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedCustomer)
        })
        .then(res => fetchData())
        .then(res => setMessage('Customer edited!'))
        .catch(err => console.error(err));
        console.log(link); 
    };
    const deleteCustomer = customerLink => {
        if(window.confirm('Are you sure?')) {
        fetch(customerLink, { method: "DELETE" })
        .then(res => fetchData())
        .then(res => setOpen(true)) 
        .then(res => setMessage('Car deleted!'))
        .catch(err=> console.error(err));
        console.log(customerLink); 
        }
    };
    //Snackbar functions
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

    const columns = [
        { Header: 'Firstname', accessor: 'firstname'},
        { Header: 'Lastname', accessor: 'lastname'},
        { Header: 'Street-address', accessor: 'streetaddress'},
        { Header: 'Postcode', accessor: 'postcode'},
        { Header: 'City', accessor: 'city'},
        { Header: 'Email', accessor: 'email'},
        { Header: 'Phone', accessor: 'phone'},
        { Header: 'Edit', accessor: 'links[0].href',
          Cell: ({value, row}) => <EditCustomer editCustomer={editCustomer} link={value} clickedCustomer={row}/>},
        { Header: 'Add trainings', accessor: 'links[0].href',
          Cell: ({value, row}) => <AddTraining saveTraining={saveTraining} link={value} clickedCustomer={row}/>},
        //delete, Value is Accessor
        { Header: "Delete", accessor: 'links[0].href', width: 100,
          Cell: ({value}) => <Button variant="contained" size= "small" color="secondary" onClick={() => deleteCustomer(value)}>Delete</Button>
      },
    ]

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <ReactTable 
              data={customers} 
              columns={columns}
              filterable={true} 
              sortable={true}/> 
             <Snackbar
              open={open}
              autoHideDuration= {3000}
              onClose={handleClose}
              message={message}/>


        </div>

    );
}