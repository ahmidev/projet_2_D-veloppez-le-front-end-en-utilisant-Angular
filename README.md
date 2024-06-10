Tableau de Bord des Médailles Olympiques
Ce projet consiste en une application Angular qui affiche des données sur les médailles olympiques pour différents pays. Il comprend deux composants principaux :

HomeComponent : Affiche un graphique circulaire montrant le nombre total de médailles par pays.
DetailsComponent : Affiche des informations détaillées sur un pays sélectionné, y compris un graphique en ligne montrant le nombre de médailles gagnées par le pays au fil des ans.
Il suffit de cliquer sur le pays en question pour avoir les détails qui le concernant.

Utilisation
Clonez le projet avec git clone <url_du_projet>.
Installez les dépendances avec npm install.
Lancez le projet avec ng serve.
Accédez à l'application à l'adresse http://localhost:4200/.
Explication du Code
Composants :
HomeComponent
But : Afficher un graphique circulaire du nombre total de médailles remportées par chaque pays.

Fonctionnalités clés :

Récupère les données olympiques et initialise le graphique.
Affiche le nombre total de pays et le plus grand nombre de participations (Jeux Olympiques) par un pays.
Utilise chartjs-plugin-piechart-outlabels pour l'étiquetage du graphique circulaire.
Gère les événements de clic sur le graphique pour naviguer vers le DetailsComponent pour le pays sélectionné.
DetailsComponent
But : Afficher des informations détaillées sur un pays sélectionné, y compris un graphique en ligne du nombre de médailles au fil des ans.

Fonctionnalités clés :

Récupère les données olympiques et les filtre en fonction du pays sélectionné.
Affiche le nom du pays, le nombre de participations, le nombre total de médailles et le nombre d'athlètes.
Initialise un graphique en ligne pour montrer le nombre de médailles gagnées par le pays au fil des ans.
Fichiers Clés :
home.component.ts : Gère la récupération des données et la configuration du graphique circulaire. Utilise ViewChild pour interagir avec les éléments du DOM. S'abonne aux données provenant de OlympicService et initialise les données et les options du graphique.
details.component.ts : Gère la récupération et l'affichage des données pour un pays spécifique. Utilise ActivatedRoute pour obtenir les paramètres de la requête et récupérer les données du pays correspondant. Initialise et configure un graphique en ligne pour afficher le nombre de médailles du pays au fil des ans.
olympic.service.ts : Fournit des méthodes pour récupérer les données olympiques d'une API. Retourne un observable auquel les composants s'abonnent pour recevoir les données.
Environnement
Angular 14 : Le framework principal utilisé pour créer l'application.
Chart.js : Une bibliothèque utilisée pour créer des graphiques.
chart.js: ^2.9.4
chartjs-plugin-piechart-outlabels: ^0.1.4 : Un plugin pour Chart.js utilisé pour créer des étiquettes sur les graphiques circulaires.
**rxjs: ^7.4.0`
Serveur de Développement
Exécutez ng serve pour un serveur de développement. Naviguez à http://localhost:4200/. L'application se rechargera automatiquement si vous modifiez un des fichiers source.

Build
Exécutez ng build pour construire le projet. Les artefacts de construction seront stockés dans le répertoire dist/.

