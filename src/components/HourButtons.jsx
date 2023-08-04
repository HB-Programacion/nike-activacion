import React from 'react';
import { Link } from 'react-router-dom';

const hours = ['6am', '7am', '8am'];

const HourButtons = () => {
   return (
      <div>
         {hours.map((hour) => (
            <Link key={hour} to={`/gallery/${hour}`}>
            <button
               style={{
                  padding: '5rem',
                  margin: '1rem',
                  backgroundColor: 'chocolate'
               }}
            >
            {hour}
            </button>
            </Link>
         ))}
      </div>
      );
   };

export default HourButtons;