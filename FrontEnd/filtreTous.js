async function recupTravaux() {
    const reponse = await fetch ("http://localhost:5678/api/works");
    const travaux = await reponse.json();  
    
    /* console.log(travaux); */
   
   
    const btnTous = document.querySelector(".btn__tous");
    btnTous.addEventListener ("click", function() {    
        console.log("click tous");

        
        btnTous.classList.add("btn__selected");       
        let ListTous = travaux.filter(element => {
        return element.categoryId === 1, 2, 3
        }); 
        document.querySelector(".gallery").innerHTML = '';   
        console.log(ListTous);           
    
        
       
    ListTous.forEach(article => {
    /* ListObjet.forEach(article => {  */       
   
        //Créer boucle pour lister les projets
       
            //Déclarer la variable article
           
            //Récupération de l'élément du DOM qui accueillera les articles
            const gallery = document.querySelector(".gallery");
            //Création de la balise figure
            const figure = document.createElement("figure");
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
            
        });
        
    }); 
   

}; 

recupTravaux();
