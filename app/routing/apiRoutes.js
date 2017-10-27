//Set dependent packages
var path = require("path");
var friends = require("../data/friends.js");

//Routes
module.exports = function(app) {

    //create an api.get route to display JSON of all possible friends
    app.get("/api/friends", function(req, res) {
        res.JSON(friends);
        //console.log(friends);
    });

    //create an api.post route to handle incoming survey results
    //handle compatibility logic here
    app.post("/api/friends", function(req, res) {

        var newSurvey = req.body;

        var newFriendArray = [];

        for (var i = 0; i < friends.length; i++) {
            var scoreDifference = 0;

            for (var k = 0; k < friends[i].scores.length; k++) {
                var difference = Math.abs(friends[i].scores[k] - newSurvey.scores[k]);
                scoreDifference += difference;
            }

            newFriendArray.push({
                name: friends[i].name,
                picture: friends[i].picture,
                totalDiff: scoreDifference,
            });
        }

        var highestScore = 50;

        for (var i = 0; i < newFriendArray.length; i++) {
            if (newFriendArray[i].totalDiff < highestScore) {
                highestScore = newFriendArray[i].totalDiff;
            }
        }

        var pickedFriend = {};

        for (var i = 0; i < newFriendArray.length; i++) {
            if (newFriendArray[i].totalDiff === highestScore) {
                pickedFriend = newFriendArray[i];
            }
        }
        res.JSON(pickedFriend);
        console.log(pickedFriend);
    });

};