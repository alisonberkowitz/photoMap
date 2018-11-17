var map;
function initMap() {
	var mapOptions = {
	    zoom: 10,
	    center: new google.maps.LatLng(42.3581, -71.0636)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);
}