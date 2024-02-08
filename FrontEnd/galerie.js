/* Fonction qui permettra de modifier le DOM une fois appelée */
function afficherGallery (tableTravaux){

    /* Rafraichissement de la page pour éviter le rajout à la suite */    
    document.querySelector(".mini-gallery").innerHTML = '';
    //Récupération de l'élément du DOM qui accueillera les articles
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';
       
    tableTravaux.forEach(article => {    
              //Création de la balise mini-figure
                const figure = document.createElement("figure");
                //Vu avec frederic le 23 01 2024 et vérif dans swagger(API Works:Id)
                //Rajoute un Id à figure dans le DOM suite à boucle travaux dans balise article
                //Permettra de supprimer ou rajouter une image
                figure.id = "figure"+article.id;
                //Création de la balise figcaption
                const figcaption = document.createElement("figcaption");
                figcaption.style.marginTop = "7px";
                //Création de la balise img (image)
                const img = document.createElement("img");                
                //Récupération source de l'image
                img.src = article.imageUrl;
                //Récupération texte de l'image
                img.width = 346;
                img.height = 416;
                figcaption.innerText = article.title;     
                //On rattache la balise figure a la balise (div class="gallery")
                gallery.appendChild(figure);
                //On rattache l'image et son texte à la balise figure
                figure.appendChild(img); 
                figure.appendChild(figcaption); 

        function modale1(){    
                //Création de la balise mini-figure
                const miniFigure = document.createElement("mini-figure");
                //Rajouter classe à miniFigure
                miniFigure.classList.add("mini-figure")                
                //Rajoute un Id à figure dans le DOM suite à boucle travaux dans balise article
                //Permettra de supprimer ou rajouter une image
                miniFigure.id = "miniFigure"+article.id;                
                //Création du clone de l'image
                const cloneImg = img.cloneNode(true)
                //Rajouter classe à cloneImg
                cloneImg.classList.add("cloneImg");                    
                //On rattache la balise miniFigure a la balise miniGallery
                miniGallery.appendChild(miniFigure);

                //On rattache le clone de l'image à la balise miniFigure
                miniFigure.appendChild(cloneImg); 
                
                //Création de la balise span dans DOM qui recevra trashIcon(icone corbeille)
                const containIcon = document.createElement("span");
                //Rajouter classe .corb à containIcon
                containIcon.classList.add("corb");
                //Intégrer containIcon à l'élément DOM miniFigure
                miniFigure.appendChild(containIcon);

                //Création de l'icone corbeille
                const trashIcon = document.createElement("i");
                //Rajouter classe à l'icone corbeille
                trashIcon.classList.add("fa-solid", "fa-trash-can");
                //Intégrer trashIcone à containIcon
                containIcon.appendChild(trashIcon);

                //Le code suivant permet de supprimer au click sur corbeille l'image miniature de la modale, de la gallery, de la bdd
                trashIcon.addEventListener('click', function() {
                    const reponseSuppression = fetch ("http://localhost:5678/api/works/"+article.id, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+tokenRecupere
                        }
                    });                   
                   miniFigure.remove();
                   figure.remove();
                  });
                };
                modale1();
            });


           
};

/* Fonction qui déselectionne tous les boutons tout en conservant leur style */
function styleBtnFiltreActif() {
    const listeBtn = document.getElementsByClassName("btn");
    for (let i=0; i<listeBtn.length; i++){		
		console.log (listeBtn[i]);		
		listeBtn[0].className="btn btn__tous";
        listeBtn[1].className="btn btn__objets";
        listeBtn[2].className="btn btn__appartements";
        listeBtn[3].className="btn btn__hotel";        
}};

/* Fonction asynchrone qui récupère les éléments de l'API works */
async function recupTravaux() {
    const reponse = await fetch ("http://localhost:5678/api/works");
    const travaux = await reponse.json();  
    
    console.log(travaux); 

    /* Rappel fonction "afficherGallery" qui prépare la modification du DOM avec les éléments de l'API*/   
    afficherGallery(travaux);
        
    
    /* BOUTON FILTRE TOUS */
    const btnTous = document.querySelector(".btn__tous");                        
    btnTous.addEventListener ("click", function(){
        console.log("click tous") 
        let listTous = travaux.filter (element => {
            return element.categoryId === 1, 2, 3                      
        }) 
        console.log(listTous);
        afficherGallery(listTous);        
        styleBtnFiltreActif();
        btnTous.classList.add("btn__selected");  
    });
    
    /* BOUTON FILTRE OBJETS */
    const btnObjet = document.querySelector(".btn__objets");                        
    btnObjet.addEventListener ("click", function() {         
        console.log("click objet");        
        let listObjet = travaux.filter(element => {
        return element.categoryId === 1        
        });    
        console.log(listObjet);
        afficherGallery(listObjet);
        styleBtnFiltreActif();
        btnObjet.classList.add("btn__selected");                
    });
    

    /* BOUTON FILTRE APPARTEMENTS */
    const btnAppartement = document.querySelector(".btn__appartements");                        
    btnAppartement.addEventListener ("click", function(){
        console.log("click appartement") 
        let listAppartement = travaux.filter (element => {
            return element.categoryId === 2                
        }) 
        console.log(listAppartement);
        afficherGallery(listAppartement);
        styleBtnFiltreActif();
        btnAppartement.classList.add("btn__selected");
    });

    /* BOUTON FILTRE HOTELS ET RESTAURANTS */
    const btnHotel = document.querySelector(".btn__hotel");                       
    btnHotel.addEventListener ("click", function(){
        console.log("click hotel") 
        let listHotel = travaux.filter (element => {
            return element.categoryId === 3       
        }) 
        console.log(listHotel);
        afficherGallery(listHotel);
        styleBtnFiltreActif();
        btnHotel.classList.add("btn__selected"); 
    });  
 
 };
/* Rappel de la fonction pour réaliser la modification du DOM */
recupTravaux();


//********************************************************************************************************/
//CI-DESSOUS MODIFICATIONS APPORTEES A INDEX.HTML APRES CONNEXION REUSSIE
//********************************************************************************************************/
const tokenRecupere = window.sessionStorage.getItem("token");
    if (tokenRecupere) {
        const filtres = document.querySelector(".filtres");
        filtres.style.display="none";
        const loginLink = document.querySelector("#nav-login");
        loginLink.textContent = "logout";
        //Récupérer le lien login avec son Id  
        const lien = document.getElementById("nav-login");
        /* Attribuer une nouvelle valeur "nav-logout" à l'attribut href du lien */
        lien.setAttribute("href", "nav-logout"); 
        //Créer une marge sous le titre Mes projets à la disparition des boutons filtres
        const margeFolio = document.querySelector(".folio");
        margeFolio.style.marginBottom = '92px';
        //Faire apparaître le lien "modifier"
        const jsModal = document.querySelector(".js-modal");
        jsModal.style.display = "block";
        //Faire apparaître l'icone du lien "modifier"
        const iconeModif = document.querySelector(".fa-pen-to-square");
        iconeModif.style.display = "block";       

        //Création de la balise div-ban (bannière fond noir) dans DOM 
        const divBan = document.createElement("div-ban");
        //Rajouter la classe ban-black à divBan
        divBan.classList.add("ban-black");
        //Récupérer le header du DOM
        const header = document.querySelector("header");
        //Intégrer divBan à l'élément DOM header comme premier enfant        
        header.insertAdjacentElement('afterbegin', divBan);
        header.style.marginTop = 0;
        divBan.style.marginBottom = "38px";
        /* divBan.style.color = "white"; */
        divBan.innerHTML = "Mode édition";

        //Créer clone de l'icone retour
        const cloneIcon = iconeModif.cloneNode(true);
        //Rajouter une classe à l'icone retour
        cloneIcon.setAttribute("class", "cloned-icon fa-regular fa-pen-to-square")
        //Intégrer l'icone retour à la bannière
        /* divBan.appendChild(cloneIcon); */
        divBan.insertAdjacentElement('afterbegin', cloneIcon);
        
         
    };

//********************************************************************************************************** */    
//CI-DESSOUS CODE POUR LA DECONNEXION DE LA PAGE INDEX.HTML
//********************************************************************************************************** */

    // Fonction à exécuter au clic sur le lien logout
function onClickLogoutLink(event) {
    // Code pour la déconnexion de l'utilisateur : Enlève le token de la sessionStorage
    window.sessionStorage.removeItem("token");
    // Rafraichissement de la page
    location.reload();
    // Empêcher le lien de rediriger vers une autre page
    event.preventDefault();
  
};

  // Récupérer le lien HTML avec l'attribut href="nav-logout"
  const logoutLink = document.querySelector('a[href="nav-logout"]');
  
  // Ajouter un écouteur d'événement pour le clic sur le lien
  logoutLink.addEventListener('click', onClickLogoutLink);



//***********************************************************************************************
//***************          MODALE 2           *****************
//*********************************************************************************************** */ */
                
              // Récupérer l'élément input avec l'ID "ajouterPhoto"
              const OpenModale2 = document.getElementById("ajouterPhoto");              
             
              // Écouter l'événement de soumission du formulaire
              OpenModale2.addEventListener("click", function(event) {
                    // Empêche l'envoi du formulaire
                    event.preventDefault();
                    // Récupérer l'élément d'entrée avec l'ID "titleModal"
                    const titleModal2 = document.getElementById("titleModal");
                    //Changer titre de la modale
                    titleModal2.innerHTML = "Ajout photo";
                    const miniGallery = document.querySelector(".mini-gallery");
                    miniGallery.innerHTML = "";
                    //Création de l'icone retour
                    const retourIcon = document.createElement("i");
                    //Rajouter classe à l'icone retour
                    retourIcon.classList.add("fa-solid", "fa-arrow-left");
                    //Récupérer la balise modal-wrapper
                    const modalWrapper = document.querySelector(".modal-wrapper");
                    //Intégrer retourIcone à modalWrapper                    
                    modalWrapper.appendChild(retourIcon);
                    //Rajouter une classe à mminiGallery pour créer un rectangle fond gris
                    miniGallery.classList.add("insert-image");
                    //Création de l'icone picture                    
                    const pictureIcon = document.createElement("i");
                    //Rajouter classe à l'icone picture
                    pictureIcon.classList.add("fa-regular", "fa-image");
                    miniGallery.appendChild(pictureIcon);
                    //Modifier le style du bouton Ajouter photo
                    const btnValider = document.getElementById("ajouterPhoto");
                    btnValider.id = "";
                    btnValider.value = "valider";
                    btnValider.style.backgroundColor = "#A7A7A7";
                    btnValider.style.border = "0";                    

                    // Créer l'élément input (+ Ajouter photo)
                    const ajouterPhoto = document.createElement('input');
                    // Définir le type de l'input comme submit
                    ajouterPhoto.setAttribute('type', 'submit');                                        
                    // Définir la valeur du bouton
                    ajouterPhoto.setAttribute('value', '+ Ajouter photo');
                    ajouterPhoto.id = "ajout-photo";
                    // Ajouter l'input à un élément existant 
                    document.getElementById('miniGallery').appendChild(ajouterPhoto);

                    //Créer l'élément p (jpg, png : 4mo max)
                    const commentAjout = document.createElement("p");
                    //Ajouter le contenu texte (jpg, png : 4mo max)
                    commentAjout.innerText = "jpg, png : 4mo max";
                    //Ajouter l'élément p à miniGallery
                    miniGallery.appendChild(commentAjout);                    

        //*********  FORMULAIRE AJOUT PHOTO DANS MODALE 2  *********                     
                    //Créer formulaire formAjoutPhoto
                    const formAjoutPhoto = document.createElement("form");
                    // Ajouter attribut autocomplete
                    formAjoutPhoto.setAttribute("autocomplete", "on"); 
                    // Ajouter un id au formulaire (formAjouPhoto) 
                    formAjoutPhoto.id = "form-ajout";                                       
                   //positionner formAjoutPhoto après miniGallery
                    miniGallery.insertAdjacentElement("afterend", formAjoutPhoto);                    
                    
                    // Créer l'élément label titreLabel
                    const titreLabel = document.createElement("label");
                    // Définir l'attribut de titreLabel 
                    titreLabel.setAttribute("for", "titreMod2");//titre
                    // Définir le texte de titreLabel
                    titreLabel.textContent = "Titre";
                    titreLabel.setAttribute("id", "titreLabM2");

                    // Créez l'élément input titreInput
                    const titreInput = document.createElement("input");                    
                    // Définir les attributs de titreInput
                    titreInput.setAttribute("type", "text");
                    titreInput.setAttribute("id", "titreMod2");
                    titreInput.setAttribute("name", "titre");
                    titreInput.setAttribute("value", "");

                    // Créer l'élément label categorieLabel
                    const categorieLabel = document.createElement("label");
                     // Définir l'attribut de titreLabel 
                     categorieLabel.setAttribute("for", "categorieMod2");//categorie
                     // Définir le texte de titreLabel
                     categorieLabel.textContent = "Catégorie";
                     categorieLabel.setAttribute("id", "categLabM2");

                    // Créez l'élément select categorieSelect
                    const categorieSelect = document.createElement("select");                    
                    // Définir les attributs de categorieSelect                    
                    categorieSelect.setAttribute("id", "categorieMod2");
                    categorieSelect.setAttribute("name", "categorie");
                    // Créer les options pour categorieSelect
                    const option0 = document.createElement("option");
                    option0.textContent = "";
                    const option1 = document.createElement("option");
                    option1.textContent = "Objets";
                    option1.value = 1;
                    const option2 = document.createElement("option");
                    option2.textContent = "Appartements";
                    option2.value = 2;
                    const option3 = document.createElement("option");
                    option3.textContent = "Hôtels & restaurants";
                    option3.value = 3;
                    
                    // Ajoutez l'input et select au formulaire (formAjoutPhoto)
                    formAjoutPhoto.appendChild(titreLabel);
                    formAjoutPhoto.appendChild(titreInput);
                    formAjoutPhoto.appendChild(categorieLabel);
                    formAjoutPhoto.appendChild(categorieSelect);
                    categorieSelect.appendChild(option0);
                    categorieSelect.appendChild(option1);
                    categorieSelect.appendChild(option2);
                    categorieSelect.appendChild(option3);
                    
                    const line = document.querySelector(".line");
                    line.style.marginTop = "47px";
                  

               // Récupérer le bouton (+ Ajouter photo) avec l'ID "ajout-photo"
                const ajoutImgMod2 = document.getElementById("ajout-photo");
              
                // Écouter l'événement de click sur bouton (+ Ajouter photo)
                ajoutImgMod2.addEventListener("click", function() {
               
                    console.log("bouton cliqué");
                    miniGallery.innerHTML = "";

                //Création de la balise input avec ses attributs (imgMod2)
                const imgMod2 = document.createElement("input");                 
                imgMod2.type = "file";
                imgMod2.accept = ".jpg, .png";
                /* imgMod2.onchange = "handleImageUpload()" */

/* <input type="file" id="imageUpload" accept=".jpg, .jpeg, .png" onchange="handleImageUpload()" /> */


//******************************************************************************************************************** */
                                // LE CODE CI DESSOUS PERMET D OUVRIR L EXPLORATEUR WINDOWS
                                // DE SELECTIONNER UN FICHIER IMAGE
                                // ET DE L AFFICHER DANS "miniGallery" DE LA MODALE 2
//******************************************************************************************************************** */
        
                // Ajouter un écouteur d'événement pour détecter quand un fichier est sélectionné
                imgMod2.addEventListener('change', function(event) {
                const selectedFile = event.target.files[0]; // récupérer le fichier sélectionné
    
                // Vérifier si un fichier a été sélectionné
                if (selectedFile) {
                // Créer un objet FileReader pour lire le contenu du fichier
                const reader = new FileReader();
                    
                // Ajouter un écouteur d'événement pour détecter quand la lecture est terminée
                reader.addEventListener('load', function() {
                const image = document.createElement('img');

                // Récupération du nom de l'image sélectionnée avec son extension (.jpg, .png)
                const titreImgMod2 = selectedFile.name;
                // Suppression de toute extension dans le nom de l'image
                const titreImgMod22 = titreImgMod2.split('/').pop().split('.')[0];
                // Insérer le nom de l'image sélectionnée dans le titre du formulaire
                titreInput.value = titreImgMod22;

                   
                image.src = reader.result; // obtenir l'URL de l'image
                image.width = "140";
                image.height = "167"; 
                image.style.marginTop =  - 198 + "px";  
                image.style.marginBottom =  21 + "px";  

                
                
                           
                // Ajouter l'image en tant que premier enfant de formAjoutPhoto
                /* formAjoutPhoto.appendChild(image); */
                const firstChildElement = formAjoutPhoto.firstChild;
                formAjoutPhoto.insertBefore(image, firstChildElement);               
                

                // Ce code permet de supprimer le bouton "choisir un fichier" quand une image est sélectionnée
                imgMod2.parentNode.removeChild(imgMod2); 

                if (selectedFile.size >= 4 * 1024 * 1024) {
                    image.style.display = "none";
                    console.log("taille image non conforme");
                }   

      });
      
                // Lire le contenu du fichier en tant que Data URL
                reader.readAsDataURL(selectedFile);

                
                
    };
  });
                
                // place le bouton "choisir un fichier" dans miniGallery
                miniGallery.appendChild(imgMod2);
                
                
    
                


    });
    
    //***********************************************************************************************
    //                 GESTION DE LA FLECHE RETOUR DE LA MODALE 2
    //***********************************************************************************************

        // Écouter l'événement de soumission du formulaire
          retourIcon.addEventListener("click",() => {            

            console.log("flèche gauche cliquée"); 

            /* location.reload(); */ 
             
           titleModal2.innerHTML = "Galerie photo";
            miniGallery.classList.remove("insert-image");
            miniGallery.innerHTML = "";
            formAjoutPhoto.remove(); 
            btnValider.id = "ajouterPhoto";
            btnValider.style = "";
            btnValider.value = "Ajouter une photo";
            miniGallery.classList.add("mini-gallery");
            line.style.marginTop = "67.3px";
            retourIcon.remove();
            recupTravaux();
          });

          
          
        
           
           

            
            

         
    });       
             
               
       