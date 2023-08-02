import React from 'react';
import { act, render } from '@testing-library/react';
import CityDetailedForecast from './index';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ state: {oneDayForecast: []}}),
}));


describe('CityDetailedForecast', () => {
  it('should render tabs component', async () => {
    // Mount the component
    let container;
    await act( async () => ({container} = render(<CityDetailedForecast />)));
    const tabsContainer = container.getElementsByClassName('tabs-container')[0];

    expect(tabsContainer).toBeInTheDocument();
  });
});
