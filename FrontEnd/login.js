console.log("sophie.bluel@test.tld")
console.log("S0phie")

// Récupération des éléments HTML
const submitBtn = document.querySelector(".log-btn");
const loginError = document.querySelector(".login-error");

let emailInput = "";
let passwordInput = "";

//Événement de clic sur le bouton de soumission du formulaire de connexion. 
submitBtn.addEventListener("click", async (e) => {
    // Désactivation du comportement par défaut du navigateur
    e.preventDefault()

    // Création de l'objet user avec email et password    
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

    
    .then((reponse)=>reponse.json())
    
    .then((data)=>{       
        //Vu avec frederic le 23 01 2024 
        //Retourne le message en cas de mauvais mail ou mot passe
        /* console.log(data.message); */
        //Retourne le token quand le couple email mot de passe est ok        
        /* console.log(data.token); */
        
        const userId = data.userId        

        if(userId === 1){  
            window.sessionStorage.setItem("token", data.token);                     
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

    
    

