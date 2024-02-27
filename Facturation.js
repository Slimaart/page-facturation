// Déclaration des variables
const inputCP = document.getElementById("inputCP");
const inputCo = document.getElementById("inputCo");
const ErrorCP = document.getElementById('ErrorCP');
const Tel = document.getElementById('Tel');
const ErrorTel = document.getElementById('ErrorTel');
const TVA = document.getElementById("TVA");
const ErrorTVA = document.getElementById('ErrorTVA');
const Nom = document.getElementById("Nom");
const submit = document.getElementById("submit");
const form = document.getElementById("form");
const message = document.getElementById("message");

//-------------------------------------------------------------------------------------------------------------//
//------------------------------ Apparition d'un input pour un autre fournisseur ------------------------------//
//-------------------------------------------------------------------------------------------------------------//

document.getElementById('fournisseur').addEventListener('change', function() {
    // Vérifie si l'option sélectionnée est "Autres"
    if (this.value === 'autre') {
        // Affiche l'input pour entrer un autre fournisseur
        document.getElementById('autreFournisseur').style.display = 'inline';
    }
});

//------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------ Entrée de charactères numériques seulement dans l'input du code postal ------------------------------//
//------------------------------------------------------------------------------------------------------------------------------------//

inputCP.addEventListener('input', function() {
    // Récupération de la valeur saisie dans le champ de texte
    var inputValue = inputCP.value;
    // Vérification si la valeur saisie contient des caractères non numériques
    if (/[^0-9]/.test(inputValue)) {
        // Si des caractères non numériques sont détectés, supprimez-les de la valeur
        inputCP.value = inputValue.replace(/[^0-9]/g, '');
    }
});

//-------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------ Entrée de 10 charactères numériques seulement dans l'input du téléphone ------------------------------//
//-------------------------------------------------------------------------------------------------------------------------------------//

Tel.addEventListener('input', function() {
    // Récupération de la valeur saisie dans le champ de texte
    var inputValue = Tel.value;
    // Vérification si la valeur saisie contient des caractères non numériques
    if (/[^0-9]/.test(inputValue)) {
        // Si des caractères non numériques sont détectés, supprimez-les de la valeur
        Tel.value = inputValue.replace(/[^0-9]/g, '');

        // Afficher le message d'erreur
        ErrorTel.style.display = 'inline';
    }
    else {
        if (inputValue.length === 10) {
            // Le message d'erreur se cache
            ErrorTel.style.display = 'none';
        }
        else {
            // Afficher le message d'erreur
            ErrorTel.style.display = 'inline';
        }
    }
});

//--------------------------------------------------------------------------------------------------------------------------------//
//------------------------------ Numéro de TVA doit commencer par "FR" et être suivi de 11 chiffres ------------------------------//
//--------------------------------------------------------------------------------------------------------------------------------//

TVA.addEventListener('input', function() {
    // Récupération de la valeur saisie dans le champ de texte
    var inputValue = TVA.value;

    // Mise en majuscule lors de l'écriture pour ne pas avoir de problème avec le FR en majuscule
    this.value = this.value.toUpperCase();

    // Vérification qu'il y ait bien écrit "FR" suivi de 11 chifres
    if (/^FR[0-9]{11}$/.test(inputValue)) {
        // Le message d'erreur se cache
        ErrorTVA.style.display = 'none';
    }
    else {
        // Afficher le message d'erreur
        ErrorTVA.style.display = 'inline';
    }
});

//-------------------------------------------------------------------------------------------------//
//------------------------------ Mise en majuscule du nom de famille ------------------------------//
//-------------------------------------------------------------------------------------------------//

Nom.addEventListener('input', function() {
    // Récupération de la valeur saisie dans le champ de texte
    var inputValue = Nom.value;
    // Mise en majuscule lors de l'écriture
    this.value = this.value.toUpperCase();
});

//-----------------------------------------------------------------------------------------------------//
//------------------------------ Bouton pour remonter en haut de la page ------------------------------//
//-----------------------------------------------------------------------------------------------------//

window.addEventListener("scroll", function() {
    var scrollTopButton = document.getElementById("scroll-top-button");
    // Si le défilement dépasse 100px, le bouton "Retour en haut de page" s'affiche
    if (window.scrollY > 100) {
        // Le bouton s'affiche
        scrollTopButton.style.display = "block";
    }
    else {
        // Le bouton se cache
        scrollTopButton.style.display = "none";
    }
});

// Ajout d'un écouteur d'événement pour permettre le retour en haut de la page lorsque le bouton est cliqué
document.getElementById("scroll-top-button").addEventListener("click", function() {
    // Remonte jusqu'en haut
    document.documentElement.scrollTop = 0;
    window.scrollTo({top: 0, behavior: "smooth"});
});

//------------------------------------------------------------------------------------------------------------------------------//
//------------------------------ Remplissage automatique de la commune en fonction du code postal ------------------------------//
//------------------------------------------------------------------------------------------------------------------------------//

// Fonction pour remplir automatiquement le nom de la commune
const RemplissageAuto = async () => {
    // Déclaration d'une nouvelle variable qui récupère l'information entrée dans le input
    var codePostal = inputCP.value;

    // Vérification que seulement 5 chiffres soient rentrés
    if (codePostal.length === 5 && /^[0-9]+$/.test(codePostal)) {
        // Variable pour l'url de l'API avec les chiffres rentrés précédemment
        let APIUrl = `https://apicarto.ign.fr/api/codes-postaux/communes/${codePostal}`;
        // Recherche des informations de l'API
        let data = await fetch(APIUrl);
        // Mise en forme des infos en json
        let response = await data.json();
        // Vider la liste déroulante pour n'avoir aucune valeur de départ
        inputCo.innerHTML = '';
        // Ajout dans la liste déroulante une nouvelle option pour chaque commune ayant le code postal indiqué
        response.forEach(souris => {
            inputCo.appendChild(new Option(souris.nomCommune, souris.nomCommune));
        });

        // Le message d'erreur se cache
        ErrorCP.style.display = 'none';
    }
    else {
        // Afficher le message d'erreur
        ErrorCP.style.display = 'inline';
    }
}

// Appel de la fonction lorsque la case est remplie
inputCP.addEventListener('input', RemplissageAuto);

//---------------------------------------------------------------------//

// Fonction pour vider automatiquement le champ de la ville lorsque le champ du code postal est vidé
inputCP.addEventListener('input', function() {
    if (this.value === '') {
        inputCo.value = ''; // Vide le contenu du champ de sélection de la ville
    }
});

//---------------------------------------------------------------------------------------------------------------//
//------------------------------ Affichage d'un message pour l'envoi du formulaire ------------------------------//
//---------------------------------------------------------------------------------------------------------------//

submit.addEventListener('click', function() {
    // Vérification si tous les champs obligatoires sont remplis
    if (checkRequiredFields()) {
        alert("Le formulaire a bien été envoyé, nous vous remercions pour vos réponses !");
    } 
    else {
        alert("Veuillez remplir tous les champs obligatoires avant d'envoyer le formulaire.");
    }
});

// Fonction pour vérifier si tous les champs obligatoires sont remplis
function checkRequiredFields() {
    // Récupération des champs obligatoires
    const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');

    // Parcours de tous les champs obligatoires pour vérifier s'ils sont remplis
    for (const field of requiredFields) {
        // Vérification si le champ est vide
        if (!field.value.trim()) {
            // Retourne faux si un champ obligatoire est vide
            return false; 
        }
    }
    // Retourne vrai si tous les champs obligatoires sont remplis
    return true;
}

