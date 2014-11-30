// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function() {
	var mapOptions = {
		center: {lat: 47.6, lng: -122.3},
		zoom: 12
	};

	var mapElem = document.getElementById('map');
	var map = new google.maps.Map(mapElem, mapOptions);
	var infoWindow = new google.maps.InfoWindow();
	var markers = [];
	var trafficCamera = "1417362329_boot.png";
	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
		.done(function(data) {
			data.forEach(function(data) {
				var position = {
					lat: Number(data.location.latitude),
					lng: Number(data.location.longitude)
				};
				var marker = new google.maps.Marker({
					position: position,
					map: map,
					icon: trafficCamera
				});
				markers.push(marker);
				google.maps.event.addListener(marker, 'click', function() {
					map.panTo(marker.getPosition());
					var string = '<p>' + data.cameralabel + '<p>';
					string += '<img src=' + data.imageurl.url + '>';
					infoWindow.setContent(string);
					infoWindow.open(map, this);
					if (marker.getAnimation() != null) {
						marker.setAnimation(null);
					} else {
					    marker.setAnimation(google.maps.Animation.BOUNCE);
					}
				})
				google.maps.event.addListener(map, 'click', function() {
					infoWindow.close();
				})
			});
		})
		.fail(function(error) {
			alert("Request Failed");
		})
	});







