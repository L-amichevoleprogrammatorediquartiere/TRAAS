import { useEffect, useState, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/it';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FetchVisite } from '../backend'; 

// Impostiamo moment in italiano e settimana da lunedì
moment.locale('it', { week: { dow: 1 } });

const localizer = momentLocalizer(moment);

export default function CalendarAgenda() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    FetchVisite().then(setEvents);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      top: '25%',
      left: '8%',
      width: '52%',
      height: '55%',
      backgroundColor: '#ffffff',
    }}>
        <style>{`
            .rbc-calendar {
            font-size: 80%; /* oppure un valore % o rem più piccolo */
            }

            .rbc-month-view .rbc-day-bg {
            border: 1px solid #999;
            }
            .rbc-event {
            border: 1px solid black;
            background-color: #e6f7ff;
            color: black;
            font-size: 90%;
            }
            .rbc-month-view {
            border-collapse: collapse;
            }
        `}</style>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            style={{ height: '100%', width: '100%' }}
            messages={{
                week: 'Settimana',
                day: 'Giorno',
                month: 'Mese',
                today: 'Oggi',
                previous: 'Indietro',
                next: 'Avanti',
                agenda: 'Agenda',
                noEventsInRange: 'Nessun evento nel periodo selezionato'
                }}
      />
    </div>
  );
}
