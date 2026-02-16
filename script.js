function scrollToContact() {
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
}

function toggleChat() {
    const chat = document.getElementById("chatbox");
    chat.style.display = chat.style.display === "flex" ? "none" : "flex";
}

function handleKey(event) {
    if (event.key === "Enter") {
        let input = document.getElementById("userInput");
        let message = input.value;
        input.value = "";
        addMessage("You", message);
        botReply(message);
    }
}

function addMessage(sender, message) {
    const chatBody = document.getElementById("chatBody");
    chatBody.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function botReply(message) {
    let reply = "Please contact us on WhatsApp for detailed discussion.";

    if (message.toLowerCase().includes("price")) {
        reply = "Prices depend on assignment complexity. Please share details.";
    }
    if (message.toLowerCase().includes("project")) {
        reply = "Yes, we handle full academic and technical projects.";
    }

    setTimeout(() => addMessage("Bot", reply), 500);
}
