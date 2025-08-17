"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAndStore = fetchAndStore;
function fetchAndStore(db, broadcast) {
    return __awaiter(this, void 0, void 0, function* () {
        const regions = ["us-west", "eu-west", "ap-southeast"];
        const data = regions.map((region) => ({
            region,
            status: Math.random() > 0.5 ? "up" : "down",
            createdAt: new Date(),
            server: {
                cpus: Math.floor(Math.random() * 8) + 1,
                active_connections: Math.floor(Math.random() * 10000),
                wait_time: Math.floor(Math.random() * 2000),
                workers: [
                    {
                        wait_time: 0,
                        workers: 0,
                        waiting: 0,
                        idle: 0,
                        time_to_return: 0,
                        recently_blocked_keys: [],
                        top_keys: [],
                    },
                    {
                        wait_time: Math.floor(Math.random() * 2000),
                        workers: Math.floor(Math.random() * 3000),
                        waiting: Math.floor(Math.random() * 100),
                        idle: Math.floor(Math.random() * 300),
                        time_to_return: Math.floor(Math.random() * 150000),
                        recently_blocked_keys: [],
                        top_keys: [],
                    },
                ],
                cpu_load: parseFloat(Math.random().toFixed(2)),
                timers: Math.floor(Math.random() * 200),
            },
        }));
        yield db.collection("status").insertMany(data);
        if (broadcast)
            broadcast(data);
        return data;
    });
}
//# sourceMappingURL=fetchData.js.map