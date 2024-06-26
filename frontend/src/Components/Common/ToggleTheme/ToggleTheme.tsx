import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import './ToggleTheme.css'

/**
 * Component for toggling between light and dark themes.
 *
 * @returns The ToggleTheme component.
 */
export default function ToggleTheme() {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(['theme'])

  useEffect(() => {
    setIsDarkTheme(cookies.theme === "dark");
  },[cookies])

  const lightTheme =
    `--titlebar-color: #121e55;
    --navbar-color: #218df3;
    --navbar-hover-color: lightblue;
    --main-content-color: #fffff0;
    --font-color: #1a1a1a;
    --toggle-background: #196dbb;
    --list-odd-color: #e4e4e4;
    --list-even-color: #c8c8c8;
    --button-default: #eaeaea;
    --button-foreground: #eeeeec;
    --calendar-header: #b3e2a7;`

  const darkTheme =
    `--titlebar-color: #050505;
    --navbar-color: #101010;
    --navbar-hover-color: #808080;
    --main-content-color: #353535;
    --font-color: #fffff0;
    --toggle-background: #2b2b2b;
    --list-odd-color: #3a3a3a;
    --list-even-color: #525252;
    --button-default: #cacaca;
    --button-foreground: #eeeeec;
    --calendar-header: #244e1a;`

  // Set new colors
  var root = document.documentElement;
  root.style.cssText = isDarkTheme ? darkTheme : lightTheme;

  return (
    <div className='dark-theme-toggle-wrap'>
      <input 
        className={`dark-theme-toggle-checkbox ${isDarkTheme && "light-theme"}`} 
        type='checkbox' 
        checked={isDarkTheme} 
        aria-label='Toggle dark theme' 
        onChange={() =>  {
          setCookie('theme', cookies.theme === "light" ? "dark" : "light");
        }}
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