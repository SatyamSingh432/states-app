import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function MultipleSelectPlaceholder() {
  const [selectCountry, setSelectContry] = useState([]);
  const [selectState, setSelectState] = useState([]);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [selectCity, setSelectCity] = useState([]);
  const [cityName, setCityName] = useState("");
  const [stateDisable, setStateDisable] = useState(true);
  const [stateCity, setCityDisable] = useState(true);

  const handleCountryChange = (event) => {
    setCountryName(event.target.value);
    setStateDisable(false);
  };
  const handleStateChange = (event) => {
    setStateName(event.target.value);
    setCityDisable(false);
  };
  const handleCityChange = (event) => {
    setCityName(event.target.value);
  };
  useEffect(() => {
    async function countryData() {
      try {
        const res = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        if (!res.ok) {
          throw new Error();
        }
        const countries = await res.json();
        setSelectContry(countries);
      } catch (error) {
        console.log(error);
      }
    }
    countryData();
  }, []);
  useEffect(() => {
    async function stateData() {
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${countryName}/states`
        );
        if (!res.ok) {
          throw new Error();
        }
        const statesResult = await res.json();
        setSelectState(statesResult);
      } catch (error) {
        console.log(error);
      }
    }
    stateData();
  }, [countryName]);
  useEffect(() => {
    async function cityData() {
      try {
        const res = await fetch(
          `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`
        );
        if (!res.ok) {
          throw new Error();
        }
        const cityResult = await res.json();
        setSelectCity(cityResult);
      } catch (error) {
        console.log(error);
      }
    }
    cityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateName]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
      }}
    >
      <h1>Select Location</h1>
      <div style={{ display: "flex" }}>
        <FormControl sx={{ ml: 1, mt: 2, minWidth: 350 }}>
          <Select
            value={countryName}
            onChange={handleCountryChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Select Country</em>
            </MenuItem>
            {selectCountry.map((ele) => {
              return (
                <MenuItem key={ele} value={ele}>
                  {ele}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ ml: 3, mt: 2, minWidth: 220 }}>
          <Select
            value={stateName}
            disabled={stateDisable}
            onChange={handleStateChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Select State</em>
            </MenuItem>
            {selectState.map((ele) => {
              return (
                <MenuItem key={ele} value={ele}>
                  {ele}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ ml: 3, mt: 2, minWidth: 200 }}>
          <Select
            value={cityName}
            onChange={handleCityChange}
            disabled={stateCity}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em>Select City</em>
            </MenuItem>
            {selectCity.map((ele) => {
              return (
                <MenuItem key={ele} value={ele}>
                  {ele}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      {countryName && stateName && cityName && (
        <p>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "600",
              fontFamily: "Sans-serif",
              paddingRight: "6px",
            }}
          >
            You Selected
          </span>
          <span
            style={{
              fontSize: "30px",
              fontWeight: "600",
              fontFamily: "Sans-serif",
            }}
          >
            {`${cityName},`}
          </span>
          <span
            style={{
              fontSize: "20px",
              fontWeight: "600",
              fontFamily: "Sans-serif",
            }}
          >
            {` ${stateName}, ${countryName}`}
          </span>
        </p>
      )}
    </div>
  );
}
