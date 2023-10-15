import icon from './img/night_half_moon_partial_cloud.png'
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
      <div className="h-2/3 w-3/4 md:h-1/2 md:w-1/2 lg:w-1/3 lg:h-2/3 flex flex-col items-center justify-around p-2 border border-slate-900 rounded-md shadow-lg shadow-cyan-500/80 bg-sky-600 font-sans animate-fade-in">
        <img src={icon} className="h-1/2 w-2/3"></img>
        <div className="w-3/4 md:w-2/3 h-1/3 flex items-center justify-between">
          <div className="flex flex-col">
            <p className="italic font-thin">{weather.location}</p>
            <hr></hr>
            <h3 className="w-max text-xl text-center font-light">{weather.text}</h3>
            <h2 className="w-max text-3xl text-center font-bold">{weather.temp_f}&deg;</h2>
          </div>
          <div className="flex flex-col items-center justify-around">
            <button className="bg-orange-300 p-2">Toggle</button>
            <button className="bg-orange-300 p-2 mt-2">Toggle</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
