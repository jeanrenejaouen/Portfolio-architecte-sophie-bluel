console.log("sophie.bluel@test.tld")
console.log("S0phie")

// Récupération des éléments HTML
const submitBtn = document.querySelector(".log-btn");
const loginError = document.querySelector(".login-error");
// Permet d'avoir les champs de saisie vides
let emailInput = "";
let passwordInput = "";

// Ecouteur d'événement de clic sur le bouton de soumission du formulaire de connexion. 
submitBtn.addEventListener("click", async (e) => {
    // Désactivation du comportement par défaut du navigateur
    e.preventDefault()

    // Création de l'objet user avec email et password saisis   
    const email = document.getElementById("email").value;    
    const password = document.getElementById("password").value;
    let user = { "email": email, "password": password};
    
    /* console.log(user); */   

    //Création de la charge utile au format JSON
    const chargeUtile = JSON.stringify(user);

    //Appel de la fonction fetch avec ses arguments
        const reponse = await fetch ("http://localhost:5678/api/users/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"/* ,"Authorization": `Bearer ${"token"}` */},
            body: chargeUtile,          
        })

    // Transforme la réponse en format json
    .then((reponse)=>reponse.json())
    
    .then((data)=>{       
        //Vu avec frederic le 23 01 2024 
        //Retourne le message en cas de mauvais mail ou mot passe
        /* console.log(data.message); */
        //Retourne le token quand le couple email mot de passe est ok        
        /* console.log(data.token); */

        // Dans la réponse on récupère l'Id de l'utilisateur et on stocke dans variable userId
        const userId = data.userId        

        if(userId === 1){  
            // permet de stocker un token dans le sessionStorage du navigateur. Le token est associé à la clé "token",
            // et sa valeur est extraite de la variable "data.token".
            // Cette manipulation permet de conserver le token en mémoire dans le navigateur, 
            // ce qui peut être utile pour l'authentification et l'accès à certaines ressources protégées.
            window.sessionStorage.setItem("token", data.token);
            // Récupère la valeur du token stocké dans la sessionStorage du navigateur et la stocke dans une constante appelée tokenRecupere.                     
            const tokenRecupere = window.sessionStorage.getItem("token");
            /* console.log(tokenRecupere); */
            
            // Autoriser l'accès à la page restreinte
            window.location.href = 'index.html';
                         
        }   
   
        else {
            // Afficher un message d'erreur si l'email ou le mot de passe est incorrect
            document.getElementById('login-error').textContent = 'Erreur dans l’identifiant ou le mot de passe'; 
        };

    });
});

    
    

