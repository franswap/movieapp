// Importez clientPromise depuis le fichier lib/mongodb.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (req.method) {
        case "GET":
            try {
                const movies = await db.collection("movies").find({}).limit(20).toArray();
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
