import { useState, useEffect } from 'react';

const Greeting = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timerID);
  }, []);

  const dateString = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


  return (
    <div className="items-center w-full text-gray-700 bg-white p-5 text-sm rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-bold mb-2">Good Morning Scasians!</h2>
      <p className="text-gray-600 mb-2">
        Today is {dateString}, {timeString}
      </p>
    </div>
  );
};

export default Greeting;
