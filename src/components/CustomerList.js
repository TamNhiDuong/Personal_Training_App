import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'; 

export default function CustomerList () {
    const[customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content) )
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
    ]

    return (
        <div>
            <ReactTable 
              data={customers} 
              columns={columns}
              filterable={true} 
              sortable={true}/> 


        </div>

    );
}