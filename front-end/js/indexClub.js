$(indexClub)

function indexClub(){
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/api/clubs"
  }).done(function(data){
    $.each(data.clubs, function(index, club){
      console.log(club)
      showClub(club)
    })
  })
}

function showClub(club){
  $('.sidebar').append("<div class='tile'><h1>"+club.name+"</h1><h2>"+club.address+"</h2><div class='toolbar'><button class='tables'>"+club.numberOfTables+"</button><button class='booking_"+club.bookable+"'>Bookable</button><button class='website'>"+club.website+"</button><img src='images/search.png' width='25'></div><img src='"+club.image+"' width='412'><hr><p>"+club.description+"</p></div>")
}