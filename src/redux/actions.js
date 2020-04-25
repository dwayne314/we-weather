import { mockApiResponse } from '../utils/utils';


export const TOGGLE_PAGE = 'TOGGLE_PAGE';
export const UPDATE_CURRENT_LOCATION = 'UPDATE_CURRENT_LOCATION';
export const UPDATE_FORECAST = 'UPDATE_FORECAST';


export const togglePage = () => {
	return {
		type: TOGGLE_PAGE
	};
};

export const updateCurrentLocation = (locationId) => {
	return {
		type: UPDATE_CURRENT_LOCATION,
		payload: {
			locationId
		}
	};
};

export const updateForecast = (forecast) => {
	return {
		type: UPDATE_FORECAST,
		payload: {
			forecast
		}
	};
};

export const fetchForecast = (location) => dispatch => {
	mockApiResponse(location)
		.then(data => dispatch(updateForecast(data)))
};
