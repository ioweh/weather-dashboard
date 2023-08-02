import React from 'react';
import { act, render } from '@testing-library/react';
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
    const removeFromFavorites = () => {}
    
    it('should display expected favorite name', async () => {
        // Mount the component
        let container;
        await act( async () => ({container} = render(<FavoriteCity favorite={favoriteCity} removeFromFavorites={removeFromFavorites} />)));
        
        expect(container).toHaveTextContent("Hamburg");
    });
});
