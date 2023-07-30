import React from 'react';

import './index.less';
import { useNavigate } from 'react-router-dom';

const SearchResult = ({cityWithForecast}): JSX.Element => {
    const { lat, lon, name, country} = cityWithForecast;
    const navigate = useNavigate();

    const formatCoords = (coord) => {
        return coord.toFixed(3);
    }

    const city5DayForecastPage = () => {
        navigate(`forecast/${lat}/${lon}/${name}/${country}`)
    }

    return (
    <div
    onClick={city5DayForecastPage}
    className='searchResult'>
        {name}, {country} ({formatCoords(lat)}, {formatCoords(lon)})
    </div>
    )
}

export default SearchResult
