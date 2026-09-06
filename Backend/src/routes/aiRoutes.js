import express from "express";
import Meeting from "../models/meeting.js";
import auth from "../middleware/auth.js";

import fs from "fs";
import client from "../services/assemblyai.js";
import { createGroqChat } from "../services/groq.js";

const aiRouter = express.Router();

// Helper to clean bullet points into neat arrays
const parseBulletPoints = (text) => {
    if (!text) return [];
    return text
        .split("\n")
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => item.replace(/^[-*•\d\.\)\s]+/, "").trim())
        .filter(item => item.length > 0 && !item.toLowerCase().startsWith("transcript:"));
};

// Transcriber
aiRouter.post(
    "/meetings/:id/transcribe",
    auth,
    async (req, res) => {
        try {
            const meeting = await Meeting.findById(req.params.id);

            if (!meeting) {
                return res.status(404).send("Meeting not found");
            }

            if (!meeting.audioFile || !fs.existsSync(meeting.audioFile)) {
                return res.status(400).send("Audio file not found on server. Please re-upload audio.");
            }

            const transcript = await client.transcripts.transcribe({
                audio: fs.createReadStream(meeting.audioFile)
            });

            meeting.transcript = transcript.text || "";
            await meeting.save();

            res.send({
                message: "Transcript generated",
                transcript: meeting.transcript
            });
        } catch (err) {
            console.error("Transcribe error:", err);
            res.status(500).send(err.message || "Failed to transcribe audio");
        }
    }
);

// Executive Summary
aiRouter.post(
    "/meetings/:id/summary",
    auth,
    async (req, res) => {
        try {
            const meeting = await Meeting.findById(req.params.id);

            if (!meeting) {
                return res.status(404).send("Meeting not found");
            }

            if (!meeting.transcript || !meeting.transcript.trim()) {
                return res.status(400).send("Transcript not found. Please upload audio and generate transcript first.");
            }

            const summaryText = await createGroqChat([
                {
                    role: "system",
                    content: `You are an elite executive AI assistant.
Generate a clean, clear, and highly readable meeting summary.

Format your response strictly using this layout:
### 📌 Overview
A concise 2-3 sentence summary explaining the core purpose and context of the meeting.

### 💬 Key Discussion Points
- Clean bullet points explaining what each person said or discussed.
- Focus on key information, topics, and context.

### 🎯 Key Outcomes & Next Steps
- Clear bullet points highlighting the conclusions, decisions, or immediate next steps.

RULES:
1. NEVER use markdown tables or pipe symbols (|).
2. Do NOT add meta text like "Prepared by", "Date", "End of summary", or document headers.
3. Keep the language simple, professional, and easily scannable.`
                },
                {
                    role: "user",
                    content: `Meeting Transcript:\n\n${meeting.transcript}`
                }
            ]);

            meeting.summary = summaryText;
            await meeting.save();

            res.send({
                message: "Summary generated",
                summary: meeting.summary
            });
        } catch (err) {
            console.error("Summary error:", err);
            res.status(500).send(err.message || "Failed to generate summary");
        }
    }
);

// Action Items
aiRouter.post(
    "/meetings/:id/action-items",
    auth,
    async (req, res) => {
        try {
            const meeting = await Meeting.findById(req.params.id);

            if (!meeting) {
                return res.status(404).send("Meeting not found");
            }

            if (!meeting.transcript || !meeting.transcript.trim()) {
                return res.status(400).send("Transcript not found. Please upload audio and generate transcript first.");
            }

            const actionItemsText = await createGroqChat([
                {
                    role: "system",
                    content: "You are an executive assistant. Extract all actionable tasks from the meeting transcript as clean bullet points starting with a dash (-). RULES: Do not use tables or pipes (|). Do not add preamble or sign-off."
                },
                {
                    role: "user",
                    content: `Extract all actionable tasks from this transcript:\n\n${meeting.transcript}`
                }
            ]);

            meeting.actionItems = parseBulletPoints(actionItemsText);
            await meeting.save();

            res.send({
                message: "Action items generated",
                actionItems: meeting.actionItems
            });
        } catch (err) {
            console.error("Action items error:", err);
            res.status(500).send(err.message || "Failed to generate action items");
        }
    }
);

// Key Decisions
aiRouter.post(
    "/meetings/:id/decisions",
    auth,
    async (req, res) => {
        try {
            const meeting = await Meeting.findById(req.params.id);

            if (!meeting) {
                return res.status(404).send("Meeting not found");
            }

            if (!meeting.transcript || !meeting.transcript.trim()) {
                return res.status(400).send("Transcript not found. Please upload audio and generate transcript first.");
            }

            const decisionsText = await createGroqChat([
                {
                    role: "system",
                    content: "You are an executive assistant. Extract all strategic decisions agreed upon during the meeting as clean bullet points starting with a dash (-). RULES: Do not use tables or pipes (|). Do not add preamble or sign-off."
                },
                {
                    role: "user",
                    content: `Extract all key decisions made in this meeting as bullet points (- item):\n\n${meeting.transcript}`
                }
            ]);

            meeting.decisions = parseBulletPoints(decisionsText);
            await meeting.save();

            res.send({
                message: "Decisions generated",
                decisions: meeting.decisions
            });
        } catch (err) {
            console.error("Decisions error:", err);
            res.status(500).send(err.message || "Failed to extract decisions");
        }
    }
);

// Follow-ups & Schedules
aiRouter.post(
    "/meetings/:id/follow-ups",
    auth,
    async (req, res) => {
        try {
            const meeting = await Meeting.findById(req.params.id);

            if (!meeting) {
                return res.status(404).send("Meeting not found");
            }

            if (!meeting.transcript || !meeting.transcript.trim()) {
                return res.status(400).send("Transcript not found. Please upload audio and generate transcript first.");
            }

            const followUpText = await createGroqChat([
                {
                    role: "system",
                    content: "You are an executive assistant. Suggest concrete follow-up actions and scheduling next steps as clean bullet points starting with a dash (-). RULES: Do not use tables or pipes (|). Do not add preamble or sign-off."
                },
                {
                    role: "user",
                    content: `Suggest follow-up actions and scheduling next steps based on this meeting as bullet points (- item):\n\n${meeting.transcript}`
                }
            ]);

            meeting.followUps = parseBulletPoints(followUpText);
            await meeting.save();

            res.send({
                message: "Follow ups generated",
                followUps: meeting.followUps
            });
        } catch (err) {
            console.error("Follow-ups error:", err);
            res.status(500).send(err.message || "Failed to extract follow-ups");
        }
    }
);

export default aiRouter;