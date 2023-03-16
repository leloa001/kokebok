function ingrediensDropDown(){
  var ingrediensDropDown = document.getElementById("ingredienserDropDown");
  var underline = document.getElementById("hvilkeIngredienserHarDu")
  underline.classList.toggle("underline")
  ingrediensDropDown.classList.toggle("open")
}

// Get all h1 elements from ingrediensDropDown section
var h1Elements = document.querySelectorAll('#ingredienserDropDown h1');

// Add a click event listener to each h1 element from above
for (var i = 0; i < h1Elements.length; i++) {
  h1Elements[i].addEventListener('click', function() {
    var kategori = this.value; 
    console.log(kategori)

    // Create a new XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Set the URL and method for the AJAX request
    xhr.open('POST', 'index.php', true);

    // Set the request header to indicate that we're sending a form
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Define the callback function for when the AJAX request is complete
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var response = xhr.responseText;
        document.getElementById('ingredienserContainer').innerHTML = response; // display resulting checkboxes in ingredienserContainer div
      }
    }

    // Send the AJAX request with the selected category as the form data
    xhr.send('kategori=' + encodeURIComponent(kategori));
  });
}


function hentOppskrifter() {
  var ingredienser = document.getElementsByName('ingrediens');
  // console.log(ingredienser)
  var ingrediensArray = [];
  // var oppskriftArray = [];
  document.getElementById("duKanLage").innerHTML = ""

  // henter valgte ingredienser og legger de i en array
  for (var checkbox of ingredienser) {
    if (checkbox.checked)
      ingrediensArray.push(checkbox.value);
  }

  $.ajax({
    url: "getData.php",
    type: "GET",
    dataType: "json",
    success: function (data) {
      

      for (i = 0; data.length > i; i++) {
        // Konverterer det som blir hentet ut av databasen fra en string til en array
        data[i].ingredienser = data[i].ingredienser.split(", ");
        ingrediensTeller = 0;
        for (x = 0; data[i].ingredienser.length > x; x++) {
          if (ingrediensArray.includes(data[i].ingredienser[x])) {
            ingrediensTeller++
          }
          // If statment for å sjekke om antall matchende ingredienser er det samme som anntall ingredienser i oppskriften
          if (ingrediensTeller == data[i].ingredienser.length) {
            // Printer ut oppskriftene du har ingredienser til å lage
            document.getElementById("duKanLage").innerHTML += data[i].rettNavn + "<br> <br>"
          }
        };
      }

    },
    error: function (xhr, status, error) {
      console.log("Error: " + error);
    }
  })


  // henter valgte ingredienser og legger de i en array

};