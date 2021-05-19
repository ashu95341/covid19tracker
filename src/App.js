import { Card, CardContent, FormControl, MenuItem, Select } from "@material-ui/core";
import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData } from "./utils";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({}); //defalt value empty object
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746, lng: -40.4796
  });
  const [mapZoom, SetMapZoom] = useState(3);

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response)=>(response.json()))
    .then((data)=>{
      setCountryInfo(data);
    })
  }, [])


  useEffect(() => {
    //async//promise//function
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((mycountry) => ({
            name: mycountry.country,
            value: mycountry.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  // console.log(countries)
  // console.log(country)

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log(countryCode);
    setCountry(countryCode);

    const url = countryCode === 'Worldwide' ?
     'https://disease.sh/v3/covid-19/all' : 
     `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    //  console.log(url);
    await fetch(url)
    .then((response)=>(response.json()))
    .then((data)=>{ 
      setCountry(countryCode);
      setCountryInfo(data);
    })

    // console.log(countryInfo);

    //worldwide url
    //https://disease.sh/v3/covid-19/all

    //specific country url
    //https://disease.sh/v3/covid-19/countries/[Country-Code]




  };
  return (
    <div className="app">
      <div className="app_left"> 
        <div className="app_header">
          <h1>Covid19 tracker </h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((mycountry) => (
                <MenuItem value={mycountry.value}>{mycountry.name}</MenuItem>
              ))}
              {/* <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Worldwide</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          {/* 1 */}
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          {/* 2 */}
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          {/* 3 */}
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map
        center={mapCenter}
        Zoom = {mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live cases by country</h3>
            <Table countries={tableData}></Table> 
          <h3>Worldwide new cases</h3>
            <LineGraph/>
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
