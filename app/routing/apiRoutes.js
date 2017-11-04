//Set dependent packages
var friends = require("../data/friends.js");

//Routes
module.exports = function(app) {

    //create an api.get route to display JSON of all possible friends
    app.get("/api/friends", function(req, res) {
        res.json(friends);
        //console.log(friends);
    });

    //create an api.post route to handle incoming survey results
    //handle compatibility logic here
    app.post("/api/friends", function(req, res) {

        var newFriend = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        var userData = req.body;
        var userScores = req.body.scores;
        var totalDifference = 0;

        console.log("userScores:" + userScores);

        for (i = 0; i < friends.length; i++) {
            totalDifference = 0;

            for (j = 0; j < friends[i].scores[i]; j++) {

                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));

                if (totalDifference <= newFriend.friendDifference) {
                    newFriend.name = friends[i].name;
                    newFriend.photo = friends[i].photo;
                    newFriend.friendDifference = totalDifference;
                }
            }
        }


        friends.push(userData);
        res.json(newFriend);

    });
} 