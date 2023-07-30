import React, { useEffect, useState } from 'react';

import './index.less';
import { useNavigate } from 'react-router-dom';

const SearchResult = ({cityWithForecast, addToFavorites}): JSX.Element => {
    const { lat, lon, name, country} = cityWithForecast;
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
        <img 
        src='/gold_star.svg'
        className='searchResult__favorite'
        onClick={handleFavClick} />
    </div>
    )
}

export default SearchResult
