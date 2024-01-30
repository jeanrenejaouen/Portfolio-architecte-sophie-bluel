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
    
    document.querySelector(".miniature").innerHTML = '';
    //Récupération de l'élément du DOM qui accueillera les articles
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = '';
    //Récupération de l'élément du DOM où on va intégrer divCorb
    const corbeille = document.getElementById("corbeille"); 

    tableTravaux.forEach(article => {            
                
                //Création de la balise figure
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



               
                //Création de la balise div dans DOM qui recevra iconCorbeille
                const divCorb = document.createElement("div");
                //Rajouter la classe à divCorb (div)
                divCorb.classList.add("corb");
                //Création de la balise span dans le DOM
                const iconCorbeille = document.createElement("span");
                //Rajouter la classe à iconCorbeille (span)
                iconCorbeille.classList.add("fa-solid", "fa-trash-can");
                               
                //Intégrer divCorb à l'élément DOM corbeille
                corbeille.appendChild(divCorb);
                //Intégrer iconCorbeille à l'élément DOM divCorb
                divCorb.appendChild(iconCorbeille);               
                //On rattache le clone de l'image à la balise miniature
                const cloneImg = img.cloneNode(true);
                cloneImg.classList.add("cloneImg");
                /* miniature.appendChild(img.cloneNode(true)); */ 
                divCorb.appendChild(cloneImg);              

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
        
    };

    // Fonction à exécuter au clic sur le lien
function onClickLogoutLink() {
    // Code pour la déconnexion de l'utilisateur
    window.sessionStorage.removeItem("token");
    location.reload();
    // Empêcher le lien de rediriger vers une autre page
    event.preventDefault();
  }
  
  // Obtenir le lien HTML avec l'attribut href="nav-logout"
  const logoutLink = document.querySelector('a[href="nav-logout"]');
  
  // Ajouter un écouteur d'événement pour le clic sur le lien
  logoutLink.addEventListener('click', onClickLogoutLink);