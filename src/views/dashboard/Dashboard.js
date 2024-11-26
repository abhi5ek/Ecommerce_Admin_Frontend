import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Localizer for the calendar
const localizer = momentLocalizer(moment);

// Modal for displaying appointment details
const AppointmentModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  // Format the date and time
  const formatDateTime = (date) => {
    if (!(date instanceof Date)) date = new Date(date); // Convert to Date if not already
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDateTime(appointment.date);

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
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#007bff' }}>{"Appointment"}</h2>
        <div style={{
          margin: '20px 0',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '5px',
          backgroundColor: '#f9f9f9',
        }}>
          <p><strong>Name:</strong> {appointment.fullName}</p>
          <p><strong>Email:</strong> {appointment.email}</p>
          <p><strong>Mobile:</strong> {appointment.mobile}</p>
          <p><strong>Message:</strong> {appointment.message}</p>
          <p><strong>Date:</strong> {formattedDate}</p>
          {/* <p><strong>Time:</strong> {formattedTime}</p> */}
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

// Main Dashboard component
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
        title: "Appointment",
        start: new Date(appointment.date),
        end: new Date(appointment.date),
        date: new Date(appointment.date),
        ...appointment
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
    <div>
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '80vh', width: '100%' }}
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
