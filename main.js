var map;
function initMap() {
	var mapOptions = {
	    zoom: 3,
	    center: new google.maps.LatLng(42.3581, -71.0636)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	for (var i = photos.data.length - 1; i >= 0; i--) {
		addToMap(photos.data[i]);
	};
}

function addToMap(photo) {
	console.log(photo);
	var infowindow = new google.maps.InfoWindow({
	    content: photoView(photo),
	    maxWidth: 1000
	});
	var marker = new google.maps.Marker({
		        map: map,
		        position: new google.maps.LatLng(photo.location.latitude, photo.location.longitude),
		        title: photo.location.name,
		        icon: '/pin.svg'
		    });
	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.open(map, marker);
  	});
}

function photoView(photo) {
    var html = '<div class="info-window-content">'
    	+ '<img src=' + photo.images.standard_resolution.url + '>'
        + '<p><b>' + new Date(Number(photo["created_time"])*1000).toLocaleDateString() + ':</b> ' + photo.location.name + '</p>';
    if (photo.caption) {
    	html += '<p>' + photo.caption.text + '</p>';
    }
    html += '</div>'
    return html;
}