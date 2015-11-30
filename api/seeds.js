var Club = require('./models/club');

var clubs = [{
  name: "Bar Kick",
  description: "Continental-style table-football café with René Pierre tables",
  image: "http://4.bp.blogspot.com/-NcwbGu3QaTU/TjHU-9vSZtI/AAAAAAAAHuk/9C5G322-yXM/s1600/bar-kick-0836.jpg",
  website: "http://www.cafekick.co.uk",
  numberOfTables: "9",
  address: "127 Shoreditch High Street, London E1 6JE",
  bookable: "yes",
  lat: 51.526298,
  lng: -0.078425
}, 
{
  name: "Strongroom Bar",
  description: "Modern takes on a pub menu served in a split-level venue with outdoor seating,  live bands and DJs",
  image: "https://media.timeout.com/images/101810145/617/347/image.jpg",
  website: "http://www.strongroombar.com",
  numberOfTables: "1",
  address: "120-124 Curtain Rd, London EC2A 3SQ",
  bookable: "no",
  lat: 51.525964,
  lng: -0.080139
},
{
  name: "Anglia Grove Snooker Club",
  description: "Members club with monthly table football tournaments and weekly 'winner stays   on' nights",
  image: "http://www.ltfc.info/images/LTFC%20venue%20image_resized.jpg",
  website: "http://www.ltfc.info/AGSC.html",
  numberOfTables: "8",
  address: "26 Marcon Place, London E8 1LP",
  bookable: "yes",
  lat: 51.548223,
  lng: -0.060249
},
{
  name: "Cafe Kick",
  description: "Cafe with football tables and TV sport, decorated with colourful flags and  memorabilia",
  image: "http://static1.squarespace.com/static/53f4ba5be4b0a8e6ecb72535/53f6045ae4b048248b50de9f/53f6045de4b048248b50dffe/1408632065352/cafe-kick.jpg",
  website: "http://www.cafekick.co.uk",
  numberOfTables: "3",
  address: "43 Exmouth Market, London EC1R 4QL",
  bookable: "yes",
  lat: 51.526017,
  lng: -0.109191
},
{
  name: "Westow House",
  description: "Entertaining, vintage-themed pub and beer garden with lots of games, live   music and DJs at weekends",
  image: "https://media.timeout.com/images/101810463/617/347/image.jpg",
  website: "http://westowhouse.com",
  numberOfTables: "1",
  address: "79 Westow Hill, London SE19 1TX",
  bookable: "no",
  lat: 51.420001,
  lng: -0.078902
},
{
  name: "Stapleton Tavern",
  description: "Quirky pub with bric-a-brac decor and retro videogames, serves bistro fare and  global beers",
  image: "http://media-cdn.tripadvisor.com/media/photo-s/08/f4/06/77/the-stapleton-tavern.jpg",
  website: "http://stapletontavern.com",
  numberOfTables: "1",
  address: "2-4 Crouch Hill, London N4 4AU",
  bookable: "no",
  lat: 51.570804,
  lng: -0.115472
},
{
  name: "Camino Blackfriars",
  description: "Exposed brick and Spanish poster decor in modern tapas bar serving regional dishes, wines and foosball",
  image: "http://static.designmynight.com/uploads/2015/03/Camino-Jan15-0007-1200x800-optimised.jpg",
  website: "http://www.camino.uk.com/restaurants/blackfriars",
  numberOfTables: "1",
  address: "33 Blackfriars Lane, London EC4V 6EP",
  bookable: "no",
  lat: 51.513112,
  lng: -0.103193
},
{
  name: "The Clapton Hart",
  description: "Massive venue with a stylishly downtrodden feel, terrace, range of hard-to-find craft beers and one football table",
  image: "http://www.claptonhart.com/wp-content/uploads/ClaptonHart-BKG.jpg",
  website: "http://claptonhart.com",
  numberOfTables: "1",
  address: "231 Lower Clapton Rd, London E5 8EG",
  bookable: "no",
  lat: 51.557702,
  lng: -0.056173
},
{
  name: "The Artisan Of Clerkenwell",
  description: "Spacious bar with table football, leather sofas, antique furnishings and an outdoor terrace",
  image: "http://www.theartisanofclerkenwell.com/media/520/2.jpg",
  website: "http://www.theartisanofclerkenwell.com",
  numberOfTables: "1",
  address: "53 St John's Square, London EC1V 4JL",
  bookable: "no",
  lat: 51.522857,
  lng: -0.103897
},
{
  name: "The Victoria Inn",
  description: "Hip, vintage-vibe pub serving craft beers and featuring a terrace, children's playroom and football table",
  image: "https://media.timeout.com/images/63138/617/347/image.jpg",
  website: "http://www.victoriainnpeckham.com",
  numberOfTables: "1",
  address: "77-79 Choumert Rd, London SE15 4AR",
  bookable: "no",
  lat: 51.467556,
  lng: -0.071034
},
{
  name: "Big Chill",
  description: "Low-lit, laid-back bar with sofas, front terrace and football table",
  image: "https://s-media-cache-ak0.pinimg.com/736x/ba/8d/9c/ba8d9cab35e00774f1a9d513b0c80067.jpg",
  website: "http://wearebigchill.com/venues/bar",
  numberOfTables: "1",
  address: "91 Brick Lane, London E1 6QL",
  bookable: "no",
  lat: 51.520347,
  lng: -0.073203
},
{
  name: "Proud Camden",
  description: "Relaxed daytime bar and burlesque venue in former horse hospital",
  image: "http://www.coolplaces.co.uk/system/images/9228/proud-camden-eat-drink-clubs-venues-large.jpg",
  website: "http://proudcamden.com",
  numberOfTables: "1",
  address: "The Horse Hospital, The Stables Market, Chalk Farm Rd, London NW1 8AH",
  bookable: "no",
  lat: 51.542529,
  lng: -0.148428
},
{
  name: "Grand Union Camden",
  description: "Fashionable, relaxed diner by day and buzzing trendy boozer by night",
  image: "http://cdn.ltstatic.com/2010/April/CV740780_942long.jpg",
  website: "http://www.grandunionbars.com/venues/camden",
  numberOfTables: "1",
  address: "102 - 104 Camden Road, London NW1 9EA",
  bookable: "no",
  lat: 51.541405,
  lng: -0.138338
},
{
  name: "Forest Tavern",
  description: "Traditional tavern serving great ales delicious foods",
  image: "http://foresttavern.com/wp-content/gallery/home/ForestTavern-103.jpg",
  website: "http://foresttavern.com",
  numberOfTables: "1",
  address: "173 Forest Lane, London E7 9BB",
  bookable: "no",
  lat: 51.549193,
  lng: 0.022241
},
{
  name: "Queen of Hoxton",
  description: "Bar and club hosting DJs, live music and installations on 3 levels, with roof garden",
  image: "http://www.cityroadonline.co.uk/assets/med-topbar2.jpg",
  website: "http://queenofhoxton.com",
  numberOfTables: "1",
  address: "1 Curtain Rd, London EC2A 3JX",
  bookable: "no",
  lat: 51.522135,
  lng: -0.081224
},
{
  name: "The Leconfield",
  description: "Real beer, real food, real people and a real football table",
  image: "http://static1.squarespace.com/static/53cff287e4b056db8c5d9074/53f9caa7e4b01f78d144c568/53f9d80fe4b0271e3bcd5a1e/1408882704581/IMG_5822.jpg",
  website: "http://www.theleconfieldpub.co.uk",
  numberOfTables: "1",
  address: "79 Green Lanes, London N16 9BU",
  bookable: "no",
  lat: 51.553355,
  lng: -0.088334
},
{
  name: "Ravensbourne Arms",
  description: "Home-cooked burgers and real ales in a homely bar with wood floors, sofas and garden",
  image: "http://ravensbournearms.com/wp-content/gallery/home/RavensbourneArms-29.jpg",
  website: "http://ravensbournearms.com",
  numberOfTables: "1",
  address: "323 Lewisham High St, London SE13 6NR",
  bookable: "no",
  lat: 51.455509,
  lng: -0.015246
}]

clubs.forEach(function(club, index){
  var newClub = new Club(club);
  newClub.save();
});