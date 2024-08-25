import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInput = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);

      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError('Invalid JSON format');
        return;
      }

      const res = await axios.post('https://bajaj-backend-nu-six.vercel.app/', parsedInput);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Error processing the request. Please check the JSON format.');
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedOptions((prev) =>
      checked ? [...prev, value] : prev.filter((option) => option !== value)
    );
  };

  const renderResponse = () => {
    if (!response) return null;

    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    return (
      <div className="response-container">
        {selectedOptions.includes('Numbers') && (
          <div>
            <strong>Numbers:</strong> {numbers.join(', ')}
          </div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div>
            <strong>Alphabets:</strong> {alphabets.join(', ')}
          </div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div>
            <strong>Highest lowercase alphabet:</strong>{' '}
            {highest_lowercase_alphabet.join(', ')}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE2765</h1> 
      <textarea
        value={jsonInput}
        onChange={handleJsonInput}
        placeholder='Enter JSON input here'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div className="error">{error}</div>}
      {response && (
        <>
          <div className="dropdown">
            <label>
              <input
                type="checkbox"
                value="Numbers"
                onChange={handleOptionChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="Alphabets"
                onChange={handleOptionChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="Highest lowercase alphabet"
                onChange={handleOptionChange}
              />
              Highest lowercase alphabet
            </label>
          </div>
          {renderResponse()}
        </>
      )}
    </div>
  );
}

export default App;