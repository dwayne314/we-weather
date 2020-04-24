import { TOGGLE_PAGE, UPDATE_CURRENT_LOCATION } from './actions';

const initialState = {
	currentPage: 'Home',
	currentLocationId: 1, 
	locations: [
		{id: 1, name: 'Chicago'},
		{id: 2, name: 'Miami'},
		{id: 3, name: 'Boston'},
	]
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
			}

		default:
			return state
	}
};

export default rootReducer;
