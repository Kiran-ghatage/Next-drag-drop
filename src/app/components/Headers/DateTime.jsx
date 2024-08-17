"use client";
import React, { useState, useEffect } from "react";

export const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  {/* <p> Date : {date.toLocaleDateString()}</p> */ }
  return (
    <div>{date.toLocaleTimeString()}</div>
  );
};

export default DateTime;
