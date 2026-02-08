import mongoose, { Schema } from "mongoose";

const historySchema = new Schema(
    {
        subject: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 50,
            trim: true,
        },

        text: {
            type: String,
            required: true,
            minLength: 5,
        },

        mails: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const History = mongoose.model("mail", historySchema);

export default History;
