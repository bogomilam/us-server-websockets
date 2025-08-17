import { Db } from "mongodb";
/**
 * Fetch data from all endpoints and store in MongoDB
 * @param db - MongoDB database instance
 * @param broadcast - optional callback to broadcast new data
 */
export declare function fetchAndStore(db: Db, broadcast?: (msg: any) => void): Promise<void>;
//# sourceMappingURL=fetchData.d.ts.map