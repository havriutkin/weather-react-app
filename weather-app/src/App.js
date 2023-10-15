import icon from './img/snow.png'
import './App.css';

import { useState, useEffect } from 'react';

function App() {
  return (
    <div className="App h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col h-1/2 w-1/2 border items-center justify-between pt-6 pb-1 pl-1 pr-1 bg-sky-600 rounded-md font-sans">
        <img src={icon} className="h-1/3"></img>
        <div className="h-1/5 flex flex-col items-center justify-around">
          <h2 className="w-max text-xl text-center">50&deg;</h2>
          <h3 className="w-min text-xl text-center">Snow</h3>
        </div>
        <div className="w-1/2 flex justify-evenly">
          <button>Toggle</button>
          <button>Toggle</button>
        </div>
        <p className="self-start italic">Atlanta, Georgia, USA</p>
      </div>
    </div>
  );
}

export default App;
