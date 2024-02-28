import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const { idComment } = req.query;
    const { idMovie } = req.query;

    switch (req.method) {
        case "POST":
            try {
                // Exemple
                const newComment = {
                    name: "Andrea Le",
                    email: "andrea_le@fakegmail.com",
                    movie_id: new ObjectId(idMovie),
                    text: "Rem officiis eaque repellendus amet eos doloribus. Porro dolor voluptatum voluptates neque culpa molestias. Voluptate unde nulla temporibus ullam.",
                    date: new Date("2012-03-27T00:00:16.000Z"),
                };

                // Insertion du document
                const insertComment = await db.collection("comments").insertOne(newComment);
                res.status(200).json({ message: `Le commentaire avec l'ID : ${insertComment.insertedId} a bien été ajouté` });
            } catch (error) {
                console.error('Erreur lors de l\'insertion du commentaire :', error);
                res.status(500).json({ error: 'Erreur lors de l\'insertion du commentaire' });
            }
            break;
        case "GET":
            try {
                // Récupération des commentaires par ID du film
                const dbComment = await db.collection("comments").find({ movie_id: new ObjectId(idMovie) }).toArray();
                res.status(200).json({ comments: dbComment });
            } catch (error) {
                console.error('Erreur lors de la récupération des commentaires :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
            }
            break;
        case "DELETE":
            try {
                // Suppression des commentaires par ID du film
                const deleteComments = await db.collection("comments").deleteMany({ movie_id: new ObjectId(idMovie) });
                res.status(200).json({ message: `Les commentaires associés au film avec l'ID : ${idMovie} ont bien été supprimés` });
            } catch (error) {
                console.error('Erreur lors de la suppression des commentaires :', error);
                res.status(500).json({ error: 'Erreur lors de la suppression des commentaires' });
            }
            break;
        case "PUT":
            try {
                // Mise à jour de n'importe quel paramètre du film par ID
                const updatedComment = await db.collection("comments").updateOne(
                    { _id: new ObjectId(idMovie) },
                    { $set: req.body }
                );
                res.status(200).json({ message: `Le commentaire avec l'ID : ${idComment} a bien été mis à jour` });
            } catch (error) {
                console.error('Erreur lors de la mise à jour du film :', error);
                res.status(500).json({ error: 'Erreur lors de la mise à jour du film' });
            }
            break;
        default:
            res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
