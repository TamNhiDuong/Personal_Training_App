import React, {useState, useEffect} from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css'; 
import Moment from "react-moment";

export default function TrainingList () {
    const[trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
        .then(response => response.json())
        .then(data => setTrainings(data.content) )
        .catch(err => console.error(err))
    };

    const columns = [
        { Header: 'Date', 
          accessor: 'date',
        Cell: row => {
            return <Moment format="DD.MM.YYYY - HH:MM">{row.value}</Moment>;
          }},
        { Header: 'Duration', accessor: 'duration'},
        { Header: 'Activity', accessor: 'activity'},
        { Header: 'Content', accessor: 'content'},
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