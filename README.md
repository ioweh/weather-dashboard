## Instructions to run the app locally

- `npm install`
- `npm start`
- open `http://localhost:3000` in the browser

## Running tests

- `npm test`

The tests also run on each push to the repository in the master branch.

## Live version

The application is deployed to Firebase and is available at this URL:

https://weather-dashboard-forecast.web.app/

Once the page opens the permission to access location is requested. If the user allows it, the page showing a forecast for the current user location is opened automatically. Otherwise, the search bar is displayed where the city can be searched. It's also possible to add cities to the favorites panel at the top of the page and remove them from there. The list of cities is stored in the local storage.

The page for showing forecasts for the following 5 days is either displayed automatically, when the access to location is allowed, or opened by clicking on the search results in the list, or by clicking on the favorite cities at the top of the page.

Moving through the cities is possible by clicking on the left and right arrows on that page. The forecasts are displayed with the 24 hours interval starting from the current time.

By clicking on the image for the weather, it's possible to go further into the details for the rendered city forecast. Once clicked, three charts are displayed on different tabs. The first tab contains results for temperature for the current day starting from the current time with 3 hour intervals. The second tab contains humidity data and the third tab the data for the wind speed in the same manner.
