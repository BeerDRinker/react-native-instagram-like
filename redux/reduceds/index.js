import { ADD_IMAGE, ADD_AVATAR, CHANGE_FIRST_NAME, CHANGE_LAST_NAME, } from '../actionTypes/index';

const initialState = {
	images: [],
	user: {
		firstName: 'John',
		lastName: 'Doe',
		avatar: ''
	}
};

export default function rootReducers(state = initialState, action) {
	switch(action.type) {

		case ADD_IMAGE:
		return { ...state, images: state.images.concat(action.payload) };

		case ADD_AVATAR:
		return { ...state, user: {...state.user, avatar: action.payload} };

		case CHANGE_FIRST_NAME:
			return { ...state, user: { ...state.user, firstName: action.payload }}

		case CHANGE_LAST_NAME:
			return { ...state, user: { ...state.user, lastName: action.payload }}

		default:
			return state;
	}
}