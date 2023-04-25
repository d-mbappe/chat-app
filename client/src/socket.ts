import { io, Socket } from "socket.io-client";

const URL = "http://localhost:4000";

export /** @type {*} */
const socket: Socket = io(URL);