import React from "react";

const AdditionalInfo = ({ timezone, dayOfWeek, weekOfYear, date }) => {
  return (
    <div className="additionalInfo">
      <p>{timezone}</p>
      <p>{dayOfWeek}</p>
      <p>{weekOfYear}</p>
      <p>{date}</p>
    </div>
  );
};

export default AdditionalInfo;
