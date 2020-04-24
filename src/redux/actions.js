export const TOGGLE_PAGE = 'TOGGLE_PAGE';
export const UPDATE_CURRENT_LOCATION = 'UPDATE_CURRENT_LOCATION';


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
	}
};
