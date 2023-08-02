import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import SearchResult from './index';
import '@testing-library/jest-dom/extend-expect';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));


describe('Search result', () => {
    const cityWithForecast = {lat: 0, lon: 0, name: "Hamburg", country: "GE", isFavorite: true};
    const addToFavorites = jest.fn();
    
    it('should display the expected city name and expected country', async () => {
        // Mount the component
        let container;
        await act( async () => ({container} = render(<SearchResult
            cityWithForecast={cityWithForecast}
            addToFavorites={addToFavorites} />)));
        
        expect(container).toHaveTextContent("Hamburg");
        expect(container).toHaveTextContent("GE");
    });

    it('should add the city to favorites', async () => {
        // Mount the component
        let container;
        await act( async () => ({container} = render(<SearchResult
            cityWithForecast={cityWithForecast}
            addToFavorites={addToFavorites} />)));
        const addToFavoritesButton = container.getElementsByClassName('searchResult__favorite')[0];
        fireEvent.click(addToFavoritesButton);
        
        expect(addToFavorites).toHaveBeenCalled();
    });
});
