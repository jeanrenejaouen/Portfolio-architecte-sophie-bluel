//Récupération des catégories en appelant l' API categories
/* fetch("http://localhost:5678/api/categories"); */
//Récupération des projets en appelant l' API works
fetch("http://localhost:5678/api/works")
    .then( reponse => reponse.json())
    .then( data => {
        for (let i=0; i<data.length; i++){
            const article = data[i];
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
                  
        }
    })     



