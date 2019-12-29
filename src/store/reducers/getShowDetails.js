import { SET_SHOW_DETAILS } from '../actions/actionTypes'

const initialState = {
	showDetails: [],
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
	case SET_SHOW_DETAILS:
		return {
			...state,
			showDetails: action.payload.showDetails,
		}
	default:
		return state
	}
}

export default reducer
