// In this case, the "this" keyword refers to the button that was clicked
$(document).on("click", "button", function (event) {
    event.preventDefault();

    $("#gifs-appear-here").html("")

    var anime = $(this).attr("data-anime");

    $(".animated-button").removeClass("active");
    $(this).addClass("active");



    // Constructing a URL to search Giphy for the name of the person who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        anime + "&api_key=opH9Ax1sLF38Rbtho3G310zUctU0xcZ7&limit=10";

    // Performing our AJAX GET request
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        // After the data comes back from the API
        .then(function (response) {
            // Storing an array of results in the results variable
            var results = response.data;

            // Looping over every result item
            for (var i = 0; i < results.length; i++) {

                // Only taking action if the photo has an appropriate rating
                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    // Creating a div for the gif
                    var gifDiv = $("<div>");

                    // Storing the result item's rating
                    var rating = results[i].rating;

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + rating);

                    // Creating an image tag
                    var animeImage = $("<img>");

                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height.url;


                    // Giving the image tag an src attribute of a proprty pulled off the
                    // result item
                    var animeImage = $("<img>");

                    animeImage.attr("src", results[i].images.fixed_height.url);
                    animeImage.attr("data-still", results[i].images.fixed_height_still.url);
                    animeImage.attr("data-animate", results[i].images.fixed_height_still.url);
                    animeImage.attr("data-state", "still");
                    animeImage.addClass("animeImage");





                    // Appending the paragraph and personImage we created to the "gifDiv" div we created
                    gifDiv.append(p);
                    gifDiv.append(animeImage);
                    $("#images").append(gifDiv);

                    // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                    $("#gifs-appear-here").prepend(gifDiv);


                }
            };
        });

    //Set the state from still to animated
    ($document).on("click", "data-still", function () {
        let state = $(this).attr("data-anime");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }




    })

});

$("#add-animated").on("click", function () {
    event.preventDefault();

    var animeImage = $("#animated-input").val().trim();
    console.log(animeImage);
    var button = $("<button>");

    button.text(animeImage);
    button.attr("data-anime", animeImage)

    $("#animated-buttons").append(button);

    function animeImage() {
        var anime = $(this).attr("data-anime");
        var animeImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (animeImage == "still") {
            $(this).attr("src", animeImage);
            $(this).attr("data-anime", "animate");
        } else if (animeImage == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-anime", "still");
        }
    }


});

//pseudo code for pause
$("#animeImage").on("click", ".gif", function (event) {
    event.preventDefault();

    // gets the current state of the clicked gif 
    var state = $(this).attr("data-state");

    // according to the current state gifs toggle between animate and still 
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

})


// The form takes the value from the input box and adds it into the topics  array. The buttonGenerator function is called that takes each topic in the array remakes the buttons on the page.


$(".submit").on("click", function (event) {
    event.preventDefault();

    console.log("submit");
    // sets inputted value to newTopic 
    newTopic = $("#topic-input").val();
    // new topic is added to the topics array 
    topics.push(newTopic);
    console.log(topics);
    // call the function that creates the new button
    buttonGenerator();
});



buttonGenerator();