import icon from './img/snow.png'
import './App.css';

import { useState, useEffect } from 'react';
import { parseWeather } from './utils';


function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const params = new URLSearchParams({
        'key': apiKey,
        'q': 'Atlanta'
      });

      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?${params}`);
        if (!response.ok) {
          throw new Error(`${response}`);
        }

        const weatherData = await response.json();
        setWeather(parseWeather(weatherData));
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  if(!weather) return (
    <div className='App'>
      <h1>Loading...</h1>
    </div>
  )

  return (
    <div className="App h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col h-1/2 w-1/2 border items-center justify-between pt-6 pb-1 pl-1 pr-1 bg-sky-600 rounded-md font-sans">
        <img src={weather.icon} className="h-1/3"></img>
        <div className="h-1/5 flex flex-col items-center justify-around">
          <h2 className="w-max text-xl text-center">{weather.temp_f}&deg;</h2>
          <h3 className="w-min text-xl text-center">{weather.text}</h3>
        </div>
        <div className="w-1/2 flex justify-evenly">
          <button>Toggle</button>
          <button>Toggle</button>
        </div>
        <p className="self-start italic">{weather.location}</p>
      </div>
    </div>
  );
}

export default App;
