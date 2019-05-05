var map;
function initMap() {
	var mapOptions = {
	    zoom: 3,
	    center: new google.maps.LatLng(10, -10)
	};
	map = new google.maps.Map(document.getElementById('map-canvas'),
		mapOptions);

	for (var i = photos.data.length - 1; i >= 0; i--) {
		addToMap(createModelFromPhoto(photos.data[i]));
	};

	mapInstaDownloads();
}

function createModelFromPhoto(photo) {
	return {
		caption: photo.caption ? photo.caption.text : null, 
		taken_at: new Date(Number(photo["created_time"])*1000).toLocaleDateString(),
		path: photo.images.standard_resolution.url,
		location: photo.location
	};
}

function addToMap(photo) {
	var infowindow = new google.maps.InfoWindow({
	    content: photoView(photo),
	    maxWidth: 1000
	});
	var marker = new google.maps.Marker({
		        map: map,
		        position: new google.maps.LatLng(photo.location.latitude, photo.location.longitude),
		        title: photo.location.name,
		        icon: 'pin.svg'
		    });
	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.open(map, marker);
  	});
}

function photoView(photo) {
    var html = '<div class="info-window-content">'
    	+ '<img src=' + photo.path + '>'
        + '<p><b>' + photo.taken_at + ':</b> ' + photo.location.name + '</p>';
    if (photo.caption) {
    	html += '<p>' + photo.caption + '</p>';
    }
    html += '</div>'
    return html;
}

function mapInstaDownloads() {
	for (var i = media.photos.length - 1; i >= 0; i--) {
		addToMap(createModelFromInsta(media.photos[i]));
	};
}

function createModelFromInsta(photo) {
	photo.taken_at = new Date(photo.taken_at).toLocaleDateString();
	photo.location = getLocation(photo.location);
	return photo;
}

function getLocation(name) {
	if (name in places) {
		return {
			name: name,
			latitude: places[name]['location']['latitude'],
			longitude: places[name]['location']['longitude']
		};
	} else {
		console.log(name);
		return {
			name: name,
			latitude: 71,
			longitude: 42
		};
	}
}
