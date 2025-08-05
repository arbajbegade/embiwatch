// src/utils/formatFullDate.js

export function formatFullDate(dateInput = new Date()) {
    const date = new Date(dateInput);
  
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    }
  
    const day = date.getDate();
    const weekday = new Intl.DateTimeFormat('en-GB', { weekday: 'long' }).format(date);
    const month = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(date);
    const year = date.getFullYear();
    // console.log(`${weekday}, ${day}${getOrdinalSuffix(day)} ${month} ${year}`);
    return `${weekday}, ${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }
  