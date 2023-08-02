import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.less';


const FavoriteCity = ({favorite, removeFromFavorites}): JSX.Element => {
    const { latitude, longitude, city, country} = favorite;
    const navigate = useNavigate();

    return (
    <span
      className='favorite__item'
      onClick={() => navigate(`forecast/${latitude}/${longitude}/${city}/${country}`)}>
        {city}, {country}
        <img
          src='/remove.png'
          className='favorite__item__close'
          onClick={e => removeFromFavorites(e, favorite)} />
    </span>
    )
}

export default FavoriteCity
