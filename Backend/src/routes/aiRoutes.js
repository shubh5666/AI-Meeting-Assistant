import express from "express";
import Meeting from "../models/meeting.js";
import auth from "../middleware/auth.js";

import fs from "fs";
import client from "../services/assemblyai.js";
import groq from "../services/groq.js";

const aiRouter = express.Router();

//transcriber
aiRouter.post(
    "/meetings/:id/transcribe",
    auth,
    async(req,res) => {

        try{

            const meeting = await Meeting.findById(
                req.params.id
            );

            if(!meeting){
                return res.status(404).send(
                    "Meeting not found"
                );
            }

             
            const transcript =
                await client.transcripts.transcribe({
                    audio: fs.createReadStream(meeting.audioFile)
                });

            meeting.transcript =
                transcript.text;
                

            await meeting.save();

            res.send({
                message: "Transcript generated",
                transcript: meeting.transcript
            });

        }catch(err){

            console.log(err);

            res.status(500).send(
                "Something went wrong"
            );
        }

    }
);


// summary
aiRouter.post(
    "/meetings/:id/summary",
    auth,
    async(req,res) => {

        try{

            const meeting = await Meeting.findById(
                req.params.id
            );

            if(!meeting){
                return res.status(404).send(
                    "Meeting not found"
                );
            }

            const completion =
            await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: `Summarize the following meeting transcript:

${meeting.transcript}`
                    }
                ],
                model: "llama-3.3-70b-versatile"
            });

            meeting.summary =
            completion.choices[0].message.content;

            await meeting.save();

            res.send({
                message: "Summary generated",
                summary: meeting.summary
            });

        }catch(err){

            console.log(err);

            res.status(500).send(
                "Something went wrong"
            );
        }

    }
);


 // action items
aiRouter.post(
    "/meetings/:id/action-items",
    auth,
    async (req, res) => {

        try {

            const meeting = await Meeting.findById(
                req.params.id
            );

            if (!meeting) {
                return res.status(404).send(
                    "Meeting not found"
                );
            }

            const completion =
                await groq.chat.completions.create({
                    messages: [
                        {
                            role: "user",
                            content: `Analyze the following meeting transcript.
                           Extract all actionable tasks.
                            If there are no tasks, return:
                             No action items found

                   Transcript:

                ${meeting.transcript}`
                        }
                    ],
                    model: "llama-3.3-70b-versatile"
                });

            const actionItemsText =
                completion.choices[0].message.content;

            meeting.actionItems =
                actionItemsText
                    .split("\n")
                    .map(item =>
                        item
                            .replace("*", "")
                            .replace("-", "")
                            .trim()
                    )
                    .filter(item => item !== "");

            await meeting.save();

            res.send({
                message: "Action items generated",
                actionItems: meeting.actionItems
            });

        } catch (err) {

            console.log(err);

            res.status(500).send(
                "Something went wrong"
            );
        }

    }
);


// decisions
aiRouter.post(
    "/meetings/:id/decisions",
    auth,
    async (req, res) => {

        try {

            const meeting = await Meeting.findById(
                req.params.id
            );

            if (!meeting) {
                return res.status(404).send(
                    "Meeting not found"
                );
            }

            const completion =
                await groq.chat.completions.create({
                    messages: [
                        {
                            role: "user",
                            content: `Extract decisions made in this meeting.

${meeting.transcript}`
                        }
                    ],
                    model: "llama-3.3-70b-versatile"
                });

            const decisionsText =
                completion.choices[0].message.content;

            meeting.decisions =
                decisionsText
                    .split("\n")
                    .map(item =>
                        item
                            .replace("*", "")
                            .replace("-", "")
                            .trim()
                    )
                    .filter(item => item !== "");

            await meeting.save();

            res.send({
                message: "Decisions generated",
                decisions: meeting.decisions
            });

        } catch (err) {

            console.log(err);

            res.status(500).send(
                "Something went wrong"
            );
        }

    }
);

// followups
aiRouter.post(
    "/meetings/:id/follow-ups",
    auth,
    async (req, res) => {

        try {

            const meeting = await Meeting.findById(
                req.params.id
            );

            if (!meeting) {
                return res.status(404).send(
                    "Meeting not found"
                );
            }

            const completion =
                await groq.chat.completions.create({
                    messages: [
                        {
                            role: "user",
                            content: `Suggest follow up actions based on this meeting.

${meeting.transcript}`
                        }
                    ],
                    model: "llama-3.3-70b-versatile"
                });

            const followUpText =
                completion.choices[0].message.content;

            meeting.followUps =
                followUpText
                    .split("\n")
                    .map(item =>
                        item
                            .replace("*", "")
                            .replace("-", "")
                            .trim()
                    )
                    .filter(item => item !== "");

            await meeting.save();

            res.send({
                message: "Follow ups generated",
                followUps: meeting.followUps
            });

        } catch (err) {

            console.log(err);

            res.status(500).send(
                "Something went wrong"
            );
        }

    }
);

export default aiRouter;