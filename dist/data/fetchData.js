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
/**
 * Fetch data from all endpoints and store in MongoDB
 * @param db - MongoDB database instance
 * @param broadcast - optional callback to broadcast new data
 */
function fetchAndStore(db, broadcast) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const endpoint of config_1.ENDPOINTS) {
            try {
                const res = yield fetch(endpoint.url);
                if (!res.ok)
                    throw new Error(`HTTP error ${res.status}`);
                const data = yield res.json();
                const doc = Object.assign(Object.assign({}, data), { endpoint: endpoint.region, createdAt: new Date() });
                yield db.collection("status").insertOne(doc);
                console.log(`✅ Fetched ${endpoint.region}`);
                if (broadcast)
                    broadcast({ type: "update", data: doc });
            }
            catch (err) {
                console.error(`❌ Error fetching ${endpoint.region}:`, err);
            }
        }
    });
}
//# sourceMappingURL=fetchData.js.map