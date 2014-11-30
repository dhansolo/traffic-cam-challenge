"use strict";

$(document).ready(function() {
	var mapOptions = {
		center: {lat: 47.6, lng: -122.3},
		zoom: 12
	};

	var mapElem = document.getElementById('map');
	var map = new google.maps.Map(mapElem, mapOptions);
	var infoWindow = new google.maps.InfoWindow();
	var markers = [];
	var trafficCamera = "1417398990_boot.png";
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
					    setTimeout(function() {
					    	marker.setAnimation(null);
					    }, 700);
					}
				})
				google.maps.event.addListener(map, 'click', function() {
					infoWindow.close();
				})
				$("search").bind('search keyup'), function() {
					var search = this.value.toLowerCase();
					if(!camera.cameralabel.toLowerCase().indexOf(search) < 0) {
						marker.setMap(map);
					} else {
						marker.setMap(null);
					}
				}
			});
		})
		.fail(function(error) {
			alert("Request Failed");
		})
	});







