"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
const connectDB = async (address, dbName) => {
    try {
        const mongoClient = new mongodb_1.MongoClient(address);
        await mongoClient.connect();
        const db = mongoClient.db(dbName);
        console.log(`MongoDB Connected`);
        return db;
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
    }
};
exports.connectDB = connectDB;
