import { Router } from "express";

import nodemailer from "nodemailer";

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
        return res.status(200).json({ message: "Mail Sent Successfully" });
    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: error.message,
        });
    }
});

export default router;
