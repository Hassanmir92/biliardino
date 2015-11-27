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
      position: google.maps.ControlPosition.RIGHT_CENTER
    } 
  }

  window.map = new google.maps.Map(mapCanvas, mapOptions);

  // Autocomplete
  var input = (document.getElementById('places-input'));
  var autocomplete = new google.maps.places.Autocomplete(input);
  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    // infowindow.close();
    googleMap.place = autocomplete.getPlace();
    console.log(googleMap.place)
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
  $('.all-clubs').append("<div class='tile scroll_"+club._id+"'><a href='"+club.website+"'><h1>"+club.name+"</h1></a><h2>"+club.address+"</h2><div class='toolbar'><div class='toolbar-icon tables'>"+club.numberOfTables+"</div><div class='toolbar-icon booking_"+club.bookable+"'>Bookable</div><div class='club-image' style='background-image: url("+club.image+")'></div><p>"+club.description+"</p></div><hr>")
}

googleMap.clearForm = function(){
  $('#club').trigger("reset");
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
      googleMap.clearForm();
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
    icon: "http://i.imgur.com/zAPrWqA.png"
  });
  
  // Setting up info window based on json bar (name, image, description, facebook) data
  // Adding click listener to open info window when marker is clicked
  marker.addListener('click', function(){
    googleMap.markerClick(marker, club);
  });  
}

googleMap.markerClick = function(marker, club) {
  if(infowindow) infowindow.close();
  // console.log(club._id)
  // console.log($('.scroll_'+club._id));
  scroll();

  function scroll(){
    $('.container').animate({'scrollTop':$('.scroll_'+club._id).offset().top}, 1500);
  }

  infowindow = new google.maps.InfoWindow({
    content:'<div class="infowindow"><h3>'+ club.name +'</h3><h4>'+ club.address +'</h4></div>'
  });

  window.map.setCenter(marker.getPosition());
  infowindow.open(window.map, marker);
};