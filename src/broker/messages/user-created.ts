import { channels } from "../channels/index.js";
import { type UserCreatedMessage } from "../../../../contracts/messages/user-created-message.js";

export function dispatchUserCreated(data: UserCreatedMessage) {
  channels.users.sendToQueue("users", Buffer.from(JSON.stringify(data)));
}
