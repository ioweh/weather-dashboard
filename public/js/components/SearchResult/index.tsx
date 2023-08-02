import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.less';


export interface CityWithForecastInterface {
    lat: number;
    lon: number;
    name: string;
    country: string;
    isFavorite?: boolean;
}


const SearchResult = (
    {cityWithForecast, addToFavorites}:
    {
        cityWithForecast: CityWithForecastInterface,
        addToFavorites: (
            name: string,
            country: string,
            lat: number,
            lon: number,
        ) => void,
    }
    ): JSX.Element => {
    const { lat, lon, name, country, isFavorite} = cityWithForecast;
    const navigate = useNavigate();

    const formatCoords = (coord: number) => {
        return coord.toFixed(3);
    }

    const city5DayForecastPage = () => {
        navigate(`forecast/${lat}/${lon}/${name}/${country}`)
    }

    const handleFavClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToFavorites(name, country, lat, lon);
    };

    return (
    <div
    onClick={city5DayForecastPage}
    className='searchResult'>
        <span>{name}, {country} ({formatCoords(lat)}, {formatCoords(lon)})</span>
        {isFavorite ? <img 
          src='/gold_star.svg'
          className='searchResult__favorite'
          onClick={handleFavClick} /> :
        <img
          src='/empty_star.png'
          className='searchResult__favorite'
          onClick={handleFavClick} />}
    </div>
    )
}

export default SearchResult
