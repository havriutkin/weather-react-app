import darkIcon from './img/themeIcons/dark_mode_icon.png';
import lightIcon from './img/themeIcons/light_mode_icon.png';
import fahrenheitIcon from './img/temprature/fahrenheit_icon.png';
import celsiusIcon from './img/temprature/celsius_icon.png';
import './App.css';

import { useState, useEffect } from 'react';
import { parseWeather } from './utils';
import Autocomplete from 'react-google-autocomplete';

import Toggle from './Toggle';


function App() {
  const [location, setLocation] = useState('New York');
  const [weather, setWeather] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const params = new URLSearchParams({
        'key': apiKey,
        'q': location
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
  }, [location])

  const changeDegree = () => {
    setIsCelsius(!isCelsius);
  }

  const changeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }


  if(!weather) return (
    <div className='App'>
      <h1>Loading...</h1>
    </div>
  )


  return (
    <div className={isDarkTheme ? "dark" : ""}>
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="h-2/3 w-3/4 md:h-1/2 md:w-1/2 lg:w-1/3 lg:h-2/3 flex flex-col items-center justify-around p-2 border
         border-slate-300 dark:border-slate-900 rounded-md shadow-lg shadow-cyan-500/80 bg-sky-600 font-sans animate-fade-in
         dark:bg-sky-950 dark:text-white">
          <img src={weather.icon} className="h-1/2 w-2/3"></img>
          <div className="w-3/4 md:w-2/3 h-1/3 flex items-center gap-5 md:justify-between">
            <div className="flex flex-col">
              <Autocomplete
                apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                className='italic font-thin border-none outline-none bg-transparent'
                onPlaceSelected={(place) => setLocation(place.formatted_address)}
                defaultValue={location}/>
              <hr className="dark:border-black"></hr>
              <h3 className="w-max text-xl text-center font-light">{weather.text}</h3>
              <h2 className="w-max text-3xl text-center font-bold">{isCelsius ? weather.temp_c : weather.temp_f}&deg;</h2>
            </div>
            <div className="flex flex-col items-center justify-around">
              <Toggle name={"themeToggle"} leftIcon={lightIcon} rightIcon={darkIcon} onChange={changeTheme}/>
              <Toggle name={"degreeToggle"} leftIcon={fahrenheitIcon} rightIcon={celsiusIcon} onChange={changeDegree}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
