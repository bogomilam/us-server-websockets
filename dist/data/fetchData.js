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
const config_1 = require("../config");
function fetchAndStore(db, wsServer) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const ep of config_1.ENDPOINTS) {
            try {
                const res = yield fetch(ep.url);
                const data = yield res.json();
                const doc = {
                    region: ep.region,
                    data,
                    createdAt: new Date(),
                };
                yield db.collection("status").insertOne(doc);
                // Broadcast new data
                wsServer.clients.forEach((client) => {
                    if (client.readyState === 1) {
                        client.send(JSON.stringify({ type: "live", data: doc }));
                    }
                });
                console.log(`✅ Fetched ${ep.region}`);
            }
            catch (err) {
                console.error(`❌ Error fetching ${ep.region}:`, err);
            }
        }
    });
}
//# sourceMappingURL=fetchData.js.map