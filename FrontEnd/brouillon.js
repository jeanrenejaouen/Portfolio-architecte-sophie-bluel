/* en javascript comment sélectionner une image dans l'explorateur windows et l'enregistrer dans un input de formulaire
ChatGPT

En JavaScript, vous ne pouvez pas accéder directement aux fichiers présents dans l'explorateur Windows. Cependant, vous pouvez utiliser l'élément input de type file pour permettre à l'utilisateur de sélectionner une image et l'enregistrer dans un formulaire.

Voici comment vous pouvez faire cela :

HTML :
 */
 
<form id="monFormulaire">
  <input type="file" id="imageInput">
  <input type="submit" value="Envoyer">
</form>

JavaScript :

 
// Écouteur d'événement pour l'envoi du formulaire
document.getElementById('monFormulaire').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche le comportement par défaut du formulaire

  var imageInput = document.getElementById('imageInput');
  var imageFile = imageInput.files[0]; // Récupère le premier fichier sélectionné par l'utilisateur

  // Vérifie si une image a été sélectionnée
  if (imageFile) {
    // Crée un objet FormData pour envoyer le fichier
    var formData = new FormData();
    formData.append('image', imageFile);

    // Envoyez le formData à votre serveur via AJAX ou toute autre méthode de votre choix
    // ...
  } else {
    console.log('Aucune image sélectionnée');
  }
});

Dans cet exemple, lorsque l'utilisateur soumet le formulaire, nous récupérons l'élément input de type file et accédons au fichier sélectionné en utilisant la propriété files. Le premier fichier est récupéré (si plusieurs fichiers ont été sélectionnés, vous pouvez parcourir l'objet files pour traiter chacun d'entre eux).

Ensuite, nous créons un objet FormData pour stocker le fichier et l'envoyer au serveur. Vous pouvez ensuite envoyer ce formData en utilisant AJAX ou toute autre méthode d'envoi de données au serveur de votre choix.

Assurez-vous de bien comprendre ce code et de l'adapter à vos besoins spécifiques.

/</input>

//*************************************************************************************** */
//*************************************************************************************** */

const formData = new FormData();
formData.append('image', image.files[0]);
formData.append('title', titre.value);
formData.append('category', categorie.value);
const reponse2 = await fetch ("http://localhost:5678/api/works", {
    method: 'POST',
    headers: {
        'Authorization': 'Bearer '+token
    },
    body: formData
})