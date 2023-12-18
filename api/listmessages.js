import { getConnecterUser, triggerNotConnected } from "../lib/session";
import { kv } from "@vercel/kv";
import { db } from "@vercel/postgres";

export default async (request, response) => {
  try {
    // Vérifiez si l'utilisateur est connecté
    // const user = await getConnecterUser(request);
    // if (user === undefined || user === null) {
    //   console.log("Not connected");
    //   triggerNotConnected(response);
    //   return;
    // }

    const messagesQuery = `
      SELECT
        messages.content,
        messages.created_on,
        messages.sended_by,
        users.username as sender_username,
        messages.sended_to,
        messages.room_id
      FROM
        messages
      INNER JOIN
        users ON messages.sended_by = users.user_id
      ORDER BY
        messages.created_on DESC
    `;

    const client = await db.connect();
    const result = await client.query(messagesQuery);
    const messagesWithSenderUsername = result.rows;

    response.status(200).json(messagesWithSenderUsername);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.end();
  }
};
