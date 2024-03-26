import React from 'react';
import { useState } from 'react';

import './ToggleTheme.css'

export default function ToggleTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const lightTheme =
    `--titlebar-color: #121e55;
    --navbar-color: #218df3;
    --navbar-hover-color: lightblue;
    --main-content-color: #fffffc;
    --font-color: #1a1a1a;`

  const darkTheme =
    `--titlebar-color: #050505;
    --navbar-color: #101010;
    --navbar-hover-color: #808080;
    --main-content-color: #353535;
    --font-color: #fffff0;`

  // Set new colors
  var root = document.documentElement;
  root.style.cssText = isDarkTheme ? darkTheme : lightTheme;

  return (
    <div className='dark-theme-toggle-wrap'>
      <input 
        className='dark-theme-toggle-checkbox'
        type='checkbox' 
        checked={isDarkTheme} 
        aria-label='Toggle dark theme' 
        onChange={() => setIsDarkTheme(!isDarkTheme)}
        id="dark-theme-toggle-checkbox">
      </input>
      <label htmlFor='dark-theme-toggle-checkbox' className='dark-theme-toggle-checkbox-label'>
        <i className="moon"><img className='moon-img' src='resources/moon.png' alt=''/></i>
        <i className="sun"><img className='sun-img' src='resources/sun.png' alt=''/></i>
        <span className="ball"></span>
      </label>
    </div>
  )
}