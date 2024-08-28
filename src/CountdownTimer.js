import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(60); // 1 minute
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft <= 0) {
            alert('Your session has expired');
            navigate('/'); // Go back to the home page or reset form
        }
        const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, navigate]);

    return (
        <div className="countdown-timer">
            {/* Time left: {timeLeft}s */}
        </div>
    );
};

export default CountdownTimer;
