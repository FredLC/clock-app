import React from "react";
import AdditionalInfo from "./AdditionalInfo";
import "./App.css";

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
    const apiUrl = "http://quotes.stormconsultancy.co.uk/random.json";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          quote: data.quote,
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
      <div className="App">
        <div>
          <p>GOOD {timeOfDay.toUpperCase()}, IT'S CURRENTLY</p>
          <p>{hour}</p>
          <p>
            IN {city}, {region}
          </p>
        </div>
        <div></div>
        <div>
          <p>{quote}</p>
          <p>{quoteAuthor}</p>
          <button onClick={this.getRandomQuote}>REFRESH</button>
        </div>
        <button onClick={this.showHideDetails}>MORE</button>
        {showDetails && (
          <AdditionalInfo
            timezone={timezone}
            dayOfWeek={dayOfWeek}
            weekOfYear={weekOfYear}
            date={date}
          />
        )}
      </div>
    );
  }
}

export default App;
