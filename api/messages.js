import {getConnecterUser, triggerNotConnected} from "../lib/session";
import {kv} from "@vercel/kv";
import {db} from "@vercel/postgres";
//const PushNotifications = require("@pusher/push-notifications-server");

export default async (request, response) => {
    try {
        const headers = new Headers(request.headers);
        // const user = await getConnecterUser(request);
        // if (user === undefined || user === null) {
        //     console.log("Not connected");
        //     triggerNotConnected(response);
        // }
        const message  = await request.body;
        console.log("message :", message);
        const client = await db.connect();
        response.send("OK");
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
};