import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import FavoriteCity from './index';
import '@testing-library/jest-dom/extend-expect';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));


describe('Favorite city', () => {
    const favoriteCity = {
        latitude: 0,
        longitude: 0,
        city: "Hamburg",
        country: "DE",
    }
    const removeFromFavorites = jest.fn();
    
    it('should display expected favorite name and country', async () => {
        // Mount the component
        let container;
        await act( async () => ({container} = render(<FavoriteCity favorite={favoriteCity} removeFromFavorites={removeFromFavorites} />)));
        
        expect(container).toHaveTextContent("Hamburg");
        expect(container).toHaveTextContent("DE");
    });
    
    it('should be able to remove a city from favorites', async () => {
        // Mount the component
        let container;
        await act( async () => ({container} = render(<FavoriteCity favorite={favoriteCity} removeFromFavorites={removeFromFavorites} />)));
        const removeFromFavoritesButton = container.getElementsByClassName('favorite__item__remove')[0];
        fireEvent.click(removeFromFavoritesButton);
        
        expect(removeFromFavorites).toHaveBeenCalled();
    });
});
