import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

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
        .catch(err => console.error(err))
    };

    const columns = [
        { Header: 'Firstname', accessor: 'firstname'},
        { Header: 'Lastname', accessor: 'lastname'},
        { Header: 'Street-address', accessor: 'streetaddress'},
        { Header: 'Postcode', accessor: 'postcode'},
        { Header: 'City', accessor: 'city'},
        { Header: 'Email', accessor: 'email'},
        { Header: 'Phone', accessor: 'phone'},
        { accessor: 'links[0].href',
          Cell: ({value, row}) => <EditCustomer editCustomer={editCustomer} link={value} clickedCustomer={row}/>},
    ]

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <ReactTable 
              data={customers} 
              columns={columns}
              filterable={true} 
              sortable={true}/> 


        </div>

    );
}