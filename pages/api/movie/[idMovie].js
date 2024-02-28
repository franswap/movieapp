// [] permet d'indiquer à next qu'on lui passe un objet dynamique.

import { MongoConfig } from "../../../services/MongoConfigService";
import { OrmService } from "../../../services/OrmService";


export default async function handler(req, res) {
    const { idMovie } = req.query;

    switch (req.method) {
        case "POST":
            try {
                // Insertion du document
                const insertMovie = await OrmService.connectAndInsertOne(MongoConfig.collections.movies, req);
                res.status(200).json({ message: `Le film avec l'ID : ${insertMovie.insertedId} a bien été ajouté` });
            } catch (error) {
                console.error('Erreur lors de l\'insertion du document :', error);
                res.status(500).json({ error: 'Erreur lors de l\'insertion du document' });
            }
            break;
        case "GET":
            try {
                // Récupération du film par ID
                const dbMovie = await OrmService.connectAndFindOne(MongoConfig.collections.movies, idMovie);
                res.status(200).json({ movie: dbMovie });
            } catch (error) {
                console.error('Erreur lors de la récupération du document :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération du document' });
            }
            break;
        case "DELETE":
            try {
                // Suppression du film par ID
                const deleteMovie = await OrmService.connectAndDeleteOne(MongoConfig.collections.movies, idMovie);
                res.status(200).json({ message: `Le film avec l'ID : ${idMovie} a bien été supprimé` });
            } catch (error) {
                console.error('Erreur lors de la suppression du document :', error);
                res.status(500).json({ error: 'Erreur lors de la suppression du document' });
            }
            break;
        case "PUT":
            try {
                // Mise à jour de n'importe quel paramètre du film par ID
                const updatedMovie = await OrmService.connectAndUpdateOne(MongoConfig.collections.movies, req);
                res.status(200).json({ message: `Le film avec l'ID : ${idMovie} a bien été mis à jour` });
            } catch (error) {
                console.error('Erreur lors de la mise à jour du film :', error);
                res.status(500).json({ error: 'Erreur lors de la mise à jour du film' });
            }
            break;    
        default:
            res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
