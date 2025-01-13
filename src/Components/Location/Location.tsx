import React, { useState, useEffect } from 'react';

const Location: React.FC = () => {
    const [location, setLocation] = useState<string | null>(null);

    useEffect(() => {
        // Simulate fetching data
        setTimeout(() => {
            setLocation('New York City'); // Example location name
        }, 1000);
    }, []);

    return <div>{location ? `Location: ${location}` : 'Loading...'}</div>;
};

export default Location;
