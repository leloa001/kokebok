<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Finn en oppskrift</title>
  <link rel="stylesheet" href="style.css">

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="script.js"></script>
</head>

<body>
  <nav>
    <h1 onclick="ingrediensDropDown()" id="hvilkeIngredienserHarDu" class="">Hvilke ingredienser har du?</h1>

    <a href="pushIngrediens">Legg til nye ingredienser</a>
    <a href="pushIngrediens">Legg til en ny oppskrift</a>
  </nav>

  <div class="ingredienserDropDown" id="ingredienserDropDown">
    <h1 value="frukt-og-grønt">Frukt og grønt</h1>
    <h1 value="kjøtt">Kjøtt</h1>
    <h1 value="grym">Gryn</h1>
    <h1 value="annet">Annet</h1>
    <div id="ingredienserContainer"></div>
  </div>

  <?php
  include 'connect.inc.php';

  // Getting the active kategori from an AJAX request
  $kategori = $_POST['kategori']; 
  $stmt = $conn->prepare('SELECT kategori, ingrediens from ingredienser WHERE kategori = ?');
  // to bind the $kategori variable to the parameter in the SQL string, s is to specify it's a string
  $stmt->bind_param('s', $kategori);
  $stmt->execute();
  $result = $stmt->get_result();
  $ingredienser = $result->fetch_all(MYSQLI_ASSOC);

  foreach($ingredienser as $ingrediens){
    $kategori = $ingrediens['kategori'];
    $ingrediensNavn = $ingrediens['ingrediens'];
    $id = str_replace(' ', '_', $ingrediensNavn);

    echo '<label for="' . $id . '">' . $ingrediensNavn . '</label>';
    echo '<input type="checkbox" name="' . $kategori . '[]" id="' . $id . '" value="' . $ingrediensNavn . '">';
  }

  ?>

  <h2>Du kan lage: <h2 id="duKanLage"></h2>



</body>

</html>