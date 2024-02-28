// Importez clientPromise depuis le fichier lib/mongodb.js
import { ObjectId } from "mongodb";
import clientPromise from "../../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const { idMovie } = req.query;

    switch (req.method) {
        case "GET":
            try {
                const comment = await db.collection("comments").find({  _id: new ObjectId(idMovie)}).toArray();
                res.status(200).json({ data: comment });
            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
            }
            break;
        default:
            res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
