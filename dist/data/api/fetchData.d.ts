import { Db } from "mongodb";
export interface WorkerStats {
    wait_time: number;
    workers: number;
    waiting: number;
    idle: number;
    time_to_return: number;
    recently_blocked_keys: any[];
    top_keys: any[];
}
export interface ServerStats {
    cpus: number;
    active_connections: number;
    wait_time: number;
    workers: WorkerStats[];
    cpu_load: number;
    timers: number;
}
export interface StatusData {
    region: string;
    status: string;
    createdAt: Date;
    server: ServerStats;
}
export declare function fetchAndStore(db: Db, broadcast?: (data: StatusData[]) => void): Promise<StatusData[]>;
//# sourceMappingURL=fetchData.d.ts.map