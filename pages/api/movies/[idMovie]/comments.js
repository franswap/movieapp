/**
 * @swagger
 * /api/movies/{idMovie}/comments:
 *   get:
 *     summary: Get comments by movie ID
 *     description: Returns comments associated with a specific movie ID from the MongoDB database.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: The ID of the movie to retrieve comments for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of comments for the specified movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the comment.
 *                   name:
 *                     type: string
 *                     description: The name of the commenter.
 *                   email:
 *                     type: string
 *                     description: The email of the commenter.
 *                   comment:
 *                     type: string
 *                     description: The comment text.
 *                 example:
 *                   _id: "612fba4f72f68a001d7e61bc"
 *                   name: "John Doe"
 *                   email: "john.doe@example.com"
 *                   comment: "Great movie!"
 *       405:
 *         description: Méthode non autorisée.
 */

import { MongoConfig } from "../../../../services/MongoConfigService";
import { OrmService } from "../../../../services/OrmService";

export default async function handler(req, res) {
    const { idMovie } = req.query;

    switch (req.method) {
        case "GET":
            try {
                const comment = await OrmService.connectAndFind(MongoConfig.collections.comments, idMovie);
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
