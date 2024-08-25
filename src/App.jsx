import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    // Set the webpage title to your roll number
    document.title = "ABCD123";

    // Function to handle JSON input change
    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    // Function to handle JSON validation and API call
    const handleSubmit = async () => {
        try {
            const parsedData = JSON.parse(jsonInput);
            const response = await axios.post('https://bajaj-backend2-phi.vercel.app/bfhl ', parsedData);
            setResponseData(response.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON input');
        }
    };

    // Function to handle dropdown selection
    const handleSelectionChange = (e) => {
        const options = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(options);
    };

    // Function to filter and display response data based on user selection
    const renderResponse = () => {
        if (!responseData) return null;

        let result = {};
        if (selectedOptions.includes('Alphabets')) {
            result.alphabets = responseData.alphabets;
        }
        if (selectedOptions.includes('Numbers')) {
            result.numbers = responseData.numbers;
        }
        if (selectedOptions.includes('Highest lowercase alphabet')) {
            result.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
        }

        return (
            <pre>{JSON.stringify(result, null, 2)}</pre>
        );
    };

    return (
        <div className="App">
            <h1>JSON Inp</h1>
            <textarea 
                value={jsonInput} 
                onChange={handleInputChange} 
                placeholder='Enter JSON here...'
                rows="5"
                cols="50">
            </textarea>
            <br />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {responseData && (
                <>
                    <h2>Select Data to Display</h2>
                    <select multiple onChange={handleSelectionChange}>
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    <h2>Response Data</h2>
                    {renderResponse()}
                </>
            )}
        </div>
    );
}

export default App;
