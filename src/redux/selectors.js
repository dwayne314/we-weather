export const getPage = state => state.currentPage;
export const getLocations = state => state.locations;
export const getCurrentLocation = state => state.locations.find(location => location.id === state.currentLocationId);
export const getForecast = state => state.forecast;
