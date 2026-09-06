import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY 
});

const MODELS = [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "groq/compound-mini",
    "qwen/qwen3.8-27b"
];

export async function createGroqChat(messages) {
    let lastError = null;
    for (const model of MODELS) {
        try {
            const completion = await groq.chat.completions.create({
                messages,
                model
            });
            return completion.choices[0]?.message?.content || "";
        } catch (err) {
            console.warn(`Model ${model} failed, trying next model:`, err.message);
            lastError = err;
        }
    }
    throw lastError || new Error("All Groq models failed");
}

export default groq;