import React, { useState, useEffect } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setInputFocus] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      content:
        "Hi, I'm an AI bot that can answer all questions related to Manav.",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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

  const handleInputBlur = () => {
    setInputFocus(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className={`fixed bottom-${isInputFocused ? "50%" : "5"} right-5`}>
      <div
        className="chatbot-toggle bg-black border hover:bg-off-white hover:text-off-black font-medium text-sm py-2 px-3 mr-2 rounded text-center dark:bg-white dark:text-off-black dark:hover:bg-off-black dark:hover:text-off-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header p-2 bg-off-white flex justify-between items-center">
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
          </div>
          <div className="chatbot-messages p-2 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  message.type === "user"
                    ? "bg-sky-200 self-end"
                    : "bg-gray-100"
                }`}
              >
                {message.content}
              </div>
            ))}
            {isLoading && <div className="bot-message">Loading...</div>}
          </div>
          <div className="chatbot-input p-2">
            <input
              onFocus={() => setInputFocus(true)}
              onBlur={handleInputBlur}
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
