 // Initial array of animals
      var animals = ["dog", "cat", "bird", "hamster", "skunk", "goldfish", "turtle", "hedgehog", "crab", "chicken", "frog", "goat", "pig"];
      
    
      
      // displayanimal gifs function re-renders the HTML to display the appropriate content
      function displayanimal() {


        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=DGkJYpcI0QMPwj90MiyfMJS63rEc5T9i&limit=10";
        var appearGif = $("#animals-view");
        

        // Creating an AJAX call for the specific animal button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          $("#animals-view").empty();
            console.log(response);
            console.log(queryURL);
          // Creating a div to hold the 
          
         var results=response.data;

        if (results == ""){
           alert("There is not a gif for this!")
         }

            for (var i = 0; i < results.length; i++) {
              var animalDiv = $("<div>");

             
animalDiv.addClass("img-"+[i]);
animalDiv.attr("id", "rating-"+[i]);
appearGif.append(animalDiv);

var animalImage = $("<img>");
animalImage.attr("src", results[i].images.fixed_height_still.url);
animalImage.attr("data-still",results[i].images.fixed_height_still.url);
animalImage.attr("data-animate",results[i].images.fixed_height.url);
animalImage.attr("data-state","still");
animalImage.attr("class", "gif");
$(animalDiv).append(animalImage);

var p = $("<p>");
                p.text("Rating: " + results[i].rating);
                $("#rating-"+[i]).append(p);
                
            }



$(".gif").on("click", function() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

        });

      }

      // Function for displaying movie data
      function renderButtons() {
        
        // var animalDiv = $("<div class='animal'>");

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();
        

        // Looping through the array of movies
        for (var i = 0; i < animals.length; i++) {

          // var p = $("<p>").text("Rating: " + animals[i].rating);

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("animal-btn");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
          
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#animal-input").val().trim();
       

        // Adding movie from the textbox to our array
        animals.push(animal);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
        
      });

      

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".animal-btn", displayanimal);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();
      
    