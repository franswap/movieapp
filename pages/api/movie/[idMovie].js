// [] permet d'indiquer à next qu'on lui passe un objet dynamique.

/**
 * @swagger
 * /api/movie/{idMovie}:
 *   post:
 *     summary: Add a new movie
 *     description: Add a new movie to the database.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: The ID of the movie to add.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the movie.
 *               year:
 *                 type: integer
 *                 description: The release year of the movie.
 *               director:
 *                 type: string
 *                 description: The director of the movie.
 *             example:
 *               title: "Inception"
 *               year: 2010
 *               director: "Christopher Nolan"
 *     responses:
 *       200:
 *         description: The movie has been successfully added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                 insertedId:
 *                   type: string
 *                   description: The ID of the inserted movie.
 *       500:
 *         description: An error occurred while trying to add the movie.
 *   get:
 *     summary: Get movie by ID
 *     description: Get movie details by ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: The ID of the movie to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie details retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the movie.
 *                 year:
 *                   type: integer
 *                   description: The release year of the movie.
 *                 director:
 *                   type: string
 *                   description: The director of the movie.
 *               example:
 *                 title: "Inception"
 *                 year: 2010
 *                 director: "Christopher Nolan"
 *       500:
 *         description: An error occurred while trying to retrieve the movie.
 *   delete:
 *     summary: Delete movie by ID
 *     description: Delete movie by ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: The ID of the movie to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The movie has been successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       500:
 *         description: An error occurred while trying to delete the movie.
 *   put:
 *     summary: Update movie by ID
 *     description: Update movie details by ID.
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: The ID of the movie to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the movie.
 *               year:
 *                 type: integer
 *                 description: The updated release year of the movie.
 *               director:
 *                 type: string
 *                 description: The updated director of the movie.
 *             example:
 *               title: "Updated Title"
 *               year: 2022
 *               director: "Updated Director"
 *     responses:
 *       200:
 *         description: The movie has been successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       500:
 *         description: An error occurred while trying to update the movie.
 */

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
                const idMovie = req.query.idMovie;
                const updatedMovie = await OrmService.connectAndUpdateOne(MongoConfig.collections.movies, idMovie, req);
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
