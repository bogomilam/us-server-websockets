import { Document, Model } from "mongoose";
export interface IStatus extends Document {
    region: string;
    data: any;
    createdAt: Date;
}
export declare const StatusModel: Model<IStatus>;
//# sourceMappingURL=Status.d.ts.map