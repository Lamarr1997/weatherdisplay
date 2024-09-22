import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {
  const key = process.env.REACT_APP_API;
  const [ city, setCity ] = useState(" ");
  const [ loading, setLoading ] = useState(false);
  const [ weather, setWeather ] = useState({});
  const url = `https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`;


  const fetchWeather = async (key, city) => {
    setLoading(true);
    try {
      const response = await fetch(
        url
      );

      const data = await response.json();
      console.log(data);
      if (data.error) {
        alert("Failed to fetch weather data");
      }
      setWeather(data);
    } catch (error) {
      console.error("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(city)
  }, [city]);

  return (
    <div className="App">
      <h1>Weather Display</h1>
      <div>
        <input type="text" onChange={(e) => setCity(e.target.value)}></input>
        <button type="button" onClick={(e) => {
          fetchWeather(key, city)
        }}>Search</button>
      </div>
      {loading && <p>Loading Data ...</p>}
      {!loading && weather.current && Object.keys(weather).length > 0 && (
        <div className='weather-cards'>
          <div className='weather-card'>
            <h3>Temperature </h3>
            <p>{weather.current.temp_c} Celsius</p>
          </div>
          <div className='weather-card'>
            <h3>Humidity</h3>
            <p>{weather.current.humidity} %</p>
          </div>
          <div className='weather-card'>
            <h3>Condition</h3>
            <p>{weather.current.condition.text}</p>
          </div>
          <div className='weather-card'>
            <h3>Wind Speed</h3>
            <p>{weather.current.wind_kph} Kmph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
