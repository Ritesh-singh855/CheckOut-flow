import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveFormData } from './redux/actions';  // Ensure this path is correct
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Function to generate a random alphanumeric booking ID
const generateBookingId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let bookingId = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        bookingId += chars[randomIndex];
    }
    return `BOOK-${bookingId}`;
};

const FormPage = () => {
    const [timeLeft, setTimeLeft] = useState(60); // 1 minute countdown
    const [isSubmitted, setIsSubmitted] = useState(false); // Track if the form is submitted
    const [bookingId, setBookingId] = useState(''); // State for booking ID
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timerId); // Clear the timer on unmount or form submission
        } else if (timeLeft === 0) {
            alert("Your session has expired");
        }
    }, [timeLeft, isSubmitted]);

    const handleSubmit = (values) => {
        // Generate a random booking ID
        const newBookingId = generateBookingId();
        setBookingId(newBookingId);

        // Dispatch the form data to Redux store
        dispatch(saveFormData({ ...values, bookingId: newBookingId }));
        setIsSubmitted(true); // Stop the timer
        navigate('/summary'); // Redirect to summary page using navigate
    };

    // Convert seconds to HH:MM:SS format
    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Yup validation schema
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        date: Yup.date().required('Date is required'),
        time: Yup.string().required('Time is required'),
    });

    // Inline styles for the form page
    const containerStyle = {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const headerStyle = {
        textAlign: 'center',
        marginBottom: '20px',
    };

    const formContainerStyle = {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    };

    const sectionStyle = {
        marginBottom: '20px',
    };

    const sectionHeaderStyle = {
        fontSize: '16px',
        marginBottom: '10px',
        color: '#333',
        borderBottom: '2px solid #ddd',
        paddingBottom: '5px',
        // backgroundColor:'red',
        textAlign: 'center',
    };

    const timerContainerStyle = {
        padding: '10px',
        borderRadius: '4px',
        textAlign: 'center',
        fontSize: '20px',
        fontWeight: 'bold',
    };

    const inputContainerStyle = {
        marginBottom: '15px',
    };

    const labelStyle = {
        display: 'block',
        fontSize: '16px',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: '#555',
    };

    const inputStyle = {
        display: 'block',
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    };

    const buttonStyle = {
        marginTop: '20px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#000',
        color: 'white',
        cursor: 'pointer',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    };

    const expiredTextStyle = {
        color: 'red',
        textAlign: 'center',
        fontSize: '18px',
        fontWeight: 'bold',
        marginTop: '20px',
    };

    return (
        <div style={containerStyle}>
            <h1 style={headerStyle}>TEST</h1>
            <div style={formContainerStyle}>
                <div style={sectionStyle}>
                    <div style={timerContainerStyle}>
                        <p>Checkout Form</p>
                        <p>YOUR SESSION WILL END IN:</p>

                        <p style={{backgroundColor:'red',margin: "auto", width: "200px"}}>{formatTime(timeLeft)}</p>
                        
                    </div>
                </div>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        date: '',
                        time: '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {bookingId && (
                                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                                    <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Booking ID: {bookingId}</p>
                                </div>
                            )}
                            <div style={sectionStyle}>
                                <h2 style={sectionHeaderStyle}>PERSONAL INFO</h2>
                                <div style={inputContainerStyle}>
                                    <label style={labelStyle} htmlFor="firstName">First Name</label>
                                    <Field
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        style={inputStyle}
                                    />
                                    <ErrorMessage name="firstName" component="div" style={{ color: 'red' }} />
                                </div>
                                <div style={inputContainerStyle}>
                                    <label style={labelStyle} htmlFor="lastName">Last Name</label>
                                    <Field
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Enter your last name"
                                        style={inputStyle}
                                    />
                                    <ErrorMessage name="lastName" component="div" style={{ color: 'red' }} />
                                </div>
                                <div style={inputContainerStyle}>
                                    <label style={labelStyle} htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        style={inputStyle}
                                    />
                                    <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
                                </div>
                            </div>
                            <div style={sectionStyle}>
                                <h2 style={sectionHeaderStyle}>BOOKING INFO</h2>
                                <div style={inputContainerStyle}>
                                    <label style={labelStyle} htmlFor="date">Date</label>
                                    <Field
                                        type="date"
                                        id="date"
                                        name="date"
                                        style={inputStyle}
                                    />
                                    <ErrorMessage name="date" component="div" style={{ color: 'red' }} />
                                </div>
                                <div style={inputContainerStyle}>
                                    <label style={labelStyle} htmlFor="time">Time</label>
                                    <Field
                                        type="time"
                                        id="time"
                                        name="time"
                                        style={inputStyle}
                                    />
                                    <ErrorMessage name="time" component="div" style={{ color: 'red' }} />
                                </div>
                                <button type="submit" style={buttonStyle} disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default FormPage;
