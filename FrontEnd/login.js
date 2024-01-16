/* import { tokenWrapper } from "./api.js" */

// Récupération des éléments HTML

const submitBtn = document.querySelector(".log-btn")


/* const loginError = document.querySelector(".login-error") */

let emailInput = ""
let passwordInput = ""

/**
 * Événement de saisie pour l'input de l'email.
 * @param {Event} e - L'événement de saisie.
 */
email.addEventListener("input", (e) => {
    emailInput = e.target.value
})

/**
 * Événement de saisie pour l'input du mot de passe.
 * @param {Event} e - L'événement de saisie.
 */
password.addEventListener("input", (e) => {
    passwordInput = e.target.value
})

/**
 * Événement de clic sur le bouton de soumission du formulaire de connexion.
 * @param {Event} e - L'événement de clic.
 */
submitBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
    let user = { "email": email, "password": password };
    console.log(user);
    const responseForLogin = await tokenWrapper(user)
    
    if (!responseForLogin.ok || !emailInput || !passwordInput) {
        loginError.innerHTML = "Veuillez entrer un email et un mot de passe valide";
    } else {
        let userOnline = await responseForLogin.json()
        sessionStorage.setItem("userOnline", JSON.stringify(userOnline))
        window.location.href = "/index.html";
    }
})
