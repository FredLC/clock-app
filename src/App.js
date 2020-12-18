import React from "react";
import "./App.css";

class App extends React.Component {
  state = {
    city: "",
    region: "",
    timezone: "",
    hour: "",
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
      .then((data) =>
        this.setState({
          hour: data.data.datetime.time.slice(0, 5),
        })
      );
  };

  getRandomQuote = () => {
    const apiUrl = "http://quotes.stormconsultancy.co.uk/random.json";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  componentDidMount() {
    this.getUserIp();
    this.getTimezoneData();
    this.getRandomQuote();
  }

  render() {
    const { city, region, timezone, hour } = this.state;
    return (
      <div className="App">
        <div>
          <p>{city}</p>
          <p>{region}</p>
          <p>{timezone}</p>
        </div>
        <div>
          <p>{hour}</p>
        </div>
      </div>
    );
  }
}

export default App;
