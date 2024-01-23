
/* document.addEventListener("DOMLoaded", function(){
    const loginLink = document.querySelector("#nav-login");

    //Vérifier si le token est présent dans le localStorage
    const token = sessionStorage.getItem("token");
    console.log(token);
    if(token){
        //Changer le texte en "logout" si le token est présent
        loginLink.textContent = "logout";
    };
}); */

// Récupération des éléments HTML

const submitBtn = document.querySelector(".log-btn")

const loginError = document.querySelector(".login-error")

let emailInput = ""
let passwordInput = ""



/**
 * Événement de clic sur le bouton de soumission du formulaire de connexion.
 * @param {Event} e - L'événement de clic.
 */
submitBtn.addEventListener("click", async (e) => {
    // Désactivation du comportement par défaut du navigateur
    e.preventDefault()

    // Création de l'objet user avec email et password    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let user = { "email": email, "password": password };
    
    console.log(user);   

    //Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(user);

    //Appel de la fonction fetch avec ses arguments
        const reponse = await fetch ("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: chargeUtile,          
        })
    .then((reponse)=>reponse.json())
    .then((data)=>{
        console.log(data)
        console.log(data.message)
        console.log(data.token)
    });
    /* const user = await reponse.json(); */ 
    
    if ( email === 'sophie.bluel@test.tld' && password === 'SOphie' ) {  
     
 // Autoriser l'accès à la page restreinte
        window.location.href = 'index.html'; 
             
     }        
     
    else {  
    // Afficher un message d'erreur si l'email ou le mot de passe est incorrect
    document.getElementById('login-error').textContent = 'Erreur dans l’identifiant ou le mot de passe';
    document.getElementById('login-error').style.color = "red"; 
    
  }
  
}); 


/* window.localStorage.setItem("userId", "token"); */

