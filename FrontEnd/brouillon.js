
function afficherToutSuppImg(){
    const gallery = document.querySelector(".gallery");
    //Création de la balise mini-figure
    const figure = document.createElement("figure");
    //Vu avec frederic le 23 01 2024 et vérif dans swagger(API Works:Id)
    //Rajoute un Id à figure dans le DOM suite à boucle travaux dans balise article
    //Permettra de supprimer ou rajouter une image
    
    //Création de la balise figcaption
    const figcaption = document.createElement("figcaption");
    figcaption.style.marginTop = "7px";
    //Création de la balise img (image)
    const img = document.createElement("img");                
    //Récupération source de l'image
    
    //Récupération texte de l'image
    img.width = 346;
    img.height = 416;
         
    //On rattache la balise figure a la balise (div class="gallery")
    gallery.appendChild(figure);
    //On rattache l'image et son texte à la balise figure
    figure.appendChild(img); 
    figure.appendChild(figcaption); 

    
    /* function modale1(){  */   
    //Création de la balise mini-figure
    const miniFigure = document.createElement("mini-figure");
    //Rajouter classe à miniFigure
    miniFigure.classList.add("mini-figure")                
    //Rajoute un Id à figure dans le DOM suite à boucle travaux dans balise article
    //Permettra de supprimer ou rajouter une image
    miniFigure.id = "miniFigure"+imgId;                
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
   

    trashIcon.addEventListener('click', async function() {
        const reponseSuppression = await fetch ("http://localhost:5678/api/works/"+imgId, {
           method: 'DELETE',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+tokenRecupere                            
           }  
                              
        }) 
        
       .then(response => {
       if (response.ok) {               
           const textMessDelete = document.createElement("p");
           textMessDelete.id = "deletePhoto";
           const line = document.querySelector(".line");
           line.appendChild(textMessDelete);
           miniFigure.remove();
           figure.remove();
           /* textMessDelete.innerText = "Suppression ( " + (imgTitle) + " ) réussie"; 
           textMessDelete.style.color = "green";
           textMessDelete.style.marginTop = "-40px"; */           
           
       } else {
           const textMessDelete = document.createElement("p");
           const line = document.querySelector(".line");
           line.appendChild(textMessDelete);                        
           textMessDelete.style.color = "red";
           textMessDelete.style.marginTop = "-40px";
           textMessDelete.innerText = (`Erreur ${response.status}: ${response.statusText}`); // Statut d'erreur
       } 
    })
    .catch(error => console.error(error));        
    
       });
      };



       figure.id = "figure"+imgId;
       img.src = imgUrl;
       figcaption.innerText = imgTitle;



    const gallery = document.querySelector(".gallery");
    //Création de la balise mini-figure
    const figure = document.createElement("figure");
    //Vu avec frederic le 23 01 2024 et vérif dans swagger(API Works:Id)
    //Rajoute un Id à figure dans le DOM suite à boucle travaux dans balise article
    //Permettra de supprimer ou rajouter une image
    figure.id = "figure"+imgId;
    //Création de la balise figcaption
    const figcaption = document.createElement("figcaption");
    figcaption.style.marginTop = "7px";
    //Création de la balise img (image)
    const img = document.createElement("img");                
    //Récupération source de l'image
    img.src = imgUrl;
    //Récupération texte de l'image
    img.width = 346;
    img.height = 416;
    figcaption.innerText = imgTitle;     
    //On rattache la balise figure a la balise (div class="gallery")
    gallery.appendChild(figure);
    //On rattache l'image et son texte à la balise figure
    figure.appendChild(img); 
    figure.appendChild(figcaption); 

    
    /* function modale1(){  */   
    //Création de la balise mini-figure
    const miniFigure = document.createElement("mini-figure");
    //Rajouter classe à miniFigure
    miniFigure.classList.add("mini-figure")                
    //Rajoute un Id à figure dans le DOM suite à boucle travaux dans balise article
    //Permettra de supprimer ou rajouter une image
    miniFigure.id = "miniFigure"+imgId;                
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
   

    trashIcon.addEventListener('click', async function() {
        const reponseSuppression = await fetch ("http://localhost:5678/api/works/"+imgId, {
           method: 'DELETE',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': 'Bearer '+tokenRecupere                            
           }  
                              
        }) 
        
       .then(response => {
       if (response.ok) {               
           const textMessDelete = document.createElement("p");
           textMessDelete.id = "deletePhoto";
           const line = document.querySelector(".line");
           line.appendChild(textMessDelete);
           miniFigure.remove();
           figure.remove();
           /* textMessDelete.innerText = "Suppression ( " + (imgTitle) + " ) réussie"; 
           textMessDelete.style.color = "green";
           textMessDelete.style.marginTop = "-40px"; */           
           
       } else {
           const textMessDelete = document.createElement("p");
           const line = document.querySelector(".line");
           line.appendChild(textMessDelete);                        
           textMessDelete.style.color = "red";
           textMessDelete.style.marginTop = "-40px";
           textMessDelete.innerText = (`Erreur ${response.status}: ${response.statusText}`); // Statut d'erreur
       } 
    })
    .catch(error => console.error(error));        
    
       });