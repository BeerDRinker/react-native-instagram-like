import { ADD_IMAGE, ADD_AVATAR, CHANGE_FIRST_NAME, CHANGE_LAST_NAME, } from '../actionTypes/index';

export const addImage = (image) => {
	return {
		type: ADD_IMAGE,
		payload: image
	}
}

export const addAvatar = (avatar) => {
	return {
		type: ADD_AVATAR,
		payload: avatar
	}
}

export const changeFirstName = (firstname) => {
	return {
		type: CHANGE_FIRST_NAME,
		payload: firstname
	}
}

export const changeLastName = (lastname) => {
	return {
		type: CHANGE_LAST_NAME,
		payload: lastname
	}
}