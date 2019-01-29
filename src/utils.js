export const getMyLocation = () => {
	return new Promise((resolve, reject) => {
		return navigator.geolocation.getCurrentPosition(position => {
			resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude });
		});
	});
}