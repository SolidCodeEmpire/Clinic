import React, {useState, useEffect} from 'react';

export function ClockComponent() {
    const [clock, setClock] = useState<Date>(new Date());
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setClock(new Date());
      }, 1000);
  
      return () => {
        clearInterval(intervalId);
      }
    }, []);
  
    return <>{clock.toLocaleString()}</>
  }