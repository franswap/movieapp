import { OrmService } from "../../services/OrmService";
import { MongoConfig } from "../../services/MongoConfigService";

export default async function handler(req, res) {

    switch (req.method) {
        case "GET":
            try {
                const movies = await OrmService.connectAndFind(MongoConfig.collections.movies);
                res.status(200).json({ data: movies });
            } catch (error) {
                console.error('Erreur lors de la récupération des films :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des films' });
            }
            break;
        default:
            res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
