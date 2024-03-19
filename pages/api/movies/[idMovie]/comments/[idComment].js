/**
 * @swagger
 * /api/movies/{idMovie}/comments/{idComment}:
 *   post:
 *     summary: Add a new comment
 *     description: Add a new comment for a specific movie.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: The ID of the movie to add a comment to.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the commenter.
 *               email:
 *                 type: string
 *                 description: The email of the commenter.
 *               text:
 *                 type: string
 *                 description: The comment text.
 *             example:
 *               name: "John Doe"
 *               email: "john.doe@example.com"
 *               text: "Great movie!"
 *     responses:
 *       200:
 *         description: The comment has been successfully added.
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
 *                   description: The ID of the inserted comment.
 *       500:
 *         description: An error occurred while trying to add the comment.
 *   get:
 *     summary: Get a comment by ID
 *     description: Get a comment associated with a specific movie by comment ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: The ID of the movie.
 *         schema:
 *           type: string
 *       - in: path
 *         name: idComment
 *         required: true
 *         description: The ID of the comment to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The comment retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the comment.
 *                 name:
 *                   type: string
 *                   description: The name of the commenter.
 *                 email:
 *                   type: string
 *                   description: The email of the commenter.
 *                 text:
 *                   type: string
 *                   description: The comment text.
 *       500:
 *         description: An error occurred while trying to retrieve the comment.
 *   delete:
 *     summary: Delete a comment by ID
 *     description: Delete a comment associated with a specific movie by comment ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: The ID of the movie.
 *         schema:
 *           type: string
 *       - in: path
 *         name: idComment
 *         required: true
 *         description: The ID of the comment to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The comment has been successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       500:
 *         description: An error occurred while trying to delete the comment.
 *   put:
 *     summary: Update a comment by ID
 *     description: Update a comment associated with a specific movie by comment ID.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         description: The ID of the movie.
 *         schema:
 *           type: string
 *       - in: path
 *         name: idComment
 *         required: true
 *         description: The ID of the comment to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The updated name of the commenter.
 *               email:
 *                 type: string
 *                 description: The updated email of the commenter.
 *               text:
 *                 type: string
 *                 description: The updated comment text.
 *             example:
 *               name: "John Doe"
 *               email: "john.doe@example.com"
 *               text: "Updated comment!"
 *     responses:
 *       200:
 *         description: The comment has been successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *       500:
 *         description: An error occurred while trying to update the comment.
 */

import { OrmService } from "../../../../../services/OrmService";
import { MongoConfig } from "../../../../../services/MongoConfigService";

export default async function handler(req, res) {
    const { idComment } = req.query;
    const { idMovie } = req.query;

    switch (req.method) {
        case "POST":
            try {
                // Insertion du document
                const insertComment = await OrmService.connectAndInsertOne(MongoConfig.collections.comments, req)
                res.status(200).json({ message: `Le commentaire avec l'ID : ${insertComment.insertedId} a bien été ajouté` });
            } catch (error) {
                console.error('Erreur lors de l\'insertion du commentaire :', error);
                res.status(500).json({ error: 'Erreur lors de l\'insertion du commentaire' });
            }
            break;
        case "GET":
            try {
                // Récupération du commentaire par son ID
                const dbComment = await OrmService.connectAndFindOne(MongoConfig.collections.comments, idComment);
                res.status(200).json({ comment: dbComment });
            } catch (error) {
                console.error('Erreur lors de la récupération du commentaire :', error);
                res.status(500).json({ error: 'Erreur lors de la récupération du commentaire' });
            }
            break;
        case "DELETE":
            try {
                // Suppression du commentaire par son ID
                const deleteComment = await OrmService.connectAndDeleteOne(MongoConfig.collections.comments, idComment);
                res.status(200).json({ message: `Le commentaire avec l'ID : ${idComment} a bien été supprimé` });
            } catch (error) {
                console.error('Erreur lors de la suppression du commentaire :', error);
                res.status(500).json({ error: 'Erreur lors de la suppression du commentaire' });
            }
            break;
        case "PUT":
            try {
                // Mise à jour du commentaire par son ID
                const updatedComment = await OrmService.connectAndUpdateOne(MongoConfig.collections.comments, idComment, req);
                res.status(200).json({ message: `Le commentaire avec l'ID : ${idComment} a bien été mis à jour` });
            } catch (error) {
                console.error('Erreur lors de la mise à jour du commentaire :', error);
                res.status(500).json({ error: 'Erreur lors de la mise à jour du commentaire' });
            }
            break;
        default:
            res.status(405).json({ error: 'Méthode non autorisée' });
    }
}
