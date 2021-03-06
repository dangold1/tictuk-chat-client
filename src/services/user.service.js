import { SERVER_URL } from "../utils/server";
import swal from 'sweetalert';

const sendUserMessage = async ({ text, channelID, userID, userName }) => {
    const body = JSON.stringify({ text, channelID, userID, userName })
    await fetch(SERVER_URL + 'send-message', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body
    });
}

const getUserName = () => swal({
    title: "Type your name",
    content: {
        element: "input",
        attributes: {
            placeholder: "Name",
            type: "text",
        },
    },
});

export default {
    sendUserMessage,
    getUserName,
}