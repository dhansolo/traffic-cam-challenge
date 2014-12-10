"use strict";

$(document).ready(function() {
	var mapOptions = {
		center: {lat: 47.6, lng: -122.3},
		zoom: 12
	};

	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);
	var infoWin = new google.maps.InfoWindow();
	var cameras = [];
	var trafficCamera = "1417398990_boot.png";
	$.getJSON('http://data.seattle.gov/resource/65fc-btcc.json')
		.done(function(data) {
			data.forEach(function(data) {
				var position = {
					lat: (Number)(data.location.latitude),
					lng: (Number)(data.location.longitude)
				};
				var camera = new google.maps.Marker({
					position: position,
					map: map,
					icon: trafficCamera
				});
				cameras.push(camera);
				google.maps.event.addListener(camera, 'click', function() {
					map.panTo(camera.getPosition());
					var string = '<p>' + data.cameralabel + '</p>' +'<img src=' + data.imageurl.url + '>';
					infoWin.setContent(string);
					infoWin.open(map, this);
					if (camera.getAnimation() != null) {
						camera.setAnimation(null);
					} else {
					    camera.setAnimation(google.maps.Animation.BOUNCE);
					    setTimeout(function() {
					    	camera.setAnimation(null);
					    }, 700);
					}
				})
				google.maps.event.addListener(map, 'click', function() {
					infoWin.close();
				});
				$('#search').bind('search keyup', function() {
					var search = this.value.toLowerCase();
					if(data.cameralabel.toLowerCase().indexOf(search) < 0) {
						camera.setMap(null);
					} else {
						camera.setMap(map);
					}
				})
			})
		})
		.fail(function(error) {
			alert("Request Failed");
		})
	});






