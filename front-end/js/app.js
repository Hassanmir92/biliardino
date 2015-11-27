$(document).ready(function(){
  biliardino.initialize();
  $('.add-club').on("click", biliardino.toggleClubForm);
  $('form#club').on('submit', biliardino.addNewClub);
});

var infowindow;
var marker;
var biliardino = biliardino || {};

biliardino.initialize = function() {
  biliardino.indexClub();

  var mapCanvas = document.getElementById('map');
  var center = new google.maps.LatLng(51.522857, -0.103897);
  var mapOptions = {
    center: center,
    zoom: 12,
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
    biliardino.place = autocomplete.getPlace();
    console.log(biliardino.place)
    if (!biliardino.place.geometry) {
      return;
    }
    if (biliardino.place.geometry.viewport) {
      map.fitBounds(biliardino.place.geometry.viewport);
    } else {
      map.setCenter(biliardino.place.geometry.location);
      map.setZoom(17);
    }
  });

  google.maps.event.addDomListener(window, 'resize', function() {
    window.map.setCenter(center);
  });

  biliardino.addClubs();
}

biliardino.addNewClub = function(){
  console.log(biliardino.place)
  event.preventDefault();
  var method = "post"
  var url    = "http://localhost:3000/api/clubs"
  var data   = {
    name: $('form#club #name').val(),
    description: $('form#club #description').val(),
    image: biliardino.place.photos[0].getUrl({ 'maxWidth': 500, 'maxHeight': 500 }),
    website: biliardino.place.website,
    numberOfTables: $('form#club #numberOfTables').val(),
    bookable: $('form#club #bookable').val(),
    address: $('form#club #places-input').val(),
    lng: biliardino.place.geometry.location.lng(),
    lat: biliardino.place.geometry.location.lat()
  }
  console.log(data);

  $.ajax({
    method: method,
    url: url,
    data: data
  }).done(function(data){
    $('.all-clubs').html('');
    biliardino.indexClub();
    console.log(data)
    biliardino.addClubs(data);
    biliardino.toggleClubForm();
  });
}

biliardino.indexClub = function(){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/api/clubs"
  }).done(function(data){
    $.each(data.clubs, function(index, club){
      biliardino.showClub(club)
    })
  })
}

biliardino.showClub = function(club){
  $('.all-clubs').append("<div class='tile scroll_"+club._id+"'><a href='"+club.website+"' target='_blank'><h1>"+club.name+"</h1></a><h2>"+club.address+"</h2><div class='toolbar'><div class='toolbar-icon tables'>"+club.numberOfTables+"</div><a href='"+club.website+"' target='_blank'><div class='toolbar-icon booking_"+club.bookable+"'>Bookable</div></a><div class='club-image' style='background-image: url("+club.image+")'></div><p>"+club.description+"</p></div><hr>")
}

biliardino.clearForm = function(){
  $('#club').trigger("reset");
}

biliardino.addClubs = function(){
  // Making ajax call to back-end in order to retrieve json bar data
  var ajax = $.ajax({
    method: "get",
    url: 'http://localhost:3000/api/clubs'
  }).done(function(data){
    console.log("DATA", data);
    $.each(data.clubs, function(index, club){
      biliardino.addClub(club);
      biliardino.clearForm();
    });
  });
}

biliardino.toggleClubForm = function(){
  $('.club-form').slideToggle("slow");
}

biliardino.addClub = function(club, index) {
  // Setting up marker based on json bar (name, lat, lng) data
  var marker = new google.maps.Marker({
    position: {lat: club.lat, lng: club.lng},
    map: window.map,
    title: club.name,
    icon: "http://i.imgur.com/zAPrWqA.png"
  });
  
  // Adding click listener to open info window when marker is clicked
  marker.addListener('click', function(){
    biliardino.markerClick(marker, club);
  });  
}

biliardino.markerClick = function(marker, club) {
  if(infowindow) infowindow.close();

  $('.container').scrollTo($('.scroll_'+club._id), 1000)

  infowindow = new google.maps.InfoWindow({
    content:'<div class="infowindow"><h3>'+ club.name +'</h3><h4>'+ club.address +'</h4></div>'
  });

  window.map.setCenter(marker.getPosition());
  infowindow.open(window.map, marker);
};