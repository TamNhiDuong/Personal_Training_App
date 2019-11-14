import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import Moment from "react-moment";
import Button from "@material-ui/core/Button";
import { isEmptyStatement } from '@babel/types';

export default function TrainingList () {
    const[trainings, setTrainings] = useState([]);
    const[message, setMessage] = useState(''); 

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.text())
        .then(text => text.length ? JSON.parse(text): null)
        .then(data => setTrainings(data))
        
        .catch(err => console.error(err))
    };
    const trainingLink = 'https://customerrest.herokuapp.com/api/trainings/';

    const deleteTraining = id => {
        if(window.confirm('Are you sure?')) {
            fetch(trainingLink + id, {method: "DELETE"})
            .then(res => fetchData())
            .then(res => setMessage('Training deleted!'))
            .catch(err => console.log(err)); 
        }
    }
   

    const columns = [
        { Header: 'Date', 
          accessor: 'date',
        Cell: row => {
            return <Moment format="DD.MM.YYYY - HH:MM">{row.value}</Moment>;
          }},
        { Header: 'Duration', accessor: 'duration'},
        { Header: 'Activity', accessor: 'activity'},
        { Header: 'Customer', accessor: 'customer',
      //Using inline condition to check null, because react cannot fetch null 
        Cell: ({ value }) => {
            return (
              <div>
                {value !== null && ( <span className="firstName">{value.firstname} </span>)}
                {value !== null && (<span className="lastName">{value.lastname}</span>)}
              </div>
            );
          }
    },
        { Header: 'Delete', accessor: 'id',
        //fetch link with id directly by content.links[0].href
       Cell: ({value}) => <Button variant="contained" size= "small" color="secondary" 
       onClick={() => deleteTraining(value)}>Delete</Button>},
    ]

    return (
        <div>
            <ReactTable 
              data={trainings} 
              columns={columns}
              filterable={true}
               /> 


        </div>

    );
}