export const getMyLocation = () => {
	return new Promise((resolve, reject) => {
		return navigator.geolocation.getCurrentPosition(position => {
			resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
		});
	});
}

export const searchNearBy = (map, location, keyword, callback) => {
	const target = new google.maps.Map(map, {
		center: location,
		zoom: 15,
	});
	const places = new google.maps.places.PlacesService(target);
	places.nearbySearch({
		location: target.center,
		radius: '500',
		name: keyword,
	}, (results, status) => {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			callback(results);
		} else {
			console.log(status)
		}
	});
} 