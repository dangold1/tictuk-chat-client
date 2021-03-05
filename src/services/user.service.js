import { SERVER_URL } from "../utils/server";

const sendUserMessage = async ({ text, channelID, userID }) => {
    const body = JSON.stringify({ text, channelID, userID })
    await fetch(SERVER_URL + 'send-message', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body
    });
}

export default {
    sendUserMessage
}