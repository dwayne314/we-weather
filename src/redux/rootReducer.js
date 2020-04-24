import { TOGGLE_PAGE } from './actions';

const initialState = {
	currentPage: 'Home',
};

const rootReducer = (state=initialState, action) => {
	switch (action.type) {
		case TOGGLE_PAGE:
			return {
				...state,
				currentPage: state.currentPage === 'Home' ? 'Search' : 'Home'
			}

		default:
			return state
	}
};

export default rootReducer;
