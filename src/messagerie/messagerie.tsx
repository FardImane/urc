import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

interface CustomAvatarProps {
  src: string;
  alt: string;
}

const CustomAvatar: React.FC<CustomAvatarProps> = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
);

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
    [key: string]: string | number; // Index signature
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
    fetchData();
  }, []);

  return useMemo(() => data, [data]);
}

export function Messagerie() {
    const data = useData();

    if (!data) {
      return <div>Loading...</div>;
    }

    const memoizedRenderCell = useCallback(
        (user: User, columnKey: string | number) => {
      const cellValue = user[columnKey];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                src: user.avatar,
                style: { width: '50px', height: '50px' }
              }}
              description={user.email}
              name={cellValue}
            >
              {user.email}
            </User>
          );
        case "role":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
              <p className="text-bold text-sm capitalize text-default-400">{user.team}</p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={(statusColorMap[user.status as keyof typeof statusColorMap] as "success" | "danger" | "warning" | "default" | "primary" | "secondary" | undefined) || "default"}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
     [] 
  );

  return (
    <Table aria-label="Example table with custom cells">
    <TableHeader columns={data.columns}>
      {(column) => (
        <TableColumn
          key={column.uid}
          align={column.uid === "actions" ? "center" : "start"}
        >
          {column.name}
        </TableColumn>
      )}
    </TableHeader>
    <TableBody items={data.users}>
      {(item) => (
        <TableRow key={item.id}>
          {(columnKey) => (
            <TableCell>{memoizedRenderCell(item, columnKey)}</TableCell>
          )}
        </TableRow>
      )}
    </TableBody>
  </Table>
  );
}
