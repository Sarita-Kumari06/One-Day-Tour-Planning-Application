import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [city, setCity] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [budget, setBudget] = useState('');
    const [interests, setInterests] = useState([]);
    const [itinerary, setItinerary] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/collectPreferences', {
            city,
            start_time: startTime,
            end_time: endTime,
            budget,
            interests,
        });
        alert(response.data);
    };

    const handleGetItinerary = async () => {
        const response = await axios.get('http://localhost:5000/generateItinerary/userId');
        setItinerary(response.data.itinerary);
    };

    return (
        <div className="App">
            <h1>One-Day Tour Planning Assistant</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} />
                <input type="time" placeholder="Start Time" onChange={(e) => setStartTime(e.target.value)} />
                <input type="time" placeholder="End Time" onChange={(e) => setEndTime(e.target.value)} />
                <input type="text" placeholder="Budget" onChange={(e) => setBudget(e.target.value)} />
                <input type="text" placeholder="Interests" onChange={(e) => setInterests(e.target.value.split(','))} />
                <button type="submit">Submit Preferences</button>
            </form>
            <button onClick={handleGetItinerary}>Get Itinerary</button>
            {itinerary && <p>{itinerary}</p>}
        </div>
    );
}

export default App;

