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

    const [favoriteCities, setFavoriteCities] = useState<any>([]);

    const storageKey = 'favoriteCities';

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

    const loadLocalCities = () => {
        const storedCities = localStorage.getItem(storageKey);
        if (storedCities) {
            setFavoriteCities(JSON.parse(storedCities));
        }
    }

    const addToFavorites = (city, country, latitude, longitude) => {
        const favCity = {city, country, latitude, longitude};
        const favExists = !!favoriteCities.filter((city) => JSON.stringify(city) === JSON.stringify(favCity)).length;
        if(!favExists) {
            const favoriteCitiesToSave = [...favoriteCities, favCity];
            setFavoriteCities(favoriteCitiesToSave);
            localStorage.setItem(storageKey, JSON.stringify(favoriteCitiesToSave));
        }
    }

    const removeFromFavorites = (e, fav) => {
        e.stopPropagation();

        const filteredFavorites = favoriteCities.filter((city) => JSON.stringify(city) !== JSON.stringify(fav));
        setFavoriteCities(filteredFavorites);
        localStorage.setItem(storageKey, JSON.stringify(filteredFavorites));
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
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

        loadLocalCities();
        
        fetchData(); // Call the async function to fetch data when the component mounts
    }, [cityName, latitude, longitude]);

    return (
    <div className="weather">
        <span className='weather__header'>Find weather in your city</span>
        <span className='weather__favorites'>
            {favoriteCities.map(fav => 
                <span
                className='weather__favorites__item'
                onClick={() => navigate(`forecast/${fav.latitude}/${fav.longitude}/${fav.city}/${fav.country}`)}>
                    {fav.city}, {fav.country}
                    <span
                    className='weather__favorites__item__close'
                    onClick={e => removeFromFavorites(e, fav)}>x</span>
                </span>
            )}
        </span>
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
            cityWithForecast={cityWithForecast}
            addToFavorites={addToFavorites}/>
        )}
    </ div>
    );
}

export default CityList
