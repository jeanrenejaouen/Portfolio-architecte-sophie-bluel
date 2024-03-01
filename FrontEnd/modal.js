// Permet de savoir quelle boîte modale est ouverte
let modal = null;
// Récupérer tous les éléments focussables
const focusableSelector = "button, a, input, textarea";
let focusables = [];
// Permet de connaître le dernier élément focus avant ouverture modale
/* let previouslyFocusedElement = null; */

const openModal = function(e){
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    // Récupérer tous les éléments focussables dans la modale correspondant au focus focusableSelector
    // sous forme de tableau (array.from)
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    /* previouslyFocusedElement = document.querySelector(':focus'); */
    // Afficher la boîte modale    
    modal.style.display = null;
    // Placer le focus sur le premierélément
    focusables[0].focus();    
    // Comme l'élément est visible retirer l'attribut aria-hidden
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');    
    // Ferme la modale quand on en ouvre une autre
    modal.addEventListener('click', closeModal);
    // Récupère le bouton de fermeture et ferme la modale au clic
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    // Récupère l'élément DOM pour lequel on veut arrêter la propagation de fermeture
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
   
};

const closeModal = function(e){
    // Si modale est déjà null ne pas aller plus loin
    if(modal===null) return;
    /* if(previouslyFocusedElement !== null) previouslyFocusedElement.focus(); */
    e.preventDefault();
    // Masquer la modale
    modal.style.display = "none";
    // Rajouter attributs car la modale est masquée
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal'); 
    // Supprimer les EventListener(s)   
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    // Remettre modale à null
    modal = null;
    // Ramène à la modale 1 si on ferme la modale 2
    location.reload();   
};

// Fonction qui empêche la fermeture modale quand on clique à l'intérieur de celle-ci
const stopPropagation = function(e){
    e.stopPropagation();
};

const focusInModal = function(e){
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    /* if(e.shiftkey === true){
        index--
    }  */
    /* else{
        index++
    }
    if(index >= focusables.length){
        index = 0
    }
    if(index<0){
        index = focusables.length-1
    } */
    focusables[index].focus();
}

document.querySelectorAll(".js-modal").forEach(a =>{
    a.addEventListener('click', openModal);    
    
});

// Permet de fermer la modale en appuyant sur échap du clavier
window.addEventListener('keydown', function(e){
    if(e.key === "Escape" || e.key === "Esc"){
        closeModal(e);
    };
    /* if(e.key === "Tab" && modal !== null){
        focusInModal(e);
    } */
})