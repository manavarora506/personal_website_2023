import React, { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseChatbot = () => {
    setIsOpen(false);
  };

  const handleSendMessage = async () => {
    setIsLoading(true);
    const response = await fetch("/.netlify/functions/ask", {
      method: "POST",
      body: JSON.stringify({ question: userInput }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    setMessages([
      ...messages,
      { type: "user", content: userInput },
      { type: "bot", content: data.answer },
    ]);
    setUserInput("");
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-5 right-5">
      <div
        className="chatbot-toggle bg-off-white border border-gray-300 hover:bg-off-black hover:text-off-white font-medium text-sm py-2 px-3 mr-2 rounded text-center dark:bg-off-black dark:text-off-white dark:hover:bg-off-white dark:border-off-white dark:hover:text-off-black  "
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </div>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header p-2 bg-gray-200 flex justify-between items-center">
            <p className="text-3xl font-semibold max-w-max dark:text-black">
              {" "}
              manav-ai{" "}
            </p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-off-white border border-off-black hover:bg-off-black hover:text-off-white font-medium text-sm py-2 px-3 mr-2 rounded text-center dark:bg-off-black dark:text-off-white dark:hover:bg-off-white dark:border-off-white dark:hover:text-off-black"
            >
              X
            </button>{" "}
            {/* Close button */}
          </div>
          <div className="chatbot-messages p-2 space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={`${message.type}-message`}>
                {message.content}
              </div>
            ))}
            {isLoading && <div className="bot-message">Loading...</div>}
          </div>
          <div className="chatbot-input p-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleSendMessage}
              className="mt-2 px-4 py-2 bg-off-white border border-off-black hover:bg-off-black hover:text-off-white font-medium text-sm py-2 px-3 mr-2 rounded text-center dark:bg-off-black dark:text-off-white dark:hover:bg-off-white dark:border-off-white dark:hover:text-off-black"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
