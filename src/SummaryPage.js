import React from 'react';
import { useSelector } from 'react-redux';

// Function to format time with AM/PM
const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert hour to 12-hour format
    return `${formattedHour}:${minutes} ${period}`;
};

const SummaryPage = () => {
    const formData = useSelector(state => state.formData);

    // Inline styles for the summary page
    const containerStyle = {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    const headerStyle = {
        marginBottom: '20px',
    };

    const titleStyle = {
        fontSize: '24px',
        marginBottom: '10px',
        textAlign: 'center',
        color: '#333',
    };

    const lineStyle = {
        border: 'none',
        borderTop: '2px solid #ccc',
        margin: '10px 0 20px',
    };

    const contentStyle = {
        fontSize: '18px',
        color: '#555',
    };

    const itemStyle = {
        marginBottom: '10px',
    };

    const boldTextStyle = {
        fontWeight: 'bold',
        color: '#000',
    };

    const testHeadingStyle = {
        textAlign: 'center',
        margin: '20px 0',
        fontSize: '32px',
        color: '#333',
    };

    return (
        <>
            <h1 style={testHeadingStyle}>TEST</h1>

            <div style={containerStyle}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>Checkout Form</h2>
                    <hr style={lineStyle} />
                </div>
                <div style={contentStyle}>
                    {formData.bookingId && (
                        <p style={itemStyle}>
                            <span style={boldTextStyle}>Booking ID:</span> {formData.bookingId}
                        </p>
                    )}
                    <p style={itemStyle}>
                        <span style={boldTextStyle}>First Name:</span> {formData.firstName}
                    </p>
                    <p style={itemStyle}>
                        <span style={boldTextStyle}>Last Name:</span> {formData.lastName}
                    </p>
                    <p style={itemStyle}>
                        <span style={boldTextStyle}>Email:</span> {formData.email}
                    </p>
                    <p style={itemStyle}>
                        <span style={boldTextStyle}>Date:</span> {formData.date}
                    </p>
                    <p style={itemStyle}>
                        <span style={boldTextStyle}>Time:</span> {formatTime(formData.time)}
                    </p>
                </div>
            </div>
        </>
    );
};

export default SummaryPage;
