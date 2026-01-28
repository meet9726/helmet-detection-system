import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Client } from "@stomp/stompjs";

let stompClient = null;
import { environment } from "../environment/environment";

const API_BASE = environment().socketUrl;

export const connectSocket = (onMessage) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS(API_BASE),
    reconnectDelay: 5000,

    onConnect: () => {
      console.log("✅ WebSocket Connected");

      stompClient.subscribe("/topic/alerts", (msg) => {
        onMessage(JSON.parse(msg.body));
      });
    },

    onStompError: (frame) => {
      console.error("❌ Broker error:", frame);
    }
  });

  stompClient.activate();
};

export const disconnectSocket = () => {
  if (stompClient) stompClient.deactivate();
};

export const playSound = () => {
  new Audio("/public/sound/alert-444816.mp3").play();
};
