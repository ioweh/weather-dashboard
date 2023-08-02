import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import './index.less';
import SearchResult from '../SearchResult';
import FavoriteCity from '../FavoriteCity';


const CityList = (): JSX.Element => {
    const [citiesWithForecast, setCitiesWithForecast] = useState<any>([]);
    const [cityName, setCityName] = useState("London");

    const navigate = useNavigate();

    const [favoriteCities, setFavoriteCities] = useState<any>([]);

    const storageKey = 'favoriteCities';

    let url = (cityName) => `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${process.env.REACT_APP_SECRET_KEY}`;
    
    const checkGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Handle successful geolocation retrieval
                    const goTo5DayForecastPage = () => navigate(`/forecast/${position.coords.latitude}/${position.coords.longitude}`);
                    goTo5DayForecastPage();
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

    const loadStoredCities = () => {
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

    const fetchData = async (cityName) => {
        try {
            const response = await axios.get(url(cityName));
            setCitiesWithForecast(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const callFetch = useCallback(debounce((event) => {
        fetchData(event);
    }, 500), []);

    // Debounce the input change handler with a specific delay (e.g., 500ms)
    const handleInputChange = (name) => {
        setCityName(name);

        callFetch(name);
    }

    useEffect(() => {
        checkGeolocation();

        loadStoredCities();
        
        fetchData(cityName); // Call the async function to fetch data when the component mounts
    }, []);

    return (
    <div className="weather">
        <span className='weather__header'>Find weather in your city</span>
        <span className='weather__favorites'>
            {favoriteCities.map((fav, index) => 
            <FavoriteCity
              key={index}
              favorite={fav}
              removeFromFavorites={removeFromFavorites}
            />
            )}
        </span>
        <span className='weather__search'>
          <input
            type="text"
            placeholder="Search"
            className='weather__search__input'
            value={cityName}
            onChange={(e) => handleInputChange(e.target.value)} />
        </span>
        {citiesWithForecast.map((cityWithForecast, index) =>
          {
            const isFavorite = favoriteCities.some(fav =>
                cityWithForecast.lat === fav.latitude
                && cityWithForecast.lon === fav.longitude);
            cityWithForecast = {...cityWithForecast, isFavorite};
            return <SearchResult
              key={index * cityWithForecast.lat * cityWithForecast.lon}
              cityWithForecast={cityWithForecast}
              addToFavorites={addToFavorites}/>
          })
        }
    </ div>
    );
}

export default CityList
