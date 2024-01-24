/* Fonction qui permettra de modifier le DOM une fois appelée */
function afficherGallery (tableTravaux){

    /* Rafraichissement de la page pour éviter le rajout à la suite */
    document.querySelector(".gallery").innerHTML = '';
    document.querySelector(".miniature").innerHTML = '';

    tableTravaux.forEach(article => {                       
                //Récupération de l'élément du DOM qui accueillera les articles
                const gallery = document.querySelector(".gallery");
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

                //Récupération de l'élément du DOM qui accueillera les images
                const miniature = document.querySelector(".miniature");
                

                //On rattache l'image et son texte à la balise figure
                figure.appendChild(img); 
                figure.appendChild(figcaption); 

                //On rattache le clone de l'image à la balise miniature
                miniature.appendChild(img.cloneNode(true));               
                
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