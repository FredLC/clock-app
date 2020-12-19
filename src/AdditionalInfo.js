import React from "react";

const AdditionalInfo = ({
  timezone,
  dayOfWeek,
  weekOfYear,
  date,
  timeOfDay,
}) => {
  const backgroundLight = {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    color: "black",
  };

  const backgroundDark = {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  };
  return (
    <div
      className="additionalInfo"
      style={timeOfDay === "evening" ? backgroundDark : backgroundLight}
    >
      <div className="column">
        <div className="infoContainer firstInfoContainer">
          <p className="label">CURRENT TIMEZONE</p>
          <p className="info">{timezone}</p>
        </div>
        <div className="infoContainer">
          <p className="label">DATE</p>
          <p className="info">{date}</p>
        </div>
      </div>
      <div className="separator"></div>
      <div className="column secondColumn">
        <div className="infoContainer firstInfoContainer">
          <p className="label">DAY OF THE WEEK</p>
          <p className="info">{dayOfWeek}</p>
        </div>
        <div className="infoContainer">
          <p className="label">WEEK OF THEN YEAR</p>
          <p className="info">{weekOfYear}</p>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
