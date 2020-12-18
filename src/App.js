import React from "react";
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
    quote: "",
    quoteAuthor: "",
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

  componentDidMount() {
    this.getUserIp();
    this.getTimezoneData();
    this.getRandomQuote();
  }

  render() {
    const {
      city,
      region,
      timezone,
      hour,
      dayOfWeek,
      week,
      date,
      quote,
      quoteAuthor,
    } = this.state;
    return (
      <div className="App">
        <div>
          <p>{city}</p>
          <p>{region}</p>
          <p>{timezone}</p>
        </div>
        <div>
          <p>{hour}</p>
          <p>{dayOfWeek}</p>
          <p>{week}</p>
          <p>{date}</p>
        </div>
        <div>
          <p>{quote}</p>
          <p>{quoteAuthor}</p>
        </div>
      </div>
    );
  }
}

export default App;
