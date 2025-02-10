import React, { useState, useEffect } from 'react';
import { FaClock } from "react-icons/fa";

export function CurrentDateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(() => {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace('T', ' ');
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toISOString().slice(0, 19).replace('T', ' '));
    };

    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <FaClock className="text-red-500" />
      <span>{currentDateTime}</span>
    </div>
  );
}