import mongodb, { MongoClient } from 'mongodb'
export const connectDB = async (address: string, dbName: string) => {
    try {
        const mongoClient = new MongoClient(address);
        await mongoClient.connect();
        const db = mongoClient.db(dbName);

        console.log(`MongoDB Connected`);
        return db
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}