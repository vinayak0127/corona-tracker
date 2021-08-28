import { CardContent, FormControl, MenuItem, Card } from "@material-ui/core";
import { React, useState, useEffect } from "react";
import "./App.css";
import Select from "@material-ui/core/Select";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "wordlwide"
        ? "https://disease.sh/v3/covid-19/all/"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
    //https://disease.sh/v3/covid-19/all/
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
  };
  return (
    <div className="App">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid 19 Tracker </h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worlwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* infoboxes */}
        <div className="app_stats">
          <InfoBox title="Coronavirus cases" cases={4000000} total={2000} />
          <InfoBox title="Recovered cases" cases={4000000} total={3000} />
          <InfoBox title="Death cases" cases={4000000} total={4000} />
        </div>

        {/* map */}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          {/* table */}
          <h3>Worldwide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
