import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const localizer = momentLocalizer(moment);

const AppointmentModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  // Format the start and end date and time separately
  const formatDateTime = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
  };

  const { formattedDate: startDate, formattedTime: startTime } = formatDateTime(appointment.start);
  const { formattedDate: endDate, formattedTime: endTime } = formatDateTime(appointment.end);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        maxWidth: '500px',
        width: '90%',
      }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#007bff' }}>{appointment.title}</h2>

        <div style={{
          margin: '20px 0',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        }}>
          <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
            <span style={{ color: '#555' }}>Start Date:</span> {startDate}
          </p>
          <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
            <span style={{ color: '#555' }}>Start Time:</span> {startTime}
          </p>
          <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
            <span style={{ color: '#555' }}>End Date:</span> {endDate}
          </p>
          <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
            <span style={{ color: '#555' }}>End Time:</span> {endTime}
          </p>
        </div>

        <button 
          onClick={onClose} 
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};


const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/appointments/`);
      const formattedAppointments = response.data.data.map(appointment => ({
        title: appointment.event || 'Appointment',
        start: new Date(appointment.startDate),
        end: new Date(appointment.endDate),
      }));
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEventClick = (event) => {
    setSelectedAppointment(event);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '10px',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1
        style={{
          fontSize: '2rem',
          marginBottom: '10px',
          color: '#007bff',
        }}
      >
        Appointment Calendar
      </h1>

      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          height: '80vh',
          maxWidth: '1200px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%', width: '100%' }}
          onSelectEvent={handleEventClick}
        />
      </div>

      {modalOpen && (
        <AppointmentModal
          appointment={selectedAppointment}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Dashboard;
