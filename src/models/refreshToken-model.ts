import mongoose, { Schema, Document } from "mongoose";

export interface RefreshToken extends Document {
    expiresAt: Date;
    user: Schema.Types.ObjectId | string;
}

const refreshSchema = new Schema<RefreshToken>(
    {
        expiresAt: { type: Date, required: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true },
);

export default mongoose.model<RefreshToken>("Refresh_Token", refreshSchema);
