import socketIOClient from "socket.io-client";
import { serverIP } from "./apiConfig";

export const socket = socketIOClient(serverIP);
