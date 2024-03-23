# Application MovieApp en Next Js connecté à une base de données MongoDB contenant des données sur des films

Le site a pour but premier de creer une api pour communiquer et interargir avec la base de film MongoDB. Le projet est documenté via un swagger segmentant les routes en 2 grandes parties:

- Les commentaires,
- Les films

Une page d'acceuil réalisé en React est également disponible, represantant une liste de film récuperé via notre route getMovies, card de film cliquable pour pouvoir voir les details de chaque films (EN COURS DE CONSTRUCTION).

### Les stacks du projets: Site réalisé avec 

- Next.js (avec des pages front en React)
- Documentation via Swagger

### Utilisation du swagger:

Le swagger contient une documentation complete de l'ensemble des routes de l'api, ainsi qu'un schema de données pour les films et les commantaires. Sous chaque route, on peut cliquer sur try it out pour tester la route !

### Prerequis et installation pour se servir du projet

- git clone
- npm install: installation des dependances pour le bon fonctionnement du projet
- ajouter un .env.local avec la viriable MONGODB_URI ainsi que ca value pour realiser la connexion à MongoDB,
- npm run dev pour pouvoir lancer et utiliser le projet à sa guise

### Attention

Certaine connexion peuvent etre refusé pour se connecter à MongoDB, veillez à etre sur un reseau privé.
