import { Router } from "express";
import nodemailer from "nodemailer";

import History from "../Models/History.mjs";

const router = Router();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER,
        pass: process.env.PASS,
    },
});

router.post("/mail", async (req, res) => {
    const { subject, text, mails } = req.body;

    if (!mails) return res.status(400).json({ message: "Mails Not Received" });

    if (!subject || !text)
        return res
            .status(400)
            .json({ message: "Subject And Message Are Required" });

    try {
        for (let i = 0; i < mails.length; i++) {
            const info = await transporter.sendMail({
                from: process.env.SENDER,
                to: mails[i],
                subject,
                text,
            });
        }

        await History.create({ subject, text, mails });

        return res.status(200).json({
            message: `Mail Sent For ${mails.length} Users Successfully`,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: error.message,
        });
    }
});

router.get("/mails/count", async (req, res) => {
    try {
        const count = await History.countDocuments();
        if (count) return res.status(200).json({ count });
    } catch (error) {
        return res.status(500).json({
            error: error.message,
            message: "An Unexpected Error Occured. Try Sometime Later",
        });
    }
});

export default router;
