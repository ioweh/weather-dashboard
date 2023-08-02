import React from 'react';
import { act, render } from '@testing-library/react';
import SearchResult from './index';
import '@testing-library/jest-dom/extend-expect';

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));


describe('Search result', () => {
  it('should display the expected city name', async () => {
    const cityWithForecast = {lat: 0, lon: 0, name: "Hamburg", country: "GE", isFavorite: true};
    const addToFavorites = () => {};
    // Mount the component
    let container;
    await act( async () => ({container} = render(<SearchResult cityWithForecast={cityWithForecast} addToFavorites={addToFavorites} />)));

    expect(container).toHaveTextContent("Hamburg");
  });
});
