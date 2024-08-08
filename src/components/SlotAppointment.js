import React, { useState, useEffect } from 'react';
import '../styles/SlotAppointment.css';

const TimeSlotBooking = () => {
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: '9:00 AM - 10:00 AM', booked: false },
    { id: 2, time: '10:00 AM - 11:00 AM', booked: false },
    { id: 3, time: '11:00 AM - 12:00 PM', booked: false },
    { id: 4, time: '1:00 PM - 2:00 PM', booked: false },
    { id: 5, time: '2:00 PM - 3:00 PM', booked: false },
    { id: 6, time: '3:00 PM - 4:00 PM', booked: false },
  ]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    const storedTimeSlots = localStorage.getItem('timeSlots');
    if (storedTimeSlots) {
      setTimeSlots(JSON.parse(storedTimeSlots));
    }
  }, []);

  const handleTimeSlotClick = (timeSlot) => {
    if (!timeSlot.booked) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleBookAppointment = () => {
    if (selectedTimeSlot) {
      const updatedTimeSlots = timeSlots.map((timeSlot) => {
        if (timeSlot.id === selectedTimeSlot.id) {
          return { ...timeSlot, booked: true };
        }
        return timeSlot;
      });
      setTimeSlots(updatedTimeSlots);
      localStorage.setItem('timeSlots', JSON.stringify(updatedTimeSlots));
      setAppointmentDetails({
        name: '',
        email: '',
        phone: '',
      });
      setSelectedTimeSlot(null);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };

  return (
    <div className="time-slot-booking">
      <h1>Time Slot Booking</h1>
      <div className="time-slots">
        {timeSlots.map((timeSlot) => (
          <div
            key={timeSlot.id}
            className={`time-slot ${timeSlot.booked ? 'booked' : ''}`}
            onClick={() => handleTimeSlotClick(timeSlot)}
          >
            {timeSlot.time}
          </div>
        ))}
      </div>
      {selectedTimeSlot && (
        <div className="appointment-details">
          <h2>Appointment Details</h2>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={appointmentDetails.name}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={appointmentDetails.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={appointmentDetails.phone}
                onChange={handleInputChange}
              />
            </label>
            <button onClick={handleBookAppointment}>Book Appointment</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TimeSlotBooking;