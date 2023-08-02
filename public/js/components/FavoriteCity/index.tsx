import React from 'react';
import { useNavigate } from 'react-router-dom';

import './index.less';


export interface FavoriteCityInterface {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
}


const FavoriteCity = ({favorite, removeFromFavorites}:
  {
    favorite: FavoriteCityInterface,
    removeFromFavorites: (e: React.MouseEvent, favorite: FavoriteCityInterface) => void
  }): JSX.Element => {
    const { latitude, longitude, city, country} = favorite;
    const navigate = useNavigate();

    return (
    <span
      className='favorite__item'
      onClick={() => navigate(`forecast/${latitude}/${longitude}/${city}/${country}`)}>
        {city}, {country}
        <img
          src='/remove.png'
          className='favorite__item__remove'
          onClick={e => removeFromFavorites(e, favorite)} />
    </span>
    )
}

export default FavoriteCity
