
module.exports = function() {
// Chosen CSS
    var config = {
      '.chosen-select'           : {},
      '.chosen-select-deselect'  : {allow_single_deselect:true},
      '.chosen-select-no-single' : {disable_search_threshold:10},
      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }

    // Capture the form inputs 
    $("#submit").on("submit", function(){

    	// Form validation
    	function validateForm() {
		  var isValid = true;
		  $('.form-control').each(function() {
		    if ( $(this).val() === '' )
		        isValid = false;
		  });

		  $('.chosen-select').each(function() {

		  	if( $(this).val() === "")
		  		isValid = false
		  })
		  return isValid;
		}

		// If all required fields are filled
		if (validateForm() == true)
		{
			// Create an object for the user's data
            var newFriend = {
                name: $("#user-name").val(),
                photo: $("#profile-photo").val(),
                scores: [
                    $("#question1").val(),
                    $("#question2").val(),
                    $("#question3").val(),
                    $("#question4").val(),
                    $("#question5").val(),
                    $("#question6").val(),
                    $("#question7").val(),
                    $("#question8").val(),
                    $("#question9").val(),
                    $("#question10").val()
                ]
            };


	    	// Grab the URL of the website
	    	var currentURL = window.location.origin;

	    	// AJAX post the data to the friends API. 
            $.post(currentURL + "/api/friends", newFriend, function(data){

	    		// Grab the result from the AJAX post so that the best match's name and photo are displayed.
                $("#match-name").text(data.name);
                $("#match-image").attr("src", data.photo);
                $("#match-image").attr("width", "300px");
                
		    	// Show the modal with the best match 
                $("#friends-results-modal").modal("toggle");

	    	});
		}
		else
		{
			alert("Please fill out all fields before submitting!");
		}
    	
    	return false;
    });

}();