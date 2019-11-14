import React, {useState} from 'react';
import 'react-table/react-table.css'; 
import moment from "moment";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";


export default function EventCalendar () {
    const[eventList, setEventList] = useState([]);

    const fetchData = async () => {
        try {
          const response = await fetch(
            "https://customerrest.herokuapp.com/gettrainings"
          );
          const data = await response.json();
          console.log(data);
          var events = []; 
          var startDate= null;
          var endDate = null;
        for (var i = 0; i < data.length; i++) {
            if (data[i].date !== null) {
                try {
                    startDate = new Date(data[i].date);
                    endDate = new Date(data[i].date); 
                    endDate.setUTCMinutes(startDate.getUTCMinutes() + data[i].duration);
                    events.push({
                        title: data[i].activity,
                        start: startDate,
                        end: endDate});
                    }
                    catch(err) {
                        console.log(err);
                    }
            }
        }
        setEventList(events); 
        console.log(events);
        } catch (error) {
          console.error(error);
        }
      };
      React.useEffect(() => {
        fetchData();
      }, []);  
       
      const localizer = momentLocalizer(moment)

    return (
        <div>
    <Calendar
      localizer={localizer}
      events={eventList}
      startAccessor="start"
      endAccessor="end"
      style={{height: 500}}
    />
        </div>

    )
}