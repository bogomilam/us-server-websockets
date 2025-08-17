import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStatus extends Document {
  region: string;
  data: any; // raw API payload
  createdAt: Date;
}

const StatusSchema: Schema<IStatus> = new Schema(
  {
    region: { type: String, required: true, index: true },
    data: { type: Schema.Types.Mixed, required: true }, // flexible JSON
    createdAt: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true }
);

// Optional: keep documents for only 7 days
StatusSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

export const StatusModel: Model<IStatus> = mongoose.model<IStatus>(
  "Status",
  StatusSchema
);
