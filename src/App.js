import { FormControl, Select, MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //usestate
  const [countries, setCountries] = useState([]);
  const [Worldcountry, setCountry] = useState("Worldwide");
  //https://disease.sh/v3/covid-19/countries
  //useeffect to pull api = Runs a piece of code based on given condition
  useEffect(() => {
    //async -> send request ,wait for it to do smthingwith
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
    setCountry();
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("countrycode---------->", countryCode);
  };
  return (
    <div className="App">
      <div className="app_header">
        <h1>Covid 19 Tracker </h1>
        <FormControl className="app_dropdown">
          <Select
            varient="outlined"
            onChange={onCountryChange}
            value={Worldcountry}
          >
            {/* Loop thru all the country and show in drop down lis tof the option */}
            {/* use states */}
            <MenuItem value="worldwide">Worlwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}
            {/* 
            <MenuItem value="worldwide">option 1</MenuItem>
            <MenuItem value="worldwide">option 2</MenuItem>
            <MenuItem value="worldwide">option 3</MenuItem>
            <MenuItem value="worldwide">option 4</MenuItem> */}
          </Select>
        </FormControl>
      </div>
      {/* Header

      Title + Select input dropdown field
//1:28:00
      InfoBoxs

      InfoBoxs

      Table

      Graph 

      Map  */}
    </div>
  );
}

export default App;
