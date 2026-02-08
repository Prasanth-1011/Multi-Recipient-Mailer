import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            minLength: 3,
            maxLength: 20,
            trim: true,
        },
        mail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

adminSchema.pre("save", function () {
    if (!this.isModified("password")) return;
    this.password = bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const Admin = mongoose.model("admin", adminSchema);

export default Admin;
