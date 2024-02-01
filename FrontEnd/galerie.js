/* document.addEventListener("DOMLoaded", function(){
    const loginLink = document.querySelector("#nav-login");

    //Vérifier si le token est présent dans le localStorage
    const tokenRecupere = sessionStorage.getItem("token");
    console.log(tokenRecupere);
    if(tokenRecupere){
        //Changer le texte en "logout" si le token est présent
        loginLink.textContent = "logout";
    };
}); */


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
                //Création de la balise img (image)
                const img = document.createElement("img");
                //Récupération source de l'image
                img.src = article.imageUrl;
                //Récupération texte de l'image
                figcaption.innerText = article.title;     
                //On rattache la balise figure a la balise (div class="gallery")
                gallery.appendChild(figure);
                //On rattache l'image et son texte à la balise figure
                figure.appendChild(img); 
                figure.appendChild(figcaption); 

            
                //Création de la balise mini-figure
                const miniFigure = document.createElement("mini-figure");
                //Rajouter classe à miniFigure
                miniFigure.classList.add("mini-figure")                
                //Rajoute un Id à figure dans le DOM suite à boucle travaux dans balise article
                //Permettra de supprimer ou rajouter une image
                miniFigure.id = "miniFigure"+article.id;
                //Création de la balise img (image)
                const miniImg = document.createElement("mini-img");
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

                //Le code suivant permet de supprimer au click sur corbeille l'image miniature de la modale et l'image de la gallery
                trashIcon.addEventListener('click', function() {                   
                   miniFigure.remove();
                   figure.remove();
                  });


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
        /* Attribuer une nouvelle valeur vide à l'attribut href du lien */
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

        //Créer clone de l'icone iconeModif
        const cloneIcon = iconeModif.cloneNode(true);
        //Rajouter une classe au clone de l'icone
        cloneIcon.setAttribute("class", "cloned-icon fa-regular fa-pen-to-square")
        //Intégrer le clone de l'icone à la bannière
        /* divBan.appendChild(cloneIcon); */
        divBan.insertAdjacentElement('afterbegin', cloneIcon);
        
         
    };

//********************************************************************************************************** */    
//CI-DESSOUS CODE POUR LA DECONNEXION DE LA PAGE INDEX.HTML
//********************************************************************************************************** */

    // Fonction à exécuter au clic sur le lien logout
function onClickLogoutLink() {
    // Code pour la déconnexion de l'utilisateur : Enlève le token de la sessionStorage
    window.sessionStorage.removeItem("token");
    location.reload();
    // Empêcher le lien de rediriger vers une autre page
    event.preventDefault();
  };

  // Récupérer le lien HTML avec l'attribut href="nav-logout"
  const logoutLink = document.querySelector('a[href="nav-logout"]');
  
  // Ajouter un écouteur d'événement pour le clic sur le lien
  logoutLink.addEventListener('click', onClickLogoutLink);