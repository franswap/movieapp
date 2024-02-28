// Importez clientPromise depuis le fichier lib/mongodb.js
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");

    switch (req.method) {
        case "GET":
            try {
                const comments = await db.collection("comments").find({}).limit(20).toArray();
                res.status(200).json({ data: comments });
            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
            }
            break;
        default:
            res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
