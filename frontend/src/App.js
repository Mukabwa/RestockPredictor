import React, { useState } from 'react';

function App() {
  const [inputs, setInputs] = useState({
    DayOfWeek: '',
    PreviousDaySales: '',
    ThreeDayAverage: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          DayOfWeek: parseInt(inputs.DayOfWeek),
          PreviousDaySales: parseFloat(inputs.PreviousDaySales),
          ThreeDayAverage: parseFloat(inputs.ThreeDayAverage)
        })
      });

      const data = await res.json();
      if (res.ok) {
        setPrediction(data.predicted_quantity);
        setError(null);
      } else {
        setPrediction(null);
        setError(data.error || 'An error occurred.');
      }

    } catch (err) {
      setPrediction(null);
      setError('Unable to connect to backend.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20 }}>
      <h1>SmartRestock</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
  <div>
    <label><strong>Day of the Week:</strong></label><br />
    <input
      type="number"
      name="DayOfWeek"
      placeholder="0 = Monday, 6 = Sunday"
      value={inputs.DayOfWeek}
      onChange={handleChange}
      required
      style={{ width: '100%', padding: '8px' }}
    />
  </div>

  <div>
    <label><strong>Previous Day Sales:</strong></label><br />
    <input
      type="number"
      name="PreviousDaySales"
      placeholder="e.g. 42"
      value={inputs.PreviousDaySales}
      onChange={handleChange}
      required
      style={{ width: '100%', padding: '8px' }}
    />
  </div>

  <div>
    <label><strong>3-Day Average Sales:</strong></label><br />
    <input
      type="number"
      name="ThreeDayAverage"
      placeholder="e.g. 48"
      value={inputs.ThreeDayAverage}
      onChange={handleChange}
      required
      style={{ width: '100%', padding: '8px' }}
    />
  </div>

  <button type="submit" style={{ marginTop: 10, padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
    Predict Demand
  </button>
</form>


      {prediction && (
        <div style={{ marginTop: 20 }}>
          <h2>🔮 Predicted Quantity: {prediction}</h2>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: 20 }}>
          <p>Error: {error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
