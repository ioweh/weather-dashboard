import React from 'react';
import { useParams } from 'react-router-dom';

const CityForecast = (): JSX.Element => {
    const { lat, lon } = useParams();

    return (
        <>
        <div>{lat}</div>
        <div>{lon}</div>
        </>
    )
}

export default CityForecast
