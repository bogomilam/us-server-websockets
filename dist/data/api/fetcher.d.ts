import { Db } from "mongodb";
import { WebSocketServer } from "ws";
interface ServiceStats {
    wait_time: number;
    workers: number;
    waiting: number;
    idle: number;
    time_to_return: number;
    recently_blocked_keys: any[];
    top_keys: [string, number][];
}
interface ServerStats {
    cpus: number;
    active_connections: number;
    wait_time: number;
    workers: [string, ServiceStats][];
    cpu_load: number;
    timers: number;
}
export interface StatusResponse {
    status: string;
    region: string;
    roles: string[];
    results: {
        services: Record<string, boolean>;
        stats: {
            servers_count: number;
            online: number;
            session: number;
            server: ServerStats;
        };
    };
    strict: boolean;
    server_issue: string | null;
    version: string;
}
export interface StatusDoc extends StatusResponse {
    createdAt: Date;
}
export declare function fetchAndStore(db: Db, wss: WebSocketServer): Promise<void>;
export {};
//# sourceMappingURL=fetcher.d.ts.map