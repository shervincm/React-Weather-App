import './App.css';
import React, { useState, useEffect } from 'react';
import clearImage from './images/clear.png';
import cloudyImage from './images/cloudy.png';
import rainyImage from './images/rainy.png';
import snowflakeImage from './images/snowflake.png';

function App() {

  const [city, setCity] = useState('');
  function onChange(e) {
    setCity(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1));
  }
  // i want to set the first character of city to uppercase

  const [weatherData, setWeatherData] = useState({});
  const [temperature, setTemperature] = useState('');
  const [weatherImage, setWeatherImage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // function that takes a Date object as an argument and returns a string representing the date
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November",
                  "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday"];

    // Get the current day of the week (0-6)
    let day = days[d.getDay()];
    // Get the current day of the month (1-31)
    let date = d.getDate();
    // Get the current month (0-11)
    let month = months[d.getMonth()];
    // Get the current year (yyyy)
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  const api = {
    key: "dad0a2fda57eef0228e38c94fe4e7bd2",
  }

  async function getWeather() {
    try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api.key}`);
    const data = await response.json();
    console.log(data);
    setTemperature(Math.round(data.main.temp - 273.15));
    setWeatherData(data);
    // console.log(weatherData.weather[0].main);
    setErrorMessage('');
  } catch (error) {
    setErrorMessage('City not found. Please try again.');
    alert(errorMessage);
    setWeatherData({});
  }
   
  }

  function handleSubmit(e) {
    // prevent the page from reloading when the form is submitted
    e.preventDefault();
    getWeather();
  }

  
  useEffect(() => {
    const weatherImageSource = {
      'Clear': clearImage,
      'Clouds': cloudyImage,
      'Rain': rainyImage,
      'Snow': snowflakeImage,
      // add more weather types and image file names as needed
    };
    // set the weather image based on the weather type
    if (weatherData.weather && weatherData.weather[0]) {
      const weatherType = weatherData.weather[0].main;
      setWeatherImage(weatherImageSource[weatherType] || '');
    }
  }, [weatherData]);

  return (
    <div className="app">
        <main className='mainContent'>
          <div className="search-box">
            <input 
              type="text"
              className="search-bar"
              placeholder="Search City..."
              value={city}
              onChange={onChange}
            />
            <button className="search-button" onClick={handleSubmit}>Search</button>
          </div>
          <div className="location">
            <div className="city">{city}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather">
            <div className="temp">{temperature}°C</div>
            <div>
            {/* if weatherData.weather is not null and weatherData.weather[0] is not null, then display the weather type and weather image */}
            {weatherData.weather && weatherData.weather[0] && (
            <div className="weather">{weatherData.weather[0].main}</div>
            )}
            {weatherData.weather && weatherData.weather[0] && (
            <img className="weather-image" src={weatherImage} alt="weather" />
            )}
            </div>
            
          </div>
        </main>
    </div>
  );
}

export default App;
