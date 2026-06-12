import dotenv from "dotenv";
dotenv.config();

import { AssemblyAI } from "assemblyai";

console.log("ASSEMBLY FROM SERVICE =", process.env.ASSEMBLYAI_API_KEY);

const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_API_KEY
});

export default client;