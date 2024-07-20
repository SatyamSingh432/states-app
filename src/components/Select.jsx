import { useEffect, useState } from 'react';

export default function MultipleSelectPlaceholder() {
    const [selectCountry, setSelectContry] = useState([]);
    const [selectState, setSelectState] = useState([]);
    const [countryName, setCountryName] = useState('');
    const [stateName, setStateName] = useState('');
    const [selectCity, setSelectCity] = useState([]);
    const [cityName, setCityName] = useState('');
    const [stateDisable, setStateDisable] = useState(true);
    const [stateCity, setCityDisable] = useState(true);

    const handleCountryChange = (event) => {
        setCountryName(event.target.value);
        setStateDisable(false);
        stateData(event.target.value);
    };
    const handleStateChange = (event) => {
        setStateName(event.target.value);
        setCityDisable(false);

        cityData(event.target.value);
    };
    const handleCityChange = (event) => {
        setCityName(event.target.value);
    };
    useEffect(() => {
        async function countryData() {
            try {
                const res = await fetch(
                    'https://crio-location-selector.onrender.com/countries'
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

    async function stateData(countryValue) {
        try {
            const res = await fetch(
                `https://crio-location-selector.onrender.com/country=${countryValue}/states`
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

    async function cityData(stateValue) {
        try {
            const res = await fetch(
                `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateValue}/cities`
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

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
            }}
        >
            <h1>Select Location</h1>
            <div style={{ display: 'flex' }}>
                <select value={countryName} onChange={handleCountryChange}>
                    <option value=''>
                        <em>Select Country</em>
                    </option>
                    {selectCountry.map((ele) => {
                        return (
                            <option key={ele} value={ele}>
                                {ele}
                            </option>
                        );
                    })}
                </select>
                <select
                    value={stateName}
                    disabled={stateDisable}
                    onChange={handleStateChange}
                >
                    <option value=''>
                        <em>Select State</em>
                    </option>
                    {selectState.map((ele) => {
                        return (
                            <option key={ele} value={ele}>
                                {ele}
                            </option>
                        );
                    })}
                </select>
                <select
                    value={cityName}
                    onChange={handleCityChange}
                    disabled={stateCity}
                >
                    <option value=''>
                        <em>Select City</em>
                    </option>
                    {selectCity.map((ele) => {
                        return (
                            <option key={ele} value={ele}>
                                {ele}
                            </option>
                        );
                    })}
                </select>
            </div>
            {countryName && stateName && cityName && (
                <span
                    style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        fontFamily: 'Sans-serif',
                        paddingRight: '6px',
                    }}
                >
                    You selected {`${cityName},`}
                    {` ${stateName}, ${countryName}`}
                </span>
            )}
        </div>
    );
}
