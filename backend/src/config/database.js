import mongoose from "mongoose";
// Source - https://stackoverflow.com/a/79892633
// Posted by Xoosk
// Retrieved 2026-02-25, License - CC BY-SA 4.0

import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI lipsește din .env!");
    }

    // Conexiunea cu setări de stabilitate maximă
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 20000, // Așteaptă 20 secunde
      family: 4, // Forțează IPv4
    });

    console.log(`✅ MongoDB Conectat: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error("❌ Eroare Mongoose:", error.message);
    process.exit(1);
  }
};

export default connectDB;
