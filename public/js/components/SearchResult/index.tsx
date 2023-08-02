import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.less';


const SearchResult = ({cityWithForecast, addToFavorites}): JSX.Element => {
    const { lat, lon, name, country, isFavorite} = cityWithForecast;
    const navigate = useNavigate();

    const formatCoords = (coord) => {
        return coord.toFixed(3);
    }

    const city5DayForecastPage = () => {
        navigate(`forecast/${lat}/${lon}/${name}/${country}`)
    }

    const handleFavClick = (e) => {
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
