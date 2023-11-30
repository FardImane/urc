import { sql } from "@vercel/postgres";
import {checkSession, unauthorizedResponse} from "../lib/session";
import {getConnecterUser, triggerNotConnected} from "../lib/session";

export const config = {
    runtime: 'edge',
};

export default async function handler(request) {
    console.log("Request Object this:", request);

    try {
        const checkSessionResult = await checkSession(request);
        console.log("checkSession Result:", checkSessionResult);
    
        if (!checkSessionResult) {
            console.log("Not connected");
            return unauthorizedResponse();
        }

        const { rowCount, rows } = await sql`select user_id, username, TO_CHAR(last_login, 'DD/MM/YYYY HH24:MI') as last_login from users order by last_login desc`;
        console.log("Got " + rowCount + " users");

        if (rowCount === 0) {
            /* Vercel bug doesn't allow 204 response status */
            return new Response("[]", {
                status: 200,
                headers: { 'content-type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify(rows), {
                status: 200,
                headers: { 'content-type': 'application/json' },
            });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error:"THe eoor"+ error.message, stack: error.stack, request: request }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
