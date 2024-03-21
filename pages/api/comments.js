/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         movie_id:
 *           type: string
 *         text:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 * /api/comments:
 *   get:
 *     summary: Get all comments
 *     description: Returns a list of comments from the MongoDB database.
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: A list of comments.
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
 *             example:
 *               - _id: "5a9427648b0beebeb6957a21"
 *                 name: "Jaqen H'ghar"
 *                 email: "tom_wlaschiha@gameofthron.es"
 *                 comment: "Minima odit officiis minima nam. Aspernatur id reprehenderit eius inventore amet laudantium. Eos unde enim recusandae fugit sint."
 *       405:
 *         description: Méthode non autorisée.
 */

import { MongoConfig } from "../../services/MongoConfigService";
import { OrmService } from "../../services/OrmService";

export default async function handler(req, res) {
    switch (req.method) {
        case "GET":
            try {
                const comments = await OrmService.connectAndFind(MongoConfig.collections.comments);
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
