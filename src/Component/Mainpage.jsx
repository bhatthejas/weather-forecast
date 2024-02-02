import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Mainpage = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);
  const [showWeather, setShowWeather] = useState(false);

  const apiKey = 'c5af4b96264aa6abfc426abff95d69af';

  const fetchWeatherData = async () => {
    try {
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
      setWeather(weatherResponse.data);

      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`);
      setForecast(forecastResponse.data.list);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeather(null);
      setForecast(null);
      setError('City not found. Please enter a valid city name.');
      toast.error('CITY NOT FOUND!', { autoClose: 3000 });
    }
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);

    setWeather(null);
    setForecast(null);

    if (newCity.trim() === '') {
      setShowWeather(false);
      setWeather(null);
      setForecast(null);
      setError(null);
    }
  };

  const handleUnitToggle = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const handleSearch = () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      toast.error('Please enter a city name.', { autoClose: 3000 });
    } else {
      fetchWeatherData();
      setShowWeather(true);
    }
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toLocaleDateString();
  };

  return (
    <div className="App">
      <div className="input-container">
        <h1>WEATHER FORECAST</h1>
        <input type="text" placeholder="Enter city name" value={city} onChange={handleCityChange}/> <br />
        <button onClick={handleSearch}>Search</button> &nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      {error && <p className="error-message"></p>}
      <div className="result">
        {showWeather && weather && (
          <div className="current-weather">
            <h2>Current Weather in {city}</h2>
            <button onClick={handleUnitToggle}>{unit === 'metric' ? 'Celsius' : 'Fahrenheit'}</button>
            {/* <table cellPadding={5} cellSpacing={3}>
              <tr>
                <th>Date:</th>
                <td>{getCurrentDate()}</td>
              </tr>
              <tr>
                <th>Temperature:</th>
                <td>
                  {weather.main?.temp}°{unit === 'metric' ? 'C' : 'F'}
                </td>
              </tr>
              <tr>
                <th>Min Temperature:</th>
                <td>
                  {weather.main?.temp_min}°{unit === 'metric' ? 'C' : 'F'}
                </td>
              </tr>
              <tr>
                <th>Max Temperature:</th>
                <td>
                  {weather.main?.temp_max}°{unit === 'metric' ? 'C' : 'F'}
                </td>
              </tr>
              <tr>
                <th>Wind Direction:</th>
                <td> {weather.wind?.deg}°</td>
              </tr>
              <tr>
                <th>Wind Speed:</th>
                <td>{weather.wind?.speed} m/s</td>
              </tr>
              <tr>
                <th>Humidity:</th>
                <td>{weather.main?.humidity}%</td>
              </tr>
              <tr>
                <th>Description:</th>
                <td>{weather.weather[0]?.description}</td>
              </tr>
              <tr>
                <td colspan="2">
                  <img src={`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}.png`}alt={weather.weather[0]?.description}/>
                </td>
              </tr>
            </table> */}
            <div className="weather-info">
  <div>
    <span>Date:</span>
    <span>{getCurrentDate()}</span>
  </div>
  <div>
    <span>Temperature:</span>
    <span>
      {weather.main?.temp}°{unit === 'metric' ? 'C' : 'F'}
    </span>
  </div>
  <div>
    <span>Min Temperature:</span>
    <span>
      {weather.main?.temp_min}°{unit === 'metric' ? 'C' : 'F'}
    </span>
  </div>
  <div>
    <span>Max Temperature:</span>
    <span>
      {weather.main?.temp_max}°{unit === 'metric' ? 'C' : 'F'}
    </span>
  </div>
  <div>
    <span>Wind Direction:</span>
    <span>{weather.wind?.deg}°</span>
  </div>
  <div>
    <span>Wind Speed:</span>
    <span>{weather.wind?.speed} m/s</span>
  </div>
  <div>
    <span>Humidity:</span>
    <span>{weather.main?.humidity}%</span>
  </div>
  <div>
    <span>Description:</span>
    <span>{weather.weather[0]?.description}</span>
  </div>
  <div className="image-container">
    <img
      src={`http://openweathermap.org/img/wn/${weather.weather[0]?.icon}.png`}
      alt={weather.weather[0]?.description}
    />
  </div>
</div>
          </div>
        )}
        {showWeather && forecast && (
          <div className="forecast">
            {forecast.slice(0, 5).map((item, index) => {
              const currentDate = new Date();
              const forecastDate = new Date(
                currentDate.getTime() + (index + 1) * 24 * 60 * 60 * 1000
              );
              return (
                <div key={item.dt} className="forecast-item">
                  <p>Date: {forecastDate.toLocaleDateString()}</p>
                  <p>
                    Average temperature:{' '}
                    {(
                      (weather.main?.temp_min + weather.main?.temp_max) / 2
                    ).toFixed(2)}
                    °{unit === 'metric' ? 'C' : 'F'}
                  </p>
                  <p>Description: {item.weather[0]?.description}</p>
                  <img src={`http://openweathermap.org/img/wn/${item.weather[0]?.icon}.png`} alt={item.weather[0]?.description}/>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mainpage;
