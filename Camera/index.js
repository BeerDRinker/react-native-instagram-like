import { ImagePicker, Permissions } from 'expo';

export const pickGalleryImage = async () => {
	const permissions = Permissions.CAMERA_ROLL;
	const { status } = await Permissions.askAsync(permissions);

	if(status === 'granted') {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: false,
			aspect: [16, 9],
		})
		.catch(error => console.log(permissions, { error }));

		return result;
	}
};

export const pickCameraImage = async () => {
	const permissions = Permissions.CAMERA;
	const { status } = await Permissions.askAsync(permissions);

	if(status === 'granted') {
		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: false,
			aspect: [16, 9],
		})
		.catch(error => console.log(permissions, { error }));

		return result;
	}
};