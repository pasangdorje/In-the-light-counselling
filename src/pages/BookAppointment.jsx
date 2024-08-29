import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  subject: Yup.string().required('Counseling subject is required'),
  type: Yup.string().required('Counseling type is required'),
  appointment: Yup.string().required('Appointment time is required'),
  counselor: Yup.string().required('Please select a counselor'),
});

// Time slots function to generate 30-minute gaps
const generateTimeSlots = (start, end) => {
  const slots = [];
  let current = new Date(start);

  while (current <= end) {
    slots.push(current.toTimeString().substring(0, 5));
    current.setMinutes(current.getMinutes() + 30);
  }

  return slots;
};

// Time slots (9 AM to 5 PM)
const timeSlots = generateTimeSlots(
  new Date().setHours(9, 0, 0, 0),
  new Date().setHours(17, 0, 0, 0)
);

// Simulated list of counselors
const counselors = [
  { id: 1, name: 'Dr. John Doe' },
  { id: 2, name: 'Dr. Jane Smith' },
  { id: 3, name: 'Dr. Emily Johnson' },
];

const BookAppointment = () => {
  return (
    <Formik
      initialValues={{
        subject: '',
        type: '',
        appointment: '',
        counselor: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          {/* Counseling Subject */}
          <div className="form-group">
            <label htmlFor="subject">Counseling Subject</label>
            <Field
              type="text"
              name="subject"
              className="form-control"
              placeholder="Enter counseling subject"
            />
            <ErrorMessage name="subject" component="div" className="text-danger" />
          </div>

          {/* Counseling Type */}
          <div className="form-group">
            <label htmlFor="type">Counseling Type</label>
            <Field as="select" name="type" className="form-control">
              <option value="">Select type</option>
              <option value="individual">Individual</option>
              <option value="couple">Couple</option>
              <option value="family">Family</option>
            </Field>
            <ErrorMessage name="type" component="div" className="text-danger" />
          </div>

          {/* Counselor Selection */}
          <div className="form-group">
            <label htmlFor="counselor">Select Counselor</label>
            <Field as="select" name="counselor" className="form-control">
              <option value="">Select a counselor</option>
              {counselors.map((counselor) => (
                <option key={counselor.id} value={counselor.name}>
                  {counselor.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="counselor" component="div" className="text-danger" />
          </div>

          {/* Appointment Date and Time */}
          <div className="form-group">
            <label htmlFor="appointment">Appointment Time</label>
            <Field as="select" name="appointment" className="form-control">
              <option value="">Select appointment time</option>
              {timeSlots.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </Field>
            <ErrorMessage name="appointment" component="div" className="text-danger" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Book Appointment
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default BookAppointment;
