function ingrediensDropDown(){
  var ingrediensDropDown = document.getElementById("ingredienserDropDown");
  var underline = document.getElementById("hvilkeIngredienserHarDu")
  underline.classList.toggle("underline")
  ingrediensDropDown.classList.toggle("open")
}


// midlertidig/admin funksjon
function addIngredient(){
  var ingredient = document.getElementsByName("ingredient");
  var kategori = document.getElementsByName("kategori");
  $.ajax({
    url: "getData.php",
    type: "POST",
    dataType: "json",
    
    $ingredient: ingredient.value,
  })

}

function hentOppskrifter() {
  var ingredienser = document.getElementsByName('ingrediens');
  console.log(ingredienser)
  var ingrediensArray = [];
  // var oppskriftArray = [];
  document.getElementById("duKanLage").innerHTML = ""

  // Looper gjennom alle chekcbokser og legger til valgte checkbokser sin verdi i en array
  for (var checkbox of ingredienser) {
    if (checkbox.checked)
      ingrediensArray.push(checkbox.value);
  }
  console.log(ingrediensArray)

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
    error: function (error) {
      console.log("Error: " + error);
    }
  })
};