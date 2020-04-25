import { TOGGLE_PAGE, UPDATE_CURRENT_LOCATION, UPDATE_FORECAST } from './actions';

const initialState = {
	currentPage: 'Home',
	currentLocationId: 1, 
	locations: [
		{id: 1, city: 'Chicago', state: 'IL'},
		{id: 2, city: 'Miami', state: 'FL'},
		{id: 3, city: 'Boston', state: 'MA'},
	],
	forecast: undefined
};

const rootReducer = (state=initialState, action) => {
	switch (action.type) {
		case TOGGLE_PAGE:
			return {
				...state,
				currentPage: state.currentPage === 'Home' ? 'Search' : 'Home'
			}

		case UPDATE_CURRENT_LOCATION:
			const { locationId } = action.payload;

			return {
				...state,
				currentLocationId: locationId
			};

		case UPDATE_FORECAST:
			const { forecast } = action.payload;
			return {
				...state,
				forecast: forecast
			};

		default:
			return state
	}
};

export default rootReducer;
