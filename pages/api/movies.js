/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         plot:
 *           type: string
 *         genres:
 *           type: array
 *           items:
 *             type: string
 *         runtime:
 *           type: integer
 *         cast:
 *           type: array
 *           items:
 *             type: string
 *         poster:
 *           type: string
 *           format: uri
 *         title:
 *           type: string
 *         fullplot:
 *           type: string
 *         languages:
 *           type: array
 *           items:
 *             type: string
 *         released:
 *           type: string
 *           format: date-time
 *         directors:
 *           type: array
 *           items:
 *             type: string
 *         rated:
 *           type: string
 *         awards:
 *           type: object
 *           properties:
 *             wins:
 *               type: integer
 *             nominations:
 *               type: integer
 *             text:
 *               type: string
 *         lastupdated:
 *           type: string
 *           format: date-time
 *         year:
 *           type: integer
 *         imdb:
 *           type: object
 *           properties:
 *             rating:
 *               type: number
 *             votes:
 *               type: integer
 *             id:
 *               type: integer
 *         countries:
 *           type: array
 *           items:
 *             type: string
 *         type:
 *           type: string
 *         tomatoes:
 *           type: object
 *           properties:
 *             viewer:
 *               type: object
 *               properties:
 *                 rating:
 *                   type: number
 *                 numReviews:
 *                   type: integer
 *                 meter:
 *                   type: integer
 *             fresh:
 *               type: integer
 *             critic:
 *               type: object
 *               properties:
 *                 rating:
 *                   type: number
 *                 numReviews:
 *                   type: integer
 *                 meter:
 *                   type: integer
 *             rotten:
 *               type: integer
 *             lastUpdated:
 *               type: string
 *               format: date-time
 *         num_mflix_comments:
 *           type: integer
 * /api/movies:
 *   get:
 *     summary: Get all movies
 *     description: Returns a list of movies from the MongoDB database.
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: A list of movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: The unique identifier of the movie.
 *                   title:
 *                     type: string
 *                     description: The title of the movie.
 *                   year:
 *                     type: integer
 *                     description: The release year of the movie.
 *                   director:
 *                     type: string
 *                     description: The director of the movie.
 *                 example:
 *                   _id: "573a1390f29313caabcd42e8"
 *                   plot: "A group of bandits stage a brazen train hold-up, only to find a determined posse hot on their heels."
 *                   genres: ["Short", "Western"]
 *                   runtime: 11
 *                   cast: ["A.C. Abadie", "Gilbert M. 'Broncho Billy' Anderson", "George Barnes", "Justus D. Barnes"]
 *                   poster: "https://m.media-amazon.com/images/M/MV5BMTU3NjE5NzYtYTYyNS00MDVmLWIwYjgtMmYwYWIxZDYyNzU2XkEyXkFqcGdeQXVyNzQzNzQxNzI@._V1_SY1000_SX677_AL_.jpg"
 *                   fullplot: "Among the earliest existing films in American cinema - notable as the first film that presented a narrative story to tell - it depicts a group of cowboy outlaws who hold up a train and rob the passengers. They are then pursued by a Sheriff's posse. Several scenes have color included - all hand tinted."
 *                   languages: ["English"]
 *                   released: "1903-12-01T00:00:00.000Z"
 *                   directors: ["Edwin S. Porter"]
 *                   rated: "TV-G"
 *                   awards:
 *                     type: object
 *                     properties:
 *                       wins:
 *                         type: integer
 *                       nominations:
 *                         type: integer
 *                       text:
 *                         type: string
 *                   lastupdated: "2015-08-13 00:27:59.177000000"
 *                   year: 1903
 *                   imdb:
 *                     type: object
 *                     properties:
 *                       rating:
 *                         type: number
 *                       votes:
 *                         type: integer
 *                       id:
 *                         type: integer
 *                   countries: ["USA"]
 *                   type: "movie"
 *                   tomatoes:
 *                     type: object
 *                     properties:
 *                       viewer:
 *                         type: object
 *                         properties:
 *                           rating:
 *                             type: number
 *                           numReviews:
 *                             type: integer
 *                           meter:
 *                             type: integer
 *                       fresh:
 *                         type: integer
 *                       critic:
 *                         type: object
 *                         properties:
 *                           rating:
 *                             type: number
 *                           numReviews:
 *                             type: integer
 *                           meter:
 *                             type: integer
 *                       rotten:
 *                         type: integer
 *                       lastUpdated:
 *                         type: string
 *                   num_mflix_comments:
 *                     type: integer
 *       405:
 *         description: Méthode non autorisée.
 */

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