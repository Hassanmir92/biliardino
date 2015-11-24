var Club = require('../models/club');
var Vote = require('../models/vote');

function clubsIndex(req, res) {
  Club.find(function(err, clubs){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ clubs: clubs });
  });
}

function clubsCreate(req, res){
  var club_params = req.body
  var club = new Club(club_params);
  club.approved = false;
  club.save(function(err){
    if(err) return res.render("error", {message: "Something went wrong."});
    
     return res.status(201).json({message: 'Club successfully created.', club: club});
  });
};


function clubsShow(req, res){
  Club.findById(req.params.id, function(err, club){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ club: club });
  });
}

function clubsUpdate(req, res){
  Club.findById(req.params.id, function(err, club) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!club) return res.status(404).json({message: 'No club found.'});

    if (req.body.name) club.name = req.body.name;
    if (req.body.description) club.description = req.body.description;
    if (req.body.image) club.image = req.body.image;
    if (req.body.numberOfTables) club.numberOfTables = req.body.numberOfTables;
    if (req.body.address) club.address = req.body.address;
    if (req.body.lat) club.lat = req.body.lat;
    if (req.body.lng) club.lng = req.body.lng;
    if (req.body.bookable) club.bookable = req.body.bookable;

    club.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'Club successfully updated.', club: club});
    });
  });
}

function clubsAddVote(req, res){
  var vote_params = req.body
  var vote = new Vote(vote_params);

  Club.findById(req.params.id, function(err, club) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!club) return res.status(404).json({message: 'No club found.'});

    club.votes.push(vote);

    club.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'Club successfully updated.', club: club});
    });
  });
}

function clubsApprove(req, res){

  Club.findById(req.params.id, function(err, club) {
    if (err) return res.status(500).json({message: "Something went wrong!"});
    if (!club) return res.status(404).json({message: 'No club found.'});

    club.approved = true;

    club.save(function(err) {
     if (err) return res.status(500).json({message: "Something went wrong!"});

      res.status(201).json({message: 'Club successfully approved.', club: club});
    });
  });
}


function clubsDelete(req, res){
  Club.findByIdAndRemove({_id: req.params.id}, function(err){
   if (err) return res.status(404).json({message: 'Something went wrong.'});
   res.status(200).json({message: 'Club has been successfully deleted'});
  });
}

module.exports = {
  clubsIndex:   clubsIndex,
  clubsCreate:  clubsCreate,
  clubsShow:    clubsShow,
  clubsUpdate:  clubsUpdate,
  clubsAddVote: clubsAddVote,
  clubsApprove: clubsApprove,
  clubsDelete:  clubsDelete
}