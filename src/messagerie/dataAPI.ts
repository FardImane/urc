import { useEffect, useMemo, useState } from "react";

interface Message {
  content: string;
  created_on: string;
  sended_by: number;
  sender_username: string;
  sended_to: number;
  room_id: number;
}

interface Column {
  name: string;
  uid: string;
}

interface User {
  id: number;
  name: string;
  role: string;
  team: string;
  status: "active" | "paused" | "vacation";
  avatar: string;
  email: string;
}

interface Data {
  columns: Column[];
  users: User[];
  messages: Message[];
}

export function useData() {
    const [data, setData] = useState<Data | null>(null);
  
    const fetchData = async () => {
      try {
        const response = await fetch("api/listmessages", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
  
        const apiData: Message[] = await response.json();
  
        const adaptedData: Data = {
          columns: [
            { name: "Content", uid: "content" },
            { name: "Created On", uid: "created_on" },
            { name: "Sender", uid: "sender_username" },
            { name: "Sended To", uid: "sended_to" },
            { name: "Room ID", uid: "room_id" },
          ],
          users: apiData.map((message) => ({
            id: message.sended_by,
            name: message.sender_username,
            role: "",
            team: "",
            status: "active",
            avatar: "",
            email: "",
          })),
          messages: apiData,
        };
  
        setData(adaptedData);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData(); // Call fetchData here to fix the issue.
    }, []);
  
    return useMemo(() => data, [data]);
  }
