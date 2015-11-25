$(document).ready(function(){
  googleMap.initialize();
  $('.add-club').on("click", googleMap.toggleClubForm);
  $('form#club').on('submit', googleMap.addNewClub);
});

var infowindow;
var marker;
var googleMap = googleMap || {};

googleMap.initialize = function() {
  googleMap.indexClub();

  var mapCanvas = document.getElementById('map');
  var center = new google.maps.LatLng(51.517557, -0.095624);
  var mapOptions = {
    center: center,
    zoom: 13,
    styles: mapStyle,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapMaker: true,
    mapTypeControl: false,
    streetViewControl: false,
    panControl: false,
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.SMALL,
      position: google.maps.ControlPosition.LEFT_TOP
    } 
  }

  window.map = new google.maps.Map(mapCanvas, mapOptions);

  // Autocomplete
  var input = (document.getElementById('places-input'));
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    // infowindow.close();
    googleMap.place = autocomplete.getPlace();
    if (!googleMap.place.geometry) {
      return;
    }
    if (googleMap.place.geometry.viewport) {
      map.fitBounds(googleMap.place.geometry.viewport);
    } else {
      map.setCenter(googleMap.place.geometry.location);
      map.setZoom(17);
    }
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    window.map.setCenter(center);
  });

  googleMap.addClubs();
}

googleMap.addNewClub = function(){
  console.log(googleMap.place)
  event.preventDefault();
  var method = "post"
  var url    = "http://localhost:3000/api/clubs"
  var data   = {
    name: $('form#club #name').val(),
    description: $('form#club #description').val(),
    image: googleMap.place.photos[0].getUrl({ 'maxWidth': 500, 'maxHeight': 500 }),
    website: googleMap.place.website,
    numberOfTables: $('form#club #numberOfTables').val(),
    bookable: $('form#club #bookable').val(),
    address: $('form#club #places-input').val(),
    lng: googleMap.place.geometry.location.lng(),
    lat: googleMap.place.geometry.location.lat()
  }
  console.log(data);

  $.ajax({
    method: method,
    url: url,
    data: data
  }).done(function(data){
    $('.all-clubs').html('');
    googleMap.indexClub();
    console.log(data)
    googleMap.addClubs(data);
    googleMap.toggleClubForm();
  });
}

googleMap.indexClub = function(){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/api/clubs"
  }).done(function(data){
    $.each(data.clubs, function(index, club){
      googleMap.showClub(club)
    })
  })
}

googleMap.showClub = function(club){
  $('.all-clubs').append("<div class='tile'><h1>"+club.name+"</h1><h2>"+club.address+"</h2><div class='toolbar'><button class='tables'>"+club.numberOfTables+"</button><button class='booking_"+club.bookable+"'>Bookable</button><button class='website'>"+club.website+"</button><img src='images/search.png' width='25'></div><img src='"+club.image+"' width='412'><hr><p>"+club.description+"</p></div>")
}

googleMap.addClubs = function(){
  // Making ajax call to back-end in order to retrieve json bar data
  var ajax = $.ajax({
    method: "get",
    url: 'http://localhost:3000/api/clubs'
  }).done(function(data){
    console.log("DATA", data);
    $.each(data.clubs, function(index, club){
      (function(){
        setTimeout(function() {
          googleMap.addClub(club);
        }, (index+1) * 200);
      }(club, index));
    });
  });
}

googleMap.toggleClubForm = function(){
  $('.club-form').slideToggle("slow");
}

googleMap.addClub = function(club, index) {
  // Setting up marker based on json bar (name, lat, lng) data
  var marker = new google.maps.Marker({
    position: {lat: club.lat, lng: club.lng},
    map: window.map,
    title: club.name,
    // animation: google.maps.Animation.DROP,
    // icon: "http://i.imgur.com/mKPqLrX.png"
  });
  
  // Setting up info window based on json bar (name, image, description, facebook) data
  // Adding click listener to open info window when marker is clicked
  marker.addListener('click', function(){
    googleMap.markerClick(marker, club);
  });  
}

googleMap.markerClick = function(marker, club) {
  if(infowindow) infowindow.close();

  infowindow = new google.maps.InfoWindow({
    content:'<h1>'+ club.name +'</h1>'
    // '<div id="map_window">'+
    // '<h2 id="map_title">' + bar.name + '</h2>'+
    // '<div id="map_content">'+
    // '<div class="bar_image" style="background-image: url('+ bar.image +')"></div>' +
    // '<p id="map_address">' + bar.address + '</p>' +
    // '<p id="map_description">' + bar.description + '</p>' +
    // '<a href="https://citymapper.com/directions?endcoord='
    // + bar.lat + ',' + bar.lng + '&endname=' + bar.name +'" target="_blank"><img class="citymapper" src="../images/custom-citymapper.png"></a>' +
    // '</div>'+
    // '</div>'
  });

  window.map.setCenter(marker.getPosition());
  infowindow.open(window.map, marker);
};