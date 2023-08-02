import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

import './index.less';
import SearchResult, { CityWithForecastInterface } from '../SearchResult';
import FavoriteCity, { FavoriteCityInterface } from '../FavoriteCity';


const CityList = (): JSX.Element => {
    const [citiesWithForecast, setCitiesWithForecast] = useState<CityWithForecastInterface[]>([]);
    const [cityName, setCityName] = useState("London");

    const navigate = useNavigate();

    const [favoriteCities, setFavoriteCities] = useState<FavoriteCityInterface[]>([]);

    // a key for local storage
    const storageKey = 'favoriteCities';

    let url = (cityName: string) =>
      `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${process.env.REACT_APP_SECRET_KEY}`;
    
    const checkGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Handle successful geolocation retrieval
                    const goTo5DayForecastPage = () =>
                      navigate(`/forecast/${position.coords.latitude}/${position.coords.longitude}`);
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

    const addToFavorites = (city: string, country: string, latitude: number, longitude: number) => {
        const favCity: FavoriteCityInterface = {city, country, latitude, longitude};
        const favExists = !!favoriteCities.filter((city) => JSON.stringify(city) === JSON.stringify(favCity)).length;
        if(!favExists) {
            const favoriteCitiesToSave = [...favoriteCities, favCity];
            // change UI
            setFavoriteCities(favoriteCitiesToSave);
            // save locally
            localStorage.setItem(storageKey, JSON.stringify(favoriteCitiesToSave));
        }
    }

    const removeFromFavorites = (e: React.MouseEvent, fav: FavoriteCityInterface) => {
        e.stopPropagation();

        const filteredFavorites = favoriteCities.filter((city) => JSON.stringify(city) !== JSON.stringify(fav));
        // change UI
        setFavoriteCities(filteredFavorites);
        // save locally
        localStorage.setItem(storageKey, JSON.stringify(filteredFavorites));
    }

    const fetchData = async (cityName: string) => {
        try {
            const response = await axios.get(url(cityName));
            setCitiesWithForecast(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const callFetch = useCallback(debounce((name) => {
        fetchData(name);
    }, 500), []);

    // Debounce the input change handler with a specific delay (e.g., 500ms)
    const handleInputChange = (name: string) => {
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
