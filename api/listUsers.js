import { db } from '@vercel/postgres';
import { kv } from "@vercel/kv";


// Import getConnecterUser function from the other file

export const config = {
    runtime: 'edge',
};

export default async function getUsers() {
    try {
        //Get user information from the token
    //    const user = await getConnecterUser(request);

       // Check if the user is not authenticated
        // if (!user) {
        //     return unauthorizedResponse(user);
        // }

        const client = await db.connect();
        
        const result = await client.query(
            'SELECT user_id, username, TO_CHAR(last_login, \'DD/MM/YYYY HH24:MI\') as last_login FROM users ORDER BY last_login DESC'
        );

        const { rowCount, rows } = result;
        console.log("Got " + rowCount + " users");

        if (rowCount === 0) {
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
        return new Response(JSON.stringify({ error: "The error"+ request + error.message, stack: error.stack, request: request }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
}
