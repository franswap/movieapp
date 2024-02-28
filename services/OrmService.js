// Importez clientPromise depuis le fichier lib/mongodb.js
import clientPromise from "/lib/mongodb";
import { MongoConfig } from "./MongoConfigService";
import { ObjectId } from "mongodb";

const connectToDb = async () => { 
    const client = await clientPromise;
    return client.db(MongoConfig.databases.mflix);
};

export const OrmService = {

    connectAndFind: async (dbName) => {
        const db = await connectToDb();
        return await db.collection(dbName).find({}).limit(20).toArray();
    },

    connectAndFindOne: async (dbName, idObjectToFind) => { 
        const db = await connectToDb();
        return await db.collection(dbName).findOne({ _id: new ObjectId(idObjectToFind) });
    },

    connectAndDeleteOne: async (dbName, idObjectToFind) => { 
        const db = await connectToDb();
        return await db.collection(dbName).deleteOne({ _id: new ObjectId(idObjectToFind) });
    },

    connectAndInsertOne: async (dbName, req) => { 
        try {
            const db = await connectToDb();
            const result = await db.collection(dbName).insertOne( req.body );
            return result;
        } catch (error) {
            console.error('Erreur lors de l\'insertion du document :', error);
            throw error; // Renvoie l'erreur pour qu'elle soit gérée par le code appelant si nécessaire
        }
    },
};