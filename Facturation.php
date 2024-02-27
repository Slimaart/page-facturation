<?php
// Variables de connexion à la BDD
$host = 'localhost';
$port = 3306;
$dbname = 'prosit';
$user = 'root';
$password = 'MYSQL';

// Connexion à la BDD
try {
    $newBDD = new PDO('mysql:host='.$host.';port='.$port.';dbname='.$dbname, $user, $password);
    echo "Je vais te manger !!!";
}
catch(PDOExeption $e) {
    die('Erreur : '.$e->getMessage());
}

// Vérification de la soumission du formulaire
if (isset($_POST['Fournisseur']) && isset($_POST['Societe']) && isset($_POST['TVA']) &&
    isset($_POST['Adresse']) && isset($_POST['Code_postal']) && isset($_POST['Ville']) &&
    isset($_POST['sexe']) && isset($_POST['Nom']) && isset($_POST['Prenom']) &&
    isset($_POST['Courriel']) && isset($_POST['Telephone']) && isset($_POST['commentaires'])) {
        
        // Préparation de la requête d'insertion
        $insertion = $newBDD->prepare('INSERT INTO table_form VALUES(NULL, :Fournisseur, :Societe, :TVA, :Adresse, :Code_postal, :Ville, :sexe, :Nom, :Prenom, :Courriel, :Telephone, :commentaires)');
        
        // Liaison des valeurs
        $insertion->bindValue(':Fournisseur', !empty($_POST['Fournisseur']) ? $_POST['Fournisseur'] : NULL);
        $insertion->bindValue(':Societe', !empty($_POST['Societe']) ? $_POST['Societe'] : NULL);
        $insertion->bindValue(':TVA', !empty($_POST['TVA']) ? $_POST['TVA'] : NULL);
        $insertion->bindValue(':Adresse', !empty($_POST['Adresse']) ? $_POST['Adresse'] : NULL);
        $insertion->bindValue(':Code_postal', !empty($_POST['Code_postal']) ? $_POST['Code_postal'] : NULL);
        $insertion->bindValue(':Ville', !empty($_POST['Ville']) ? $_POST['Ville'] : NULL);
        $insertion->bindValue(':sexe', !empty($_POST['sexe']) ? $_POST['sexe'] : NULL);
        $insertion->bindValue(':Nom', !empty($_POST['Nom']) ? $_POST['Nom'] : NULL);
        $insertion->bindValue(':Prenom', !empty($_POST['Prenom']) ? $_POST['Prenom'] : NULL);
        $insertion->bindValue(':Courriel', !empty($_POST['Courriel']) ? $_POST['Courriel'] : NULL);
        $insertion->bindValue(':Telephone', !empty($_POST['Telephone']) ? $_POST['Telephone'] : NULL);
        $insertion->bindValue(':commentaires', !empty($_POST['commentaires']) ? $_POST['commentaires'] : NULL);

        // Si "Autre" est sélectionné comme fournisseur, utilisation de la valeur saisie dans l'input "Autre fournisseur"
        if ($_POST['Fournisseur'] === 'autre' && isset($_POST['autreFournisseur'])) {
            $insertion->bindValue(':Fournisseur', $_POST['autreFournisseur']);
        }

        // Exécution de la requête
        $verification = $insertion->execute();
        if ($verification) {
            echo "<br> Insertion réussie";
        }
}

// Redirection vers la page HTML
header("Location: index.html");
exit; // Assurez-vous d'arrêter l'exécution du script après la redirection

?>