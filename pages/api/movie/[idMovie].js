// [] permet d'indiquer à next qu'on lui passe un objet dynamique.

import { ObjectId } from "mongodb";
import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const { idMovie } = req.query;

    switch (req.method) {
        case "POST":
            try {
                // Exemple à inserer
                const newMovie = {
                    title: 'Mon super film',
                    year: 2024,
                    director: 'John Doe',
                };

                // Insertion du document
                const insertMovie = await db.collection("movies").insertOne(newMovie);
                res.status(200).json({ message: `Le film avec l'ID : ${insertMovie.insertedId} a bien été ajouté` });
            } catch (error) {
                console.error('Erreur lors de l\'insertion du document :', error);
                res.status(500).json({ error: 'Erreur lors de l\'insertion du document' });
            }
            break;
        case "GET":
            try {
                // Récupération du film par ID
                const dbMovie = await db.collection("movies").findOne({ _id: new ObjectId(idMovie) });
                res.status(200).json({ movie: dbMovie });
            } catch (error) {
                console.error('Erreur lors de la récupération du document :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération du document' });
            }
            break;
        case "DELETE":
            try {
                // Suppression du film par ID
                const deleteMovie = await db.collection("movies").deleteOne({ _id: new ObjectId(idMovie) });
                res.status(200).json({ message: `Le film avec l'ID : ${idMovie} a bien été supprimé` });
            } catch (error) {
                console.error('Erreur lors de la suppression du document :', error);
                res.status(500).json({ error: 'Erreur lors de la suppression du document' });
            }
            break;
        case "PUT":
            try {
                // Mise à jour de n'importe quel paramètre du film par ID
                const updatedMovie = await db.collection("movies").updateOne(
                    { _id: new ObjectId(idMovie) },
                    { $set: req.body }
                );
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
