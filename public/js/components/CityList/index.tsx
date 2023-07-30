import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './index.less';
import SearchResult from '../SearchResult';

const CityList = (): JSX.Element => {
    const [citiesWithForecast, setCitiesWithForecast] = useState<any>([]);
    const [cityName, setCityName] = useState("London");
    const [latitude, setLatitude] = useState<any>(null);
    const [longitude, setLongitude] = useState<any>(null);
    const navigate = useNavigate();

    let url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=b35ef7587dfa519e18d36e86584481a2`;
    
    const getGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Handle successful geolocation retrieval
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    // Handle geolocation error
                    console.error('Error getting geolocation:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                console.log(response.data)
                setCitiesWithForecast(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getGeolocation();
        const goTo5DayForecastPage = () => navigate(`/forecast/${latitude}/${longitude}`);
        if (latitude && longitude) {
            goTo5DayForecastPage();
        }
        
        fetchData(); // Call the async function to fetch data when the component mounts
    }, [cityName]);

    return (
    <div className="weather">
        <span className='weather__header'>Find weather in your city</span>
        <span className='weather__search'>
            <input
            type="text"
            placeholder="Search"
            value={cityName}
            className='weather__search__input'
            onChange={(e) => setCityName(e.target.value)} />
        </span>
        {citiesWithForecast.map((cityWithForecast, index) =>
        <SearchResult
            key={index * cityWithForecast.lat * cityWithForecast.lon}
            cityWithForecast={cityWithForecast}/>
        )}
    </ div>
    );
}

export default CityList
