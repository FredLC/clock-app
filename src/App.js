import React from "react";
import AdditionalInfo from "./AdditionalInfo";
import "./App.css";

const dayTimeStyle = {
  backgroundImage: `url('${process.env.PUBLIC_URL}/assets/desktop/bg-image-day.png')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const nightTimeStyle = {
  backgroundImage: `url('${process.env.PUBLIC_URL}/assets/desktop/bg-image-nighttime.jpg')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

class App extends React.Component {
  state = {
    city: "",
    region: "",
    timezone: "",
    hour: "",
    dayOfWeek: "",
    weekOfYear: "",
    date: "",
    timeOfDay: "",
    quote: "",
    quoteAuthor: "",
    showDetails: false,
  };

  intervalID;

  getUserIp = () => {
    const apiUrl = "https://freegeoip.app/json/";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          city: data.city,
          region: data.region_code,
          timezone: data.time_zone,
        })
      );
  };

  getTimezoneData = () => {
    const apiUrl = `https://timezoneapi.io/api/ip/?token=${process.env.REACT_APP_API_KEY}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const timeData = data.data.datetime;
        this.setState({
          hour: timeData.time.slice(0, 5),
          dayOfWeek: timeData.day_full,
          weekOfYear: timeData.week,
          week: timeData.week,
          date: `${timeData.month_full} ${timeData.day} ${timeData.year}`,
          timeOfDay: timeData.timeday_gen,
        });
      });
  };

  getRandomQuote = () => {
    const apiUrl = "https://api.quotable.io/random";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          quote: data.content,
          quoteAuthor: data.author,
        })
      );
  };

  showHideDetails = () => {
    this.setState((state) => ({
      showDetails: !state.showDetails,
    }));
  };

  componentDidMount() {
    this.getUserIp();
    this.getTimezoneData();
    this.getRandomQuote();
    this.intervalID = setInterval(this.getTimezoneData.bind(this), 60000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const {
      city,
      region,
      hour,
      quote,
      quoteAuthor,
      timezone,
      dayOfWeek,
      weekOfYear,
      date,
      timeOfDay,
      showDetails,
    } = this.state;
    return (
      <div
        className="App"
        style={timeOfDay === "evening" ? nightTimeStyle : dayTimeStyle}
      >
        <div
          className={showDetails ? "mainSectionRetracted" : "mainSectionFull"}
        >
          <div className="container">
            <div
              className={showDetails ? "quoteContainerHide" : "quoteContainer"}
            >
              <div>
                <p className="quote">" {quote} "</p>
                <p className="quoteAuthor">{quoteAuthor}</p>
              </div>
              <div>
                <div className="refreshBtn" onClick={this.getRandomQuote}>
                  <i className="fas fa-sync-alt"></i>
                </div>
              </div>
            </div>
            <div className="timeOfDay">
              <div className="greeting">
                {timeOfDay === "evening" ? (
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/desktop/icon-moon.svg`}
                    alt="moon icon"
                  />
                ) : (
                  <img
                      src={`${process.env.PUBLIC_URL}/assets/desktop/icon-sun.svg`}
                      alt="sun icon"
                  />
                )}

                <span>GOOD {timeOfDay.toUpperCase()}, IT'S CURRENTLY</span>
              </div>
              <p className="hour">{hour}</p>
              <p className="location">
                IN {city.toUpperCase()}, {region}
              </p>
            </div>
          </div>
          <div className="detailsBtn" onClick={this.showHideDetails}>
            {showDetails ? "LESS" : "MORE"}
            <img
              src={
                showDetails
                  ? `${process.env.PUBLIC_URL}/assets/desktop/icon-arrow-up.svg`
                  : `${process.env.PUBLIC_URL}/assets/desktop/icon-arrow-down.svg`
              }
              alt=""
            />
          </div>
        </div>

        <AdditionalInfo
          timezone={timezone}
          dayOfWeek={dayOfWeek}
          weekOfYear={weekOfYear}
          date={date}
          timeOfDay={timeOfDay}
          showDetails={showDetails}
        />

        {/* <Transition in={showDetails} timeout={duration}>
          {(state) => (
            <AdditionalInfo
              timezone={timezone}
              dayOfWeek={dayOfWeek}
              weekOfYear={weekOfYear}
              date={date}
              timeOfDay={timeOfDay}
              style={{
                ...defaultStyle,
                ...transitionStyles[state],
              }}
            />
          )}
        </Transition> */}
      </div>
    );
  }
}

export default App;
