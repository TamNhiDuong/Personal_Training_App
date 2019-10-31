import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import Moment from "react-moment";
import Button from "@material-ui/core/Button";

export default function TrainingList () {
    const[trainings, setTrainings] = useState([]);
    const[message, setMessage] = useState(''); 

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content) )
        .catch(err => console.error(err))
    };

    const deleteTraining = trainingLink => {
        if(window.confirm('Are you sure?')) {
            fetch(trainingLink, {method: "DELETE"})
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
        { Header: 'Content', accessor: 'content'},
        { Header: 'Delete', accessor: 'links[0].href',
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